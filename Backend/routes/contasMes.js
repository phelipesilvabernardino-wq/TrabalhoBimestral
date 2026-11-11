const express = require('express');
const router = express.Router();
const ContaMes = require('../models/ContaMes');

router.get('/', async (req, res) => {
  const contas = await ContaMes.findAll();
  res.json(contas);
});

router.post('/', async (req, res) => {
  const novaConta = await ContaMes.create(req.body);
  res.status(201).json(novaConta);
});

router.put('/:id', async (req, res) => {
  await ContaMes.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await ContaMes.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;
