const ContaFixa = require('../models/ContaFixa');

exports.getAll = async (req, res) => {
  const data = await ContaFixa.findAll();
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await ContaFixa.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  await ContaFixa.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  await ContaFixa.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
