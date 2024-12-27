const API_SERVER_HOST = import.meta.env.VITE_API_URL;
import jwtAxios from '@utils/jwtUtil';

const prefix = `${API_SERVER_HOST}/api/company`

export const getOne = async(companyId) => {
    const res = await jwtAxios.get( `${prefix}/${companyId}`)
    return res.data
}

//객체 스타일로 받아주면 파라미터의 개수가 늘어나지 않아도 된다.
export const getList = async() =>{
    const res = await jwtAxios.get(`${prefix}/list/`)

    return res.data
}

export const postAdd = async(companyObj)=>{
    const res = await jwtAxios.post(`${prefix}/`, companyObj)
    return res.data
}

export const deleteOne = async(companyId)=>{
    const res = await jwtAxios.delete(`${prefix}/${companyId}`)

    return res.data
}

export const putOne = async(company)=>{
    const res = await jwtAxios.put(`${prefix}/${company.companyId}`, company)
    return res.data
}
