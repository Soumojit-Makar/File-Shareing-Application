import { publicApi,privateApi } from "./AxiosService"
export const registerUser = async (data) => {
  return await publicApi.post("/user", data)
}
export const loginUser = async (data) => {
    return await  publicApi.post("/auth/generate-token", data)
}
export const getUser = async (id) => {
    return await privateApi.get(`/user/${id}`)
}