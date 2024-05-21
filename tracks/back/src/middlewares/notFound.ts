import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res) => {
  console.log('not found');

  res.status(404).send({ message: 'Invalid path' });
};

export default notFoundHandler;