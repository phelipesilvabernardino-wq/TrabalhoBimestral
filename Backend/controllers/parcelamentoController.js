const Parcelamento = require('../models/Parcelamento');

exports.getAll = async (req, res) => {
  const data = await Parcelamento.findAll();
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Parcelamento.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  await Parcelamento.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  await Parcelamento.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
