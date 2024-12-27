import axios from "axios"
import jwtAxios from '@utils/jwtUtil.tsx';
import { LoginParam } from '@typings/param';
import { MemberModifyDTO } from '@typings/dto';

export const API_SERVER_HOST = import.meta.env.VITE_API_URL;
const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam: LoginParam) => {

  const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

  const form = new FormData()
  form.append('username', loginParam.email)
  form.append('password', loginParam.password)

  const res = await axios.post(`${host}/login`, form, header)

  return res.data

}

export const modifyMember = async (member: MemberModifyDTO) => {

  const res = await jwtAxios.put(`${host}/modify`, member)

  return res.data

}

export const checkEmailDuplicate = async (email: string) => {

  const res = await axios.get(`${host}/checkEmail`, {

    params: { email }

  });

  return res.data;
}