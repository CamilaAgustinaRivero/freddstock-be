/*
    Operation routes / Operation
    host + /api/operation
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields');
const { getOperations, createOperation, updateOperation, deleteOperation } = require('../controllers/operations');
const router = Router();

router.get('/', getOperations);

router.post(
    '/',
    [
        check('name', 'Operation name is required.').not().isEmpty(),
        validateFields
    ],
    createOperation
);

router.put(
    '/:id',
    [
        check('name', 'Operation name is required.').not().isEmpty(),
        validateFields
    ],
    updateOperation
);

router.delete('/:id', deleteOperation);

module.exports = router;