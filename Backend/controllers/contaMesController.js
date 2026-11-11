const ContaMes = require('../models/ContaMes');

exports.getAll = async (req, res) => {
  const data = await ContaMes.findAll();
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await ContaMes.create(req.body);
  res.status(201).json(data);
};

exports.update = async (req, res) => {
  await ContaMes.update(req.body, { where: { id: req.params.id } });
  res.json({ success: true });
};

exports.delete = async (req, res) => {
  await ContaMes.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
};
