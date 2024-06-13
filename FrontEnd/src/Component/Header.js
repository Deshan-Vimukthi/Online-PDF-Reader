import React from "react";
import pdfIcon from '../images/8b167af653c2399dd93b952a48740620.jpg'

const pdfItem = ({name,user,handler}) =>{
    return(
        <div className={'header'}>
                <h2 className={'title'}>Home Page</h2>
                <img alt={'Document PDF'} src={pdfIcon} className={'profile'}/>
                <p className={'logout'} onClick={handler}>Logout</p>
        </div>
    )
}

export default pdfItem;