import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createDir, deleteFile, deleteFolder, getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.css'
import axios from "axios";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";

const Disk = () => {
    const [current, setCurrent] = useState('root')
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const dirStack = useSelector(state => state.files.dirStack)
    const currentDir = useSelector(state => state.files.currentDir)
    console.log(data)
    useEffect(() => {
        fetch(`http://91.193.183.139:7000/drive/folder/${current}`, {
        method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => res.json())
        .then((value) => {
            setData(value)
        })
        .catch((err) => console.error(err))

}, [current])
    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }
    function backClickHandler(){
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    function fileUploadHandler(event){
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }


    return (
        <div className="disk">
            <div className="disk__btns">

                <button className="disk__back" onClick={()=> backClickHandler}>Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
                <div className="disk_upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={()=> fileUploadHandler()} type="file" id="disk__upload-input" className="disk__upload-input"/>

                </div>
            </div>
            <FileList/>

        </div>
    );
};

export default Disk;
