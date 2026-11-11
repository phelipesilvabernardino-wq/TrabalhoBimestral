const express = require('express');
const router = express.Router();
const Investimento = require('../models/Investimento');

router.get('/', async (req, res) => {
  const investimentos = await Investimento.findAll();
  res.json(investimentos);
});

router.post('/', async (req, res) => {
  const novoInvestimento = await Investimento.create(req.body);
  res.status(201).json(novoInvestimento);
});

router.put('/:id', async (req, res) => {
  await Investimento.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await Investimento.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;
