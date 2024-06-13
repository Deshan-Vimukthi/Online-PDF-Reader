import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page,pdfjs } from 'react-pdf';
import api from '../api';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs',import.meta.url).toString();


const PDFViewer = () => {
    const { id } = useParams();
    const [pdf, setPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await api.get(`/pdfs/${id}`, {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setPdf(fileURL);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdf();
    }, [id]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const renderPDF = (thisPdf) =>{
        try{
            return(
                    <div>
                        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
                            Previous
                        </button>
                        <input
                            type="number"
                            min="1"
                            max={numPages}
                            value={pageNumber}
                            onChange={(e) => setPageNumber(Number(e.target.value))}
                        />
                        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
                            Next
                        </button>
                        <Document
                            file={thisPdf}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <p>Page {pageNumber} of {numPages} </p>
                </div>
                    )
        }catch (e){
            return (<h1>File Doesn't loading : {pdf}</h1>)
        }
    }

    return (
        <div>
            {pdf ? (
                <div>
                    {renderPDF(pdf)}
                </div>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PDFViewer;
