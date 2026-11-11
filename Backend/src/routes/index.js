const { Router } = require('express');
const contaFixaController = require('../controllers/contaFixaController');
const contaMesController = require('../controllers/contaMesController');
const investimentoController = require('../controllers/investimentoController');
const parcelamentoController = require('../controllers/parcelamentoController');

const router = Router();

// Contas Fixas
router.get('/contas-fixas', contaFixaController.listar);
router.post('/contas-fixas', contaFixaController.criar);
router.put('/contas-fixas/:id', contaFixaController.atualizar);
router.delete('/contas-fixas/:id', contaFixaController.deletar);

// Contas do Mês
router.get('/contas-mes', contaMesController.listar);
router.post('/contas-mes', contaMesController.criar);
router.put('/contas-mes/:id', contaMesController.atualizar);
router.delete('/contas-mes/:id', contaMesController.deletar);

// Investimentos
router.get('/investimentos', investimentoController.listar);
router.post('/investimentos', investimentoController.criar);
router.put('/investimentos/:id', investimentoController.atualizar);
router.delete('/investimentos/:id', investimentoController.deletar);

// Parcelamentos
router.get('/parcelamentos', parcelamentoController.listar);
router.post('/parcelamentos', parcelamentoController.criar);
router.put('/parcelamentos/:id', parcelamentoController.atualizar);
router.delete('/parcelamentos/:id', parcelamentoController.deletar);

module.exports = router;
