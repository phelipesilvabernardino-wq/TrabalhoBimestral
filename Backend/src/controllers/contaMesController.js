const ContaMes = require('../models/ContaMes');

exports.listar = async (req, res) => {
  try {
    const contas = await ContaMes.findAll();
    res.json(contas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const nova = await ContaMes.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await ContaMes.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Conta do mês não encontrada' });
    const contaAtualizada = await ContaMes.findByPk(id);
    res.json(contaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await ContaMes.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Conta do mês não encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
