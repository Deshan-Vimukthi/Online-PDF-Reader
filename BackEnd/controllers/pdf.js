const PDF = require('../models/Pdf');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads', 'pdfs');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDFs are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

const uploadPdf = async (req, res) => {
    try {
        const file = req.file;

        // Define the destination directory
        const uploadDir = path.join(__dirname, '..', 'uploads', 'pdfs');
        // Ensure the directory exists, create it if not
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Construct the destination path
        const destinationPath = path.join(uploadDir, file.filename);

        // Move the uploaded file to the destination directory
        fs.renameSync(file.path, destinationPath);

        // Create a new PDF document entry in the database
        const newPdf = new PDF({
            filename: file.filename,
            originalname: file.originalname,
            path: destinationPath,
            size: file.size,
            user: req.user.id
        });

        // Save the new PDF document to the database
        await newPdf.save();

        res.status(201).json({ message: 'PDF uploaded successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPdfs = async (req, res) => {
    try {
        const pdfs = await PDF.find({ user: req.user.id });
        res.json(pdfs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPdf = async (req, res) => {
    try {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) {
            console.log('PDF not found');
            return res.status(404).send('PDF not found');
        }

        // Construct the full path to the PDF file
        const pdfPath = pdf.path;
        console.log('pdf path:', pdfPath);

        // Check if the file exists
        if (!fs.existsSync(pdfPath)) {
            console.log('PDF file not found');
            return res.status(404).send('PDF file not found');
        }

        // Send the PDF file as a response
        res.sendfile(pdfPath);
        console.log('PDF send success fully');
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).send('Server error');
    }
};

module.exports = { upload, uploadPdf, getPdfs, getPdf };
