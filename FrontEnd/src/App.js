import './App.css';
import Home from "./Pages/Home";
import {useRoutes} from "react-router-dom";
import Login from "./Pages/Login";
import PDFViewer from "./Pages/PDFViewer";
import SignUp from "./Pages/SignUp";
import {pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs',import.meta.url).toString();

function App() {
    return (
    <div className={'App'}>
        {useRoutes([
        {path: '/', element: <Home/>},
        {path: '/pdfs/:id', element: <PDFViewer/>},
            {path: '/signup', element: <SignUp/>},
        {path: '/login', element: <Login/>}])}
    </div>);
}

export default App;