import React from 'react'
import { useLocation } from 'react-router-dom';
import { slotlist } from '../../endpoints';
import { useNavigate } from 'react-router-dom';

function SlotDetail() {
    const location = useLocation();
    const id = location.state?.id;
  
    // Use the id to fetch data or perform other actions
    console.log(`Received id: ${id}`);
  return (
    <div>SlotDetail</div>
  )
}

export default SlotDetail