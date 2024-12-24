import {useQuery} from "react-query";
import PropTypes from "prop-types";
import jwtAxios from "@utils/jwtUtil.tsx";
import {useEffect, useState} from "react";

//useGetStockInfo : 현재시각에 가장 30분 단위에 패칭을 하고 그후 10분단위로 AXIOS를 호출로 회사 정보 가져오기.
const useGetStockInfo = (companyId) => {

    const [autoRefetch, setAutoRefetch] = useState(false);

    // 시간대 (timeZone) 별로 queryKey를 다르게 설정해서, 서버 데이터가 동일할 때는 캐싱된 데이터 활용하고 서버 데이터가 갱신됐을 때는 새롭게 받아옴 (서버 데이터 30분마다 갱신)
    const currentTime = new Date();
    const [month, day, hour, minute] = [currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()];
    const timeZone = minute === 0 || minute === 30 ? "30 or 60" : 0 < minute && minute < 30 ? "1~29" : "31~59";
    const queryKey = `${month}월 ${day}일 ${hour}시 ${timeZone}`;

    // 현재 시각이 30분, 정각이 아닌 경우 남은 시간 계산하여 checkTime 함수 다시 실행
    useEffect(() => {
        if (minute === 0 || minute === 30) {
            setAutoRefetch(true);
        } else if (0 < minute && minute < 30) {
            const delayTime = (30 - minute) * 60000;
            setTimeout(() => {
                refetch();
                setAutoRefetch(true);
            }, delayTime);
        } else if (30 < minute && minute < 60) {
            const delayTime = (60 - minute) * 60000;
            setTimeout(() => {
                refetch();
                setAutoRefetch(true);
            }, delayTime);
        }
    }, []);

    const { data, isLoading, error, refetch } = useQuery(`stockInfo${companyId} ${queryKey}}`, () => getStockInfo(companyId), {
    // const { data, isLoading, error } = useQuery(`stockInfo${companyId}}`, () => getStockInfo(companyId), {
        enabled: true, //쿼리가 활성화 상태인지 여부, 항상 true로 설정
        refetchInterval: autoRefetch ? 60000 * 10 : false, // 정각 혹은 30분에 맞춰서 10분 마다 데이터 리패칭
    });

    return { stockInfo: data, stockInfoLoading: isLoading, stockInfoError: error };
};

const getStockInfo = async (companyId) => {

    const res = await jwtAxios.get(`http://localhost:8080/api/company/${companyId}`);

    return res.data;
};

export default useGetStockInfo;

useGetStockInfo.propTypes = {
    companyId: PropTypes.number
};
