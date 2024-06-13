import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Adjust the import based on your project structure
import { AuthContext } from '../context/AuthContext'; // Adjust the import based on your project structure
import SignIn from './SignUp'; // Adjust the import based on your project structure
import Login from './Login';
import PdfItem from "../Component/PdfItem";
import Header from "../Component/Header"; // Adjust the import based on your project structure

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const [pdfs, setPdfs] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await api.get('/pdfs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setPdfs(response.data);
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            }
        };
        if (user) {
            fetchPdfs().then();
        }
    }, [user]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a PDF file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            await api.post('/pdfs/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Refresh PDFs list
            const response = await api.get('/pdfs', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPdfs(response.data);
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    };

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            {user ? (
                <div>
                    <Header handler={handleLogout}/>
                    <form onSubmit={handleUpload} className={'upload'}>
                        <input className={'input_upload'} type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                        <button className={'button_upload'} type="submit">Upload PDF</button>
                    </form>
                    <div className={'item_list'}>
                        {pdfs.map((pdf) => (
                            <div key={pdf._id} style={{flex:1,flexDirection:'row'}}>
                                <Link to={`/pdfs/${pdf._id}`}><PdfItem name={pdf.originalname} user={pdf.user}/></Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <Login />
                </div>
            )}
        </div>
    );
};

export default Home;
