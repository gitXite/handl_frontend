import { useContext } from 'react';
import { ListContext } from '@context/ListContext';

export const useList = () => useContext(ListContext);