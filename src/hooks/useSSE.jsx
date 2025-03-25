import { useEffect } from 'react';


export const useSSE = (eventHandler) => {
    useEffect(() => {
        let eventSource;

        const connect = () => {
            eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/events`);

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                eventHandler(data);
            };
    
            eventSource.onerror = () => {
                console.error('Error with SSE connection');
                eventSource.close();
                setTimeout(connect, 3000);
            };

            eventSource.onclose = () => {
                console.log('SSE connection closed. Reconnecting...');
                eventSource.close();
                setTimeout(connect, 3000);
            };
        };

        connect();

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [eventHandler]);
};

