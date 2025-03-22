import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Items.css';


function ItemsPage() {
    const { id } = useParams();
    
    return (
        <div className='items-container'>
            <div className='items-subcontainer'>
                
            </div>
        </div>
    );
}
