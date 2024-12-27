import {useState, useEffect, useMemo, useCallback} from "react";
import useGetStockData from "./useGetStockData";
import useGetStockInfo from "./useGetStockInfo";
import axios from "axios";
import { UseSocketReturn } from '@typings/hooks';

const BASE_URL = 'http://localhost:8080';

const upColor = "rgba(198, 6, 6, 0.37)";
const downColor = "rgba(59, 119, 247, 0.51)";
const volumColor = "rgba(57, 118, 249, 0.56)";
const pointerColor = "#cc3c3a";
const indexColor = "#4479c2";
const averageLineMinute = 10;
const averageDay = 10;

// // StockMin type
// interface StockProps {
//     stockMinId: number;
//     companyId: number;
//     stockTradeTime: string; // 주식 체결 시간 (LocalDateTime)
//     stck_cntg_hour: string; // 주식 체결 시간 (String)
//     stck_prpr: string; // 주식 현재가
//     stck_oprc: string; // 주식 시가
//     stck_hgpr: string; // 주식 최고가
//     stck_lwpr: string; // 주식 최저가
//     cntg_vol: string; // 체결 거래량
// }
//
// // time, title, values, volumes
// interface OrganizedChartProps {
//     time: string[];
//     tooltipTitle: string[];
//     values: number[][];
//     volumes: number[][];
// }

const useGetStockChart = (companyId: number) => {
    // const { stockPrice } = useGetStockData(companyId);// 봉 420개
    // const { stockInfo } = useGetStockInfo(companyId);// 회사정보 -> corpName

    const { stockPrice, stockPriceLoading } = useGetStockData(companyId);
    const { stockInfo, stockInfoLoading } = useGetStockInfo(companyId);

    const [corpName, setCorpName] = useState("");
    const [chartData, setChartData] = useState([]); // StockProps[] : 봉 배열

    // 비교차트 설정 (10일 기준, 이동 평균선)
    // const compareId = useSelector((state: StateProps) => state.compareChart);
    // const compareId = useSelector((state) => state.compareChart);
    const [compareId, setCompareId] = useState(3); // StockProps[] : 봉 배열
    const { stockInfo: compareInfo } = useGetStockInfo(compareId);
    const [compareName, setCompareName] = useState("");
    const [compareChart, setCompare] = useState(undefined);

    // 회사정보 -> 회사이름, 봉 420개 -> chartData
    useEffect(() => {
        if (stockPrice && stockInfo) {
            setCorpName(stockInfo.korName); // 마르하벤, Marhaban, 봉쥬
            setChartData(stockPrice);
        }
    }, [stockPrice, stockInfo]);

    // 비교회사정보 -> 비교회사이름
    useEffect(() => {
        if (compareInfo && compareId !== null) {
            const compareStockName = compareInfo.korName;
            setCompareName(compareStockName);
        }
    }, [compareId, compareInfo]);

    // 회사정보 X -> 회사차트 X, 비교회사Id -> 비교회사차트
    useEffect(() => {
        if (compareId !== null) {
            getCompareChart(compareId, compareName).then();
        }

        if (companyId === null) {
            setCompare(undefined);
        }
    }, [companyId, compareId, compareName]);

    // 데이터 유효성 검증 및 정리_ chartData -> organizedChartData
    const organizedChartData = useMemo(() => {
        if (!chartData || chartData.length === 0) {
            console.warn("Chart data is empty or invalid");
            return {
                time: [],
                tooltipTitle: [],
                values: [],
                volumes: [],
            };
        }
        return organizeData(chartData);
    }, [chartData]);
    const movingAvgLine = calculateMovingAvgLine(averageLineMinute, organizedChartData);

    // const getCompareChart = async (compareId: number, compareName: string) => {
    const getCompareChart =  useCallback(async (compareId, compareName) => {
        const response = await axios.get(`${BASE_URL}/api/company/charts/${compareId}`);
        const data = await response.data;

        console.log('useGetStockChart response', response);

        const compareChartData = organizeData(data);
        const compareMovingAvgData = calculateMovingAvgLine(averageDay, compareChartData);
        const compareMovingAvgChart = {
            name: `${compareName}`,
            type: "line",
            data: compareMovingAvgData,
            smooth: true,
            lineStyle: {
                opacity: 0.5,
                color: "#738f8fc7",
            },
            yAxisIndex: 2,
        };

        console.log('useGetStockChart compareChartData', compareChartData);

        setCompare(compareMovingAvgChart);
    }, []);

    // 데이터 유효성 검증 및 정리_ organizedChartData -> { options, chartStyle }
    const options = useMemo(() => {
        if (!organizedChartData || organizedChartData.values.length === 0) {
            console.warn("Organized chart data is invalid");
            return null;
        }

        console.log('useGetStockChart organizedChartData', organizedChartData);

        // Chart options 정의
        return {
            animation: true,
            legend: {
                top: 10,
                left: "left",
                padding: [4, 0, 0, 15],
                data: [`주가`, `거래량`, `이동평균선 (${averageLineMinute}분)`, `${compareName}`],
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                // formatter: (params: any) => {
                formatter: (params) => {
                    const dataIndex = params[0]?.dataIndex || 0;

                    const openPriceText = "• 시가";
                    const closePriceText = "• 종가";
                    const highPriceText = "• 고가";
                    const lowPriceText = "• 저가";
                    const volumeText = "• 거래량";
                    const priceUnit = " 원";
                    const volumeUnit = " 주";

                    const date = organizedChartData.tooltipTitle[dataIndex];
                    const name = `📈 ${corpName}`;
                    const dataPoint = organizedChartData.values[dataIndex];
                    const openPrice = dataPoint[0].toLocaleString();
                    const closePrice = dataPoint[1].toLocaleString();
                    const highPrice = dataPoint[2].toLocaleString();
                    const lowPrice = dataPoint[3].toLocaleString();
                    const volume = organizedChartData.volumes[dataIndex][1].toLocaleString();

                    const tooltipContent = `
        <div style="line-height: 20.5px;">
          <div style="font-weight: 600; font-size: 13px; color:#e22926;">${date}</div>
          </br>
          <div style="font-weight: 600;">${name}</div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${openPriceText}</span>
            <span>${openPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${closePriceText}</span>
            <span>${closePrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${highPriceText}</span>
            <span>${highPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${lowPriceText}</span>
            <span>${lowPrice}${priceUnit}</span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>${volumeText}</span>
            <span>${volume}${volumeUnit}</span>
          </div>
        </div>
        `;

                    return tooltipContent;
                },
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 15,
                textStyle: {
                    color: "#000",
                    fontSize: 12.5,
                },
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: "all",
                    },
                ],
                label: {
                    color: pointerColor,
                    backgroundColor: "transparent",
                },
            },
            toolbox: { show: false },
            brush: {
                xAxisIndex: "all",
                brushLink: "all",
                outOfBrush: {
                    colorAlpha: 0.1,
                },
            },
            visualMap: {
                show: false,
                seriesIndex: 5,
                dimension: 2,
                pieces: [
                    {
                        value: 1,
                        color: downColor,
                    },
                    {
                        value: -1,
                        color: upColor,
                    },
                ],
            },
            grid: [
                {
                    containLabel: true,
                    top: "0%",
                    left: "0%",
                    right: "0%",
                    height: "72.5%",
                },
                {
                    containLabel: true,
                    left: "0%",
                    right: "0%",
                    top: "72.6%",
                    height: "27%",
                },
            ],
            xAxis: [
                {
                    type: "category",
                    data: organizedChartData.time,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                    splitLine: { show: false, interval: 100 },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    min: "dataMin",
                    max: "dataMax",
                    gridIndex: 0,
                    axisPointer: {
                        z: 100,
                    },
                },
                {
                    type: "category",
                    gridIndex: 1,
                    data: organizedChartData.time,
                    boundaryGap: false,
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: {
                        show: true,
                        interval: Math.ceil(organizedChartData.time.length / 13),
                        showMinLabel: false,
                        showMaxLabel: false,
                        color: "black",
                    },
                    min: "dataMin",
                    max: "dataMax",
                },
            ],
            yAxis: [
                {
                    scale: true, // Y축의 값 0을 강제로 포함 X
                    splitArea: {
                        show: true,
                    },
                    splitLine: {
                        show: false,
                    },
                    position: "right",
                    axisLabel: {
                        fontSize: "12px",
                        color: indexColor,
                        fontWeight: "500",
                        showMinLabel: false,
                        showMaxLabel: false,
                        inside: true,
                        padding: 7,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 0,
                            type: "solid",
                        },
                    },
                    gridIndex: 0,
                },
                {
                    scale: true,
                    position: "right",
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: true, inside: true, color: indexColor, padding: 10, showMinLabel: false, showMaxLabel: false, fontWeight: "500" },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    splitArea: {
                        show: true,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 1,
                            type: "solid",
                        },
                    },
                },
                chartData !== undefined && {
                    scale: true,
                    splitArea: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    position: "left",
                    axisLabel: {
                        fontSize: "12px",
                        color: "#9999",
                        fontWeight: "500",
                        showMinLabel: false,
                        showMaxLabel: false,
                        inside: true,
                        padding: 7,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "black",
                            width: 0,
                            type: "solid",
                        },
                    },
                    gridIndex: 0,
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                    xAxisIndex: [0, 1],
                    start: 0.5,
                    end: 99.5,
                },
            ],
            series: [
                {
                    name: `주가`,
                    type: "candlestick",
                    data: organizedChartData.values,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: undefined,
                        borderColor0: undefined,
                    },
                    yAxisIndex: 0,
                },
                {
                    name: `이동평균선 (${averageLineMinute}분)`,
                    type: "line",
                    data: movingAvgLine,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5,
                    },
                },
                {
                    name: `거래량`,
                    type: "bar",
                    xAxisIndex: 1,
                    data: organizedChartData.volumes,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: volumColor,
                    },
                },
                compareChart,
            ],
        };
    }, [corpName, chartData, compareName, compareChart, organizedChartData, movingAvgLine]);
    // }, [organizedChartData]);

    const chartStyle = {
        width: "100%",
        height: "100% ",
    };

    return {
        options,
        chartStyle,
        loading: stockPriceLoading || stockInfoLoading
    };
};

export default useGetStockChart;

// 1) 차트 데이터 정리 (x축 날짜 데이터, y축 종가 및 거래량 데이터)
// const organizeData = (rawData: StockProps[]) => {
export const organizeData = (rawData) => {

    if (!rawData || rawData.length === 0) {
        console.warn("Raw data is empty or undefined");
        return {
            time: [],
            tooltipTitle: [],
            values: [],
            volumes: [],
        };
    }
    const tooltipTitle = [];
    const time = [];
    const values = [];
    const volumes = [];

    for (let i = 0; i < rawData.length; i++) {
        const date = new Date(rawData[i].stockTradeTime);

        // 1) x축 날짜
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const priceTime = `${hour}:${minute}`;
        time.push(priceTime);

        // 2) 툴팁 날짜
        const dayList = ["일", "월", "화", "수", "목", "금", "토"];

        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const dayOfWeek = dayList[date.getDay()];
        const tooltipDay = `${year}.${month}.${day}(${dayOfWeek}) ${priceTime}`;
        tooltipTitle.push(tooltipDay);

        // 3) 주가
        const openPrice = parseInt(rawData[i].stck_oprc);
        const closePrice = parseInt(rawData[i].stck_prpr);
        const lowestPrice = parseInt(rawData[i].stck_lwpr);
        const highestPrice = parseInt(rawData[i].stck_hgpr);
        values.push([openPrice, closePrice, lowestPrice, highestPrice]);

        // 4) 거래량
        const volume = parseInt(rawData[i].cntg_vol);
        const priceChange = openPrice < closePrice ? 1 : -1;
        volumes.push([i, volume, priceChange]);
    }
    return {
        time: time,
        tooltipTitle: tooltipTitle,
        values: values,
        volumes: volumes,
    };
};

// 2) 이동 평균선 데이터 계산
// function calculateMovingAvgLine(minuteCount: number, data: OrganizedChartProps) {
export function calculateMovingAvgLine(minuteCount, data) {
    const result = [];
    const length = data.values.length;

    for (let i = 0; i < length; i++) {
        if (i < minuteCount) {
            result.push("-");
            continue;
        }

        let sum = 0;
        for (let j = 0; j < minuteCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(+(sum / minuteCount).toFixed(3));
    }
    return result;
}
