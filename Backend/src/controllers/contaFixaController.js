const ContaFixa = require('../models/ContaFixa');

exports.listar = async (req, res) => {
  try {
    const contas = await ContaFixa.findAll();
    res.json(contas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const nova = await ContaFixa.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await ContaFixa.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Conta fixa não encontrada' });
    const contaAtualizada = await ContaFixa.findByPk(id);
    res.json(contaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await ContaFixa.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Conta fixa não encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
