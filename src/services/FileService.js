import { privateApi, publicApi} from "./AxiosService"

export const uploadFileToServer=(data,userId)=>{
    const formData=new FormData();
    formData.append("file",data)
    console.log("file",data)
    return privateApi.post(`/file/${userId}`,formData);
}
export const deleteFileToServer=(fileId)=>{
    return privateApi.delete(`/file/${fileId}`)
}
export const getFiles=(pageNo)=>{
    return publicApi.get(`/file?pageNumber=${pageNo}`)
}
export const searchFile=(keyword,pageNo)=>{
    return privateApi.get(`/file/search?pageNumber=${pageNo}&keyword=${keyword}`)
}
