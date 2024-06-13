import React from "react";
import pdfIcon from '../images/6e6c363de5f8c1c3c1331eea85c91a15.jpg'

const pdfItem = ({name,user,handler}) =>{
    return(
        <div className={'item_holder'}>
            <div className={'image_holder'}>
                <img alt={'Document PDF'} src={pdfIcon} className={'image'}/>
            </div>
            <div className={'below'}>
                <h4 className={'item-name'}>{name}</h4>
            </div>
        </div>
    )
}

export default pdfItem;