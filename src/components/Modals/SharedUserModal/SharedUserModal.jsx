import { useState, useEffect } from 'react';
import MotionWrapper from '@components/MotionWrapper';
import { useHotkeys } from 'react-hotkeys-hook';
import { useQuery } from '@tanstack/react-query';

import api from '@utils/api';
import { handleConfirm } from '@utils/handleFunctions';

import './SharedUserModal.css';


function SharedUserModal({ listId, message, onCancel, onRemove }) {
    const getSharedUsers = async () => {
        try {
            const sharedUsers = await api.get(`/api/lists/${listId}/shared-users`);
            return sharedUsers;
        } catch (error) {
            console.error('Error retrieving shared users:', error);
            return [];
        }
    };

    const { data: sharedUsers = [] } = useQuery({
        queryKey: ['sharedUsersList', listId],
        queryFn: getSharedUsers,
        enabled: !!listId,
    });

    useHotkeys('escape', onCancel);

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='shared-user-modal'>
                <p>{message}</p>
                <ul className='shared-user-list'>
                    {sharedUsers.map((user) => (
                        <li key={user.id} className='shared-user'>
                            <p>{user.email}</p>
                            <button onClick={() => onRemove(user.id)}></button>
                        </li>
                    ))}
                </ul>
                <div className='modal-actions'>
                    <button onClick={onCancel}>Back</button>
                </div>
            </div>
        </MotionWrapper>
    );
}


export default SharedUserModal;
