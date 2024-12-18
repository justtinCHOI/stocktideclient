// src/components/stock/detail/chat/ChatComponent/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useSocket } from '@hooks/useSocket';
import {
    ChatInput,
    Container,
    MessageContent,
    MessageItem,
    MessagesContainer,
    MessageText,
    MessageTime,
    SenderName
} from "./styles";
import {ChatMessage} from "@typings/chat";

const ChatComponent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const messageContainerRef = useRef<HTMLDivElement>(null);

    const { messages, connectedUsers, sendMessage, addUser } = useSocket();

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim()) {
            const chatMessage: ChatMessage = {
                type: 'CHAT', // 리터럴 타입으로 지정
                content: message,
                sender: username,
                time: new Date().toLocaleTimeString()
            };
            sendMessage(chatMessage);
            setMessage('');
        }
    };

    const handleUsernameSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (username.trim()) {
            const joinMessage: ChatMessage = {
                type: 'JOIN', // 리터럴 타입으로 지정
                content: `${username} joined the chat`,
                sender: username,
                time: new Date().toLocaleTimeString()
            };
            addUser(joinMessage);
        }
    };

    if (!username) {
        return (
            <Container>
                <form onSubmit={handleUsernameSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Join Chat</button>
                </form>
            </Container>
        );
    }

    return (
        <Container>
            <div className="connected-users">
                <h3>Connected Users ({connectedUsers.length})</h3>
                <ul>
                    {connectedUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
            <MessagesContainer ref={messageContainerRef}>
                {messages.map((msg, index) => (
                    <MessageItem key={index} isCurrentUser={msg.sender === username}>
                        <MessageContent>
                            <SenderName>{msg.sender}</SenderName>
                            <MessageText>{msg.content}</MessageText>
                            <MessageTime>{msg.time}</MessageTime>
                        </MessageContent>
                    </MessageItem>
                ))}
            </MessagesContainer>
            <form onSubmit={handleSendMessage}>
                <ChatInput>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </ChatInput>
            </form>
        </Container>
    );
};

export default ChatComponent;