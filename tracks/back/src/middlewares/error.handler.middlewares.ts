import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(err);
  res.status(500).send({ message: 'Server internal error' });
};

export default errorHandler;
