import { useEffect, useState } from 'react';


const useSSE = (listId) => {
    const [items, setItems] = useState([]);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/events?${listId}`);

        eventSource.onmessage = (event) => {
            const { event: type, data } = JSON.parse(event.data);

            if (type === 'ITEM_ADDED') {
                setItems(prev => [...prev, data]);
            } else if (type === 'ITEM_UPDATED') {
                setItems(prev => prev.map(item => (item.id === data.id ? data : item)));
            } else if (type === 'ITEM_DELETED') {
                setItems(prev => prev.filter(item => item.id !== data.id));
            } else if (type === 'LIST_ADDED') {
                setLists(prev => [...prev, data]);
            } else if (type === 'LIST_DELETED') {
                setLists(prev => prev.filter(list => list.id !== data.id));
            }
        };

        return () => eventSource.close();
    }, [listId])
    
    return { items, lists };
};


export default useSSE;
