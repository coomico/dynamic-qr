import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import UrlDB from '../model/url.schema.js';
import { validateUrl, idValid } from '../utils/validate.url.js';

dotenv.config();

class UrlService {

/** Get original url.
 * @param {string} id
 * @param {boolean} [isVisited=false] - make it true if visited!
 * @returns {Promise<string>} Resolve an Url.Origin or Reject with a reason.
 */
  static async origin(id, isVisited=false) {
    try {
      const url = await UrlDB.findOne({ _id: id });
      if (!url) {
        return Promise.reject("_id_not_exist_");
      }

      if (isVisited) {
        await UrlDB.updateOne(
          { _id: id },
          { $inc: { VisitCount: 1 }, }
        );
      }

      return Promise.resolve(url.Origin);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

/** Create new short url.
  * @param {string} origin
  * @param {string} password
  * @returns {Promise<string>} Resolve an Url.Short or Reject with a reason.
*/
  static async create(origin, password) {
    try {
      if (idValid(origin) || !validateUrl(origin)) {
        return Promise.reject("_invalid_url_");
      }

      const id = nanoid(8);

      const urls = await UrlDB.find({
        Origin: origin
      });
      for (const url of urls) {
        const match = await url.comparePassword(password);
        if (match) {
          return Promise.reject("_already_exist_");
        }
      }

      const url = new UrlDB({
          _id: id,
          Password: password,
          Origin: origin,
          Short: `${process.env.DOMAIN}/s/${id}`,
          CreationDate: Date.now(),
        });
      await url.save();
     
      return Promise.resolve(url.Short);
    } catch (error) {
      if (error.code === 11000) {
        // TODO: yup, handle this one
        return Promise.reject("_duplicated_id_");
      }

      console.error(error);
      return Promise.reject(error);
    }
  };
  
/** Delete existing short url.
 * @param {string} id
 * @param {string} password
 * @returns {Promise<string>} Reject with a reason.
 */
  static async delete(id, password) {
    try {
      const url = await UrlDB.findOne({ _id: id })
      if (!url) {
        return Promise.reject("_id_not_exist_");
      }

      const match = await url.comparePassword(password);
      if (!match) {
        return Promise.reject("_invalid_password_");
      }

      const res = await UrlDB.deleteOne({ 
        _id: id,
        Origin: url.Origin,
      });
      console.log({
        deletedCound: res.deletedCount,
        id: url._id,
      })

      return Promise.resolve("success");
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

/** Update the original url.
 * @param {string} id 
 * @param {string} neworigin
 * @param {string} password
 * @returns {Promise<string>} Resolve with new origin and short url, or Reject with a reason.
 */
  static async updateOrigin(id, neworigin, password) {
    try {
      if (idValid(neworigin) || !validateUrl(neworigin)) {
        return Promise.reject("_invalid_url_");
      }

      const url = await UrlDB.findOne({ _id: id })
      if (!url) {
        return Promise.reject("_id_not_exist_");
      }

      const match = await url.comparePassword(password);
      if (!match) {
        return Promise.reject("_invalid_password_");
      }

      const res = await UrlDB.updateOne(
        { _id: id },
        { $set: { Origin: neworigin }, }
      );
      console.log({
        modifiedCount: res.modifiedCount,
        id: url._id,
      });

      return Promise.resolve(neworigin, url.Short);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

/** Update the QrCode field.
 * @param {string} short
 * @param {string} data - Image data
 * @returns {Promise<string>} Reject with a reason if any.
 */
  static async updateQrCode(short, data) {
    try {
      const url = await UrlDB.findOneAndUpdate(
        { Short: short },
        { $set: { QrCode: data }, }
      );
      if (!url) {
        return Promise.reject("_short_not_exist_");
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
};

export default UrlService;