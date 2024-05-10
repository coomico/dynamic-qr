export const validateUrl = (url) => {
  return /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(url);
};

export const idValid = (url) => {
  const regex = /(https?:\/\/)?(qr.)?coomi.codes\/s\/((?=.{8,8}$)[A-Za-z0-9_-]+)?/i;
  if (url && url.match(regex)?.length === 4) {
      return url.match(regex)[3];
  }
};

export const schemeFiller = (url) => {
  const regex = /([a-zA-Z]{1,20}):\/\/([\w_-]+(?:(?:\.[\w_-]+)?))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;
  const match = url.match(regex);
  if (url && !match) {
    return `http://${url}`;
  }

  return url;
};