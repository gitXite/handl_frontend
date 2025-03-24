import { createContext, useState } from 'react';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [listName, setListName] = useState('');

    return (
        <ListContext.Provider value={{ listName, setListName }}>
            {children}
        </ListContext.Provider>
    );
}