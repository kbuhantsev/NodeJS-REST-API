const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

module.exports = {
  phoneRegExp,
  emailRegexp,
};
