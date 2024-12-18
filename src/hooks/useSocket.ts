// src/hooks/useSocket.ts
import { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { ChatMessage } from '@typings/chat';
import { toast } from 'react-toastify';

interface UseSocketReturn {
    stompClient: Client | null;
    messages: ChatMessage[];
    connectedUsers: string[];
    sendMessage: (chatMessage: ChatMessage) => void;
    addUser: (chatMessage: ChatMessage) => void;
}

export function useSocket(): UseSocketReturn {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${import.meta.env.VITE_WS_URL}/ws-stocktide`),
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log('WebSocket Connected');

                if (client.connected) {
                    // 메시지 구독
                    client.subscribe('/topic/public', (message) => {
                        const newMessage = JSON.parse(message.body);
                        setMessages(prev => [...prev, newMessage]);
                    });

                    // 접속자 목록 구독
                    client.subscribe('/topic/users', (message) => {
                        const statusUpdate = JSON.parse(message.body);
                        setConnectedUsers(statusUpdate.connectedUsers);

                        if (statusUpdate.type === 'CONNECTED') {
                            toast.info(`${statusUpdate.username} joined the chat`);
                        } else if (statusUpdate.type === 'DISCONNECTED') {
                            toast.info(`${statusUpdate.username} left the chat`);
                        }
                    });
                }
            },
            onDisconnect: () => {
                console.log('WebSocket Disconnected');
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            }
        });

        setStompClient(client);

        try {
            client.activate();
        } catch (error) {
            console.error('Failed to connect:', error);
        }

        return () => {
            client.deactivate();
        };
    }, []);

    const sendMessage = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && stompClient.connected && chatMessage.type === 'CHAT') {
            try {
                stompClient.publish({
                    destination: '/app/chat.sendMessage',
                    body: JSON.stringify(chatMessage)
                });
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    }, [stompClient]);

    const addUser = useCallback((chatMessage: ChatMessage) => {
        if (stompClient && stompClient.connected && chatMessage.type === 'JOIN') {
            stompClient.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify(chatMessage)
            });
        }
    }, [stompClient]);

    return {
        stompClient,
        messages,
        connectedUsers,
        sendMessage,
        addUser
    };
}