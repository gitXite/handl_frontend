import MotionWrapper from '../MotionWrapper';
import './ItemCard.css';


function ItemCard({ item }) {
    return (
        <div className='item-card'>
            <MotionWrapper className={'item-fade'}>

            </MotionWrapper>
        </div>
    );
}


export default ItemCard;
