import {useQuery} from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// 커스텀 훅 정의
function useCompanyData(startCompanyId, endCompanyId) {

    // 데이터 가져오는 함수
    const fetchData = async (companyId) => {
        const url = `${BASE_URL}/api/company/${companyId}`;
        const response = await axios.get(url);
        return response.data;
    };

    // startCompanyId 부터 endCompanyId 까지의 범위에 있는 회사 ID 배열을 생성
    const companyIds = Array.from({length: endCompanyId - startCompanyId + 1}, (_, index) => startCompanyId + index);

    // companyIds 배열을 순회하며 fetchData 함수를 호출, 모든 호출이 완료될 때까지 기다림
    const {data, isLoading, isError} = useQuery(
        ['companyData', startCompanyId, endCompanyId],
        async () => {
            const promises = companyIds.map((companyId) => fetchData(companyId));
            return Promise.all(promises);
        }
    );

    // 필요한 데이터 추출 및 저장
    const extractedData = data?.map((company) => {
        return {
            companyId: company.companyId,
            code: company.code,
            korName: company.korName,
            stockPrice: company.stockInfResponseDto.stck_prpr,// 현재 주가
            stockChangeAmount: company.stockInfResponseDto.prdy_vrss,//전일 대비 주가
            stockChangeRate: company.stockInfResponseDto.prdy_ctrt,
        };
    });

    // 필요한 데이터 추출 및 저장
    const extractedData2 = data?.map((company) => {
        return {
            companyId: company.companyId,
            code: company.code,
            korName: company.korName,
            stockPrice: company.stockInfResponseDto.stck_prpr,// 현재 주가
            priceChangeAmount: company.stockInfResponseDto.prdy_vrss, //전일 대비 주가
            transactionVolume: company.stockInfResponseDto.acml_vol, //거래량
            priceChangeRate: company.stockInfResponseDto.prdy_ctrt,// 전일 대비율
            amount: company.stockInfResponseDto.acml_tr_pbmn, // 총 거래대금
        };
    });
    return {
        data: extractedData,
        data2: extractedData2,
        isLoading,
        isError,
    };
}

export default useCompanyData;
