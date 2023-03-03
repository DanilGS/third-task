import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";



export function createDir(dirId, name) {
    console.log(dirId,name)
    return async dispatch => {
        try {
            const response = await axios.post(`http://91.193.183.139:7000/drive/folder`,{
                name,
                parentId: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://91.193.183.139:7000/drive/files`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://91.193.183.139:7000/delete/files/id=${file._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}
export async function getFiles(dirId,setter) {
    let res = await axios.get(`http://91.193.183.139:7000/drive/folder/${dirId}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>setter(res.data))
    return res


}