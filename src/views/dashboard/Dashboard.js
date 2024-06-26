// import React, { useState, useEffect } from "react";
// import Table from "../../components/Table";
// import { slotlist } from '../../endpoints';
// import { useNavigate } from 'react-router-dom';

// const dashboard = () => {
//   const [data, setData] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [handleUpdate, setHandleUpdate] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, [handleUpdate]);

//   const fetchData = async () => {
//     try {
//       const response = await slotlist();
//       const agents = await response.data;
//       console.log({agents})

      
//       setData(agents);


//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const toggleModal = async() => {
//     await navigate('/slot');
//     // setVisible(!visible);
//   };

//   return (
//     <div>
//         <div className="col"><h1 className="text-start">Slot Management</h1>
//         <div className='text-end' >
//         <button type="submit" onClick={toggleModal}  className="btn btn-primary">Add Slot</button>
//         </div>

//         {/* <button className="text-end" color="primary" onClick={toggleModal} >Add List</button> */}
//         </div>
//       <Table setHandleUpdate={setHandleUpdate} handleUpdate={handleUpdate} visible={visible} setVisible={setVisible} data={data} />
//     </div>
//   );
// };

// export default dashboard;
import React from 'react'

function Dashboard() {
  return (
    <>
    
    </>
    

  )
}

export default Dashboard
