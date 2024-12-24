import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';

const storiesData = [
    { title: '달러 강세', content: '미국 달러는 주요 통화 대비 강세를 보였습니다. 경제 지표 개선과 함께...' },
    { title: '유로존 불확실성', content: '유로존은 정치적, 경제적 도전으로 인해 불확실성을 겪고 있습니다...' },
    { title: '엔화 약세', content: '일본 엔화는 주요 통화 대비 약세를 보이고 있습니다. 전문가들은...' },
    { title: '파운드화 변동성', content: '영국 파운드화는 경제적 불확실성으로 인해 변동성이 큽니다...' },
    { title: '위안화 안정', content: '중국 위안화는 경제 회복과 함께 안정세를 보이고 있습니다...' },
    { title: '캐나다 달러 강세', content: '캐나다 달러는 원유 가격 상승으로 강세를 보이고 있습니다...' },
    { title: '호주 달러 약세', content: '호주 달러는 경제 성장 둔화 우려로 약세를 보이고 있습니다...' },
];

const ForexStories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % storiesData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Title>💱 외환시장 스토리</Title>
            <StoriesList>
                {storiesData.map((story, index) => (
                    <StoryItem key={index} $active={index === currentIndex ? "true" : "false"}>
                        <h3>{story.title}</h3>
                        <p>{story.content}</p>
                        <MoreLink>
                            더보기 <FaArrowRight />
                        </MoreLink>
                    </StoryItem>
                ))}
            </StoriesList>
        </Section>
    );
};

export default ForexStories;

const Section = styled.section`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const StoriesList = styled.div`
    height: 90px;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    border: 1px solid lightgray;
    padding: 10px;
`;

const StoryItem = styled.div`
    position: absolute;
    width: 100%;
    opacity: ${({ $active }) => ($active === "true" ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    h3 {
        font-size: 1rem;
    }
    p {
        font-size: 0.7rem;
    }
`;

const MoreLink = styled.div`
    position: absolute;
    bottom: -20px;
    right: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    color: #007bff;
    cursor: pointer;
`;
