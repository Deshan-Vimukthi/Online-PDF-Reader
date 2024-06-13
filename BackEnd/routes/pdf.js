const express = require('express');
const { upload, uploadPdf, getPdfs, getPdf } = require('../controllers/pdf');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/upload', auth, upload.single('pdf'), uploadPdf);
router.get('/', auth, getPdfs);
router.get('/:id', auth, getPdf);

module.exports = router;
