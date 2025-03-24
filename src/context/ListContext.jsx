import { createContext, useEffect, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [listName, setListName] = useState(() => {
        return localStorage.getItem('listName') || '';
    });

    useEffect(() => {
        localStorage.setItem('listName', listName);
    }, [listName]);

    return (
        <ListContext.Provider value={{ listName, setListName }}>
            {children}
        </ListContext.Provider>
    );
}