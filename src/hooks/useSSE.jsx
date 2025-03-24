import { useEffect, useState } from 'react';


const useSSE = (listId) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/stream`);

        eventSource.onmessage = function(event) {
            const receivedData = JSON.parse(event.data);
            setData(receivedData);
        };

        eventSource.onerror = function() {
            console.error('Error with SSE connection');
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);
    
    return data;
};


export default useSSE;
