const Parcelamento = require('../models/Parcelamento');

exports.listar = async (req, res) => {
  try {
    const itens = await Parcelamento.findAll();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const novo = await Parcelamento.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Parcelamento.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Parcelamento não encontrado' });
    const itemAtualizado = await Parcelamento.findByPk(id);
    res.json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Parcelamento.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Parcelamento não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
