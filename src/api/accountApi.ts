import {API_SERVER_HOST} from "./memberApi";
import jwtAxios from '@utils/jwtUtil';

const host = `${API_SERVER_HOST}/api/cash`

export const getCashList = async (memberId) => {

    const res = await jwtAxios.get(`${host}`, {

        params: {memberId}

    });

    return res.data;
}

export const createCash = async (memberId) => {

    const res = await jwtAxios.post(`${host}`, null, {

        params: {memberId}

    });

    return res.data;
}

export const deleteCash = async (cashId) => {

    const res = await jwtAxios.delete(`${host}/${cashId}`, null, {});

    return res.data;
}

export const updateCash = async (cashId, money, dollar) => {

    const res = await jwtAxios.put(`${host}/${cashId}`,null, {
        params: {money, dollar }
    });

    return res.data;
}
