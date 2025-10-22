const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Subscription, Transaction } = require('../models');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid auth header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// list subscriptions for user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const subs = await Subscription.findAll({ where: { user_id: userId } });
  res.json(subs);
});

router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const payload = { ...req.body, user_id: userId };
  try {
    const sub = await Subscription.create(payload);
    res.json(sub);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const sub = await Subscription.findOne({ where: { id, user_id: userId } });
  if (!sub) return res.status(404).json({ error: 'Not found' });
  try {
    await sub.update(req.body);
    res.json(sub);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const sub = await Subscription.findOne({ where: { id, user_id: userId } });
  if (!sub) return res.status(404).json({ error: 'Not found' });
  await sub.destroy();
  res.json({ success: true });
});

// transactions endpoint (list/create)
router.get('/:id/transactions', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const txs = await Transaction.findAll({ where: { subscription_id: id } });
  res.json(txs);
});

router.post('/:id/transactions', authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const tx = await Transaction.create({ subscription_id: id, ...req.body });
    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
