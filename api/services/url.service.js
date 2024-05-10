import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import crypto from 'crypto';
import UrlDB from '../model/url.schema.js';
import { createQrUrl } from '../services/qr.service.js';
import { validateUrl, idValid, schemeFiller } from '../utils/validate.url.js';

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

      let url = await UrlDB.findOne({
        Origin: schemeFiller(origin),
        Password: crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex'),
      });
      if (url) {
        return Promise.reject("_already_exist_");
      }

      url = new UrlDB({
          _id: id,
          Password: password,
          Origin: schemeFiller(origin),
          Short: `${process.env.DOMAIN}/s/${id}`,
      });

      url = await url.save();
      console.log({
        createdID: url._id,
        origin: url.Origin,
      });
     
      return Promise.resolve(url.Short);
    } catch (error) {
      if (error.code === 11000) {
        return UrlService.create(origin, password);
      } else {
        return Promise.reject(error);
      }
    }
  };
  
/** Delete existing short url.
 * @param {string} id
 * @param {string} password
 * @returns {Promise<string>} Reject with a reason.
 */
  static async delete(id, password) {
    try {
      const url = await UrlDB.findOneAndDelete({
        _id: id,
        Password: crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex'),
      });
      if (!url) {
        return Promise.reject("_short_not_exist_");
      }

      console.log({
        deletedID: url._id,
        origin: url.Origin,
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

      const url = await UrlDB.findOneAndUpdate(
        {
          _id: id,
          Password: crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex'),
        },
        { $set: { Origin: schemeFiller(neworigin) }, }
      );
      if (!url) {
        return Promise.reject("_short_not_exist_");
      }

      console.log({
        modifiedID: url._id,
        oldOrigin: url.Origin,
        newOrigin: neworigin,
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

  static async getQrCode(id) {
    try {
      const url = await UrlDB.findOne({ _id: id });
      if (!url) {
        return Promise.reject("_id_not_exist_");
      }

      const qrcode = url.QrCode ? url.QrCode : createQrUrl(url.Short);

      return Promise.resolve(qrcode);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
};

export default UrlService;