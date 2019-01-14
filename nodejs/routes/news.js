const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');
router.get('/get', newsController.get);
router.post('/add', newsController.add);
router.put('/update', newsController.update);
router.delete('/delete', newsController.delete);
module.exports = router;