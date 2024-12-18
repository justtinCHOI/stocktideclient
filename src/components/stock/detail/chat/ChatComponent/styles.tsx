// Styled Components
import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const MessageItem = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    justify-content: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
    margin-bottom: 10px;
`;

export const MessageContent = styled.div`
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    max-width: 70%;
`;

export const SenderName = styled.div`
    font-weight: bold;
    font-size: 0.9em;
    color: #666;
`;

export const MessageText = styled.div`
    margin: 5px 0;
`;

export const MessageTime = styled.div`
    font-size: 0.8em;
    color: #999;
`;

export const ChatInput = styled.div`
    display: flex;
    gap: 10px;

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background: #0056b3;
        }
    }
`;