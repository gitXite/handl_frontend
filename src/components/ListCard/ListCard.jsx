import MotionWrapper from '@components/MotionWrapper';

import addWhiteIcon from '@assets/icons/add-white.png';
import deleteIcon from '@assets/icons/delete.png';
import editIcon from '@assets/icons/edit-square.png';
import shareIcon from '@assets/icons/share.png';

import './ListCard.css';


function ListCard () {
    return (
        <div className='list-card'>
            <MotionWrapper className={'list-fade'} transition={{ delay: 0.4 }}>
                <button className='list'>
                    <img src={editIcon} />
                    <div className='list-name'>
                        <p>Groceries</p>
                    </div>
                </button>
            </MotionWrapper>
            <div className='list-buttons'>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.5 }}>
                    <button>
                        <img src={addWhiteIcon} />
                    </button>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.6 }}>
                    <button>
                        <img src={shareIcon} />
                    </button>
                </MotionWrapper>
                <MotionWrapper className={'list-fade'} transition={{ delay: 0.7 }}>
                        <button>
                    <img src={deleteIcon} />
                    </button>
                </MotionWrapper>
            </div>
        </div>
    );
}


export default ListCard;