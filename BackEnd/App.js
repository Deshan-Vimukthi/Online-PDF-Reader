const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const pdfRoutes = require('./routes/pdf');
const crypto = require('crypto');

dotenv.config();
connectDB().then(()=>
    {
        const generateSecretKey = () => {
            return crypto.randomBytes(64).toString('hex');
        };
        process.env.JWT_SECRET = ((process.env.JWT_SECRET!=='your_jwt_secret_key')?process.env.JWT_SECRET:generateSecretKey());
        console.log('Your JWT Secret Key:', process.env.JWT_SECRET);
    }
);



const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/pdfs', pdfRoutes);



const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
