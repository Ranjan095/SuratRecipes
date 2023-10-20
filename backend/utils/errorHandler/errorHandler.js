/** @format */

let errorHandler = (res, msg) => {
  return res.status(400).send({ message: msg});
};

module.exports = { errorHandler };
