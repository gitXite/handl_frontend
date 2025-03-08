import { useEffect, useState } from 'react';
import api from '../utils/api';


const useSSE = (listId) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get(`/api/lists/${listId}/items`)
            .then(res => setItems(res.data))
            .catch(err => console.error('Error fetching items:', err));

        const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/events?${listId}`);

        eventSource.onmessage = (event) => {
            const { event: type, data } = JSON.parse(event.data);

            if (type === 'ITEM_ADDED') {
                setItems(prev => [...prev, data]);
            } else if (type === 'ITEM_UPDATED') {
                setItems(prev => prev.map(item => (item.id === data.id ? data : item)));
            } else if (type === 'ITEM_DELETED') {
                setItems(prev => prev.filter(item => item.id !== data.id));
            }
        };

        return () => eventSource.close();
    }, [listId])
    
    return items;
};


export default useSSE;
