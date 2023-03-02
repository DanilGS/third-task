import React from 'react';
import './fileList.css'

const FileList = () => {


    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
        </div>
    );
};

export default FileList;
