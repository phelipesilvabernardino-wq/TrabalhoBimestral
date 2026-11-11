const express = require('express');
const router = express.Router();
const ContaFixa = require('../models/ContaFixa');

router.get('/', async (req, res) => {
  const contas = await ContaFixa.findAll();
  res.json(contas);
});

router.post('/', async (req, res) => {
  const novaConta = await ContaFixa.create(req.body);
  res.status(201).json(novaConta);
});

router.put('/:id', async (req, res) => {
  await ContaFixa.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await ContaFixa.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;
