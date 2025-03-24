import { useContext } from 'react';
import { ListContext } from '@context/ListProvider';

export const useList = () => useContext(ListContext);