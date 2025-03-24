import { useEffect, useState } from 'react';


export const useSSE = (eventHandler) => {
    const [sseData, setSseData] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/events`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setSseData(data);
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

    return sseData;
};

