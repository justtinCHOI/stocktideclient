import styled from 'styled-components';
import CountryNews from './CountryNews.tsx';
import Quiz from './Quiz.tsx';
import ForexStories from './ForexStories.tsx';
import StockRanking from './StockRanking.tsx';
import MajorIndices from './MajorIndices.tsx';
import QuarterlyEarnings from './QuarterlyEarnings.tsx';

const Main = () => {
    return (
        <MainContainer>
            <Section>
                <CountryNews />
            </Section>
            <Divider />
            <Section>
                <QuarterlyEarnings />
            </Section>
            <Divider />
            <Section>
                <Quiz />
            </Section>
            <Divider />
            <Section>
                <ForexStories />
            </Section>
            <Divider />
            <Section>
                <StockRanking />
            </Section>
            <Divider />
            <Section>
                <MajorIndices />
            </Section>
        </MainContainer>
    );
};

export default Main;

const MainContainer = styled.main`
    padding: 20px;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const Divider = styled.div`
    height: 10px;
    background-color: #d6e2ff;
    margin: 20px 0;
`;
