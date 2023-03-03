import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.css'
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import Popup from "./Popup";

const Disk = () => {
    const [current, setCurrent] = useState('root')
    const [data, setData] = useState()
    const dispatch = useDispatch()
    const dirStack = useSelector(state => state.files.dirStack)
    const [currentDir, setCurrentDir] = useState('root')
    const [children, setChildren] = useState({})
    useEffect(()=>{
        getFiles(currentDir,setChildren)
    },[])
    console.log(children)

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
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
            </div>
            {/*<FileList children={children.data} /> */}
            {children?.data?.children?.map(item=><FileList/>)}
            <Popup currentDir={currentDir} />

        </div>
    );
};

export default Disk;
