const express = require('express');
const router = express.Router();
const { getAllUsers, editUser, deleteUser } = require('../controllers/userController');

router.get('/',  getAllUsers);
router.put('/:id',  editUser);
router.delete('/:id', deleteUser);

module.exports = router;
