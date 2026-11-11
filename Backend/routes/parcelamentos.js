const express = require('express');
const router = express.Router();
const Parcelamento = require('../models/Parcelamento');

router.get('/', async (req, res) => {
  const parcelamentos = await Parcelamento.findAll();
  res.json(parcelamentos);
});

router.post('/', async (req, res) => {
  const novoParcelamento = await Parcelamento.create(req.body);
  res.status(201).json(novoParcelamento);
});

router.put('/:id', async (req, res) => {
  await Parcelamento.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await Parcelamento.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;
