/** @format */

let errorHandler = (res, msg) => {
  return res.status(500).send({ message: msg});
};

module.exports = { errorHandler };
