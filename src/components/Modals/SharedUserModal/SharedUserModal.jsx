import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserMinus } from 'lucide-react';
import { Tooltip, Zoom } from '@mui/material';
import { useAuth } from '@hooks/useAuth';
import MotionWrapper from '@components/MotionWrapper';
import api from '@utils/api';
import './SharedUserModal.css';


function SharedUserModal({ listId, message, onCancel }) {
    const { currentUser } = useAuth();
    const [userToRemove, setUserToRemove] = useState(null);
    const [notice, setNotice] = useState('');
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
        if (userId === currentUser.id) {
            setNotice('Only the owner can remove users');
            return;
        }
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
                            <Tooltip
                                title='Remove user'
                                disableInteractive
                                slots={{
                                    transition: Zoom,
                                }}
                                enterDelay={500}
                                enterNextDelay={500}
                                slotProps={{
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: { offset: [0, -5] },
                                            },
                                        ],
                                    },
                                }}
                            >
                                <button className='remove-user' onClick={() => handleRemoveModal(user.id)}>
                                    <UserMinus size={20}/>
                                </button>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
                <div className='modal-notice-container'>
                    {notice && (
                        <MotionWrapper className={'modal-fade'} transition={{ duration: 0.2 }}>
                            <i className='modal-notice'>{notice}</i>
                        </MotionWrapper>
                    )}
                </div>
                <div className='modal-actions'>
                    <button onClick={onCancel}>Back</button>
                </div>
            </div>

            {userToRemove && (
                <MotionWrapper className={'modal-nested-overlay'} transition={{ duration: 0.2 }}>
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
