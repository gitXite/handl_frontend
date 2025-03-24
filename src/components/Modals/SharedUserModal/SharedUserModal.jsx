import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserMinus } from 'lucide-react';

import MotionWrapper from '@components/MotionWrapper';
import api from '@utils/api';

import './SharedUserModal.css';


function SharedUserModal({ listId, message, onCancel }) {
    const [userToRemove, setUserToRemove] = useState(null);
    const queryClient = useQueryClient();
    
    const getSharedUsers = async () => {
        try {
            const sharedUsers = await api.get(`/api/lists/${listId}/shared-users`);
            return sharedUsers;
        } catch (error) {
            console.error('Error retrieving shared users:', error);
            return [];
        }
    };

    const handleRemoveModal = (userId) => {
        setUserToRemove(userId);
    };
    
    const confirmRemove = () => {
        if (userToRemove) {
            removeUserMutation.mutate(userToRemove);
        }
    };

    const { data: sharedUsers = [] } = useQuery({
        queryKey: ['sharedUsersList', listId],
        queryFn: getSharedUsers,
        enabled: !!listId,
    });

    const removeUserMutation = useMutation({
        mutationFn: async (userId) => {
            await api.delete(`/api/lists/${listId}/unshare/${userId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['sharedUsersList', listId]);
            setUserToRemove(null);
        },
    });

    useHotkeys('enter', confirmRemove, { enabled: !!userToRemove });
    useHotkeys('escape', () => {
        setUserToRemove(null);
        onCancel();
    });

    return (
        <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
            <div className='shared-user-modal'>
                <p>{message}</p>
                <ul className='shared-user-list'>
                    {sharedUsers.map((user) => (
                        <li key={user.id} className='shared-user'>
                            <p>{user.email}</p>
                            <button className='remove-user' onClick={() => handleRemoveModal(user.id)}>
                                <UserMinus size={25}/>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className='modal-actions'>
                    <button onClick={onCancel}>Back</button>
                </div>
            </div>

            {userToRemove && (
                <MotionWrapper className={'modal-overlay'} transition={{ duration: 0.2 }}>
                    <div className='confirmation-modal'>
                        <p>Are you sure you want to remove this user?</p>
                        <div className='modal-actions'>
                            <button className='confirm' onClick={confirmRemove}>Yes</button>
                            <button onClick={() => setUserToRemove(null)}>Cancel</button>
                        </div>
                    </div>
                </MotionWrapper>
            )}
        </MotionWrapper>
    );
}


export default SharedUserModal;
