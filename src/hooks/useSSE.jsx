import { useEffect } from 'react';


export const useSSE = (eventHandler) => {
    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/events`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            eventHandler(data);
        };

        eventSource.onerror = () => {
            console.error('Error with SSE connection');
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [eventHandler]);
};

