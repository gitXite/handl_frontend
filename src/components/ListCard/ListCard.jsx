import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MotionWrapper from '@components/MotionWrapper';

import addWhiteIcon from '@assets/icons/add-white.png';
import deleteIcon from '@assets/icons/delete.png';
import editIcon from '@assets/icons/edit-square.png';
import shareIcon from '@assets/icons/share.png';

import './ListCard.css';


function ListCard({ list }) {
    const navigate = useNavigate();

    const deleteList = async (id) => {
        await axios.delete(`/lists/${id}`);
        setLists(lists.filter((list) => list.id !== id));
    };
    
    return (
        <div className='list-card'>
            <MotionWrapper className={'list-fade'} transition={{ delay: 0.4 }}>
                <button className='list' onClick={() => navigate(`/lists/${list.id}`)}>
                    <img src={editIcon} alt='Edit list'/>
                    <div className='list-name'>
                        <p>{list.name}</p>
                    </div>
                </button>
            </MotionWrapper>
            <div className='list-buttons'>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.5 }}>
                    <button>
                        <img src={addWhiteIcon} alt='Add item'/>
                    </button>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.6 }}>
                    <button>
                        <img src={shareIcon} alt='Share list'/>
                    </button>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.7 }}>
                    <button onClick={deleteList(list.id)}>
                        <img src={deleteIcon} alt='Delete list'/>
                    </button>
                </MotionWrapper>
            </div>
        </div>
    );
}


export default ListCard;
