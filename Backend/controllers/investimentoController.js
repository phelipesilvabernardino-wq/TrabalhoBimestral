const Investimento = require('../models/Investimento');

exports.getAll = async (req, res) => {
  const data = await Investimento.findAll();
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Investimento.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  await Investimento.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  await Investimento.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
