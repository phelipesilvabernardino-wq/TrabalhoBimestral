const Investimento = require('../models/Investimento');

exports.listar = async (req, res) => {
  try {
    const itens = await Investimento.findAll();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const novo = await Investimento.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Investimento.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Investimento não encontrado' });
    const itemAtualizado = await Investimento.findByPk(id);
    res.json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Investimento.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Investimento não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
