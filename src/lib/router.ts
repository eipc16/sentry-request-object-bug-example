import express from 'express';

const router = express.Router();

router.post('/error', async (_req, res) => {
  res.status(502).json({ message: 'Failed!' });
});

export default router;
