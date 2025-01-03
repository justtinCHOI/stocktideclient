import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import useGetStockChart from "@hooks/useGetStockChart.ts";
import { FC } from 'react';

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

interface ChartComponentProps {
    companyId: number;
}

const ChartComponent: FC<ChartComponentProps> = ({companyId}) => {

    const { options, chartStyle, loading } = useGetStockChart(companyId);

    if (loading) {
        return <LoadingContainer>{loadingText}</LoadingContainer>;
    }

    if (!options || !chartStyle) {
        return <ErrorContainer>{errorText}</ErrorContainer>;
    }

    return (
        <Container>
            <ChartContainer>
                <EChartsReact option={options} style={chartStyle} />
            </ChartContainer>
            {/*<CompareChartBtn/>*/}
        </Container>
    );
};

export default ChartComponent;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 1;
`;

const ChartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 500;
  color: #999999;
`;

const ErrorContainer = styled(LoadingContainer)``;
