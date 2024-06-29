import React, {useState,useEffect} from 'react';
import {
  CWidgetStatsF,
  CCard,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
  CButton,
  CCardBody,
  CFormSwitch,
} from '@coreui/react';
import { useLocation } from 'react-router-dom';
import { userlist, userStatusChange } from '../../endpoints';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// import userImage from "../../../assets/images/new/user.svg"
// import nameImage  from '../../../assets/images/new/user.svg';
// import emailImage from  '../../../assets/images/new/email.svg';
// import mobileImage from  '../../../assets/images/new/mobile.svg';
// import balanceImage from  '../../../assets/images/new/rupees.svg';
const User = () => {
  const [userData, setUserData] = useState([]);
  const [rawStatus, setstatus] = useState("");
  const [handleUpdate, setHandleUpdate] = useState(false);

   const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [handleUpdate]);

  const fetchData = async () => {
    try {
      const response = await userlist();
      const agents = await response.data;
      console.log({agents})

      await setUserData(agents)
      // setData(agents);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
 
  const location = useLocation();
  const navigateToBetList = () => {
    window.location.href = '/bet-list'; 
  };
    const handleSwitchChange = (userId) => {
      setUserData(prevUserData =>
        prevUserData.map(user =>
          user.id === userId ? { ...user, active: !user.active } : user
        )
      );
    };
    const handleUserDetail = async(id) => {
   navigate(`/userprofile/${id}`);
    };
    async function handleStatusChange(_id, data) {
      console.log(data)
      if(!_id || ! data){
       return  false
      }
      setstatus((data =='ACTIVE')? "DEACTIVE": "ACTIVE" )
      Swal.fire({
          title: 'Are you sure?',
          text: `You want to change status ${(data =='ACTIVE')? "Deactive": "Active" }!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
      }).then(async (result) => {
          if (result.isConfirmed) {
              await userStatusChange(_id, data==='ACTIVE' ? "DEACTIVE":"ACTIVE")
                  .then((d) => {
                      Swal.fire(
                          'Changed!',
                          `Status has been updated.`,
                          'success'
                      )
  
                      setstatus((prev)=>  (prev === 'ACTIVE')? 'DEACTIVE' : "ACTIVE")
                       setHandleUpdate(!handleUpdate);
                  })
                  .catch(err => console.log("Err -> ", err))
          }
      })
  }
    // const itemsPerPage = 10;
    // const [currentPage, setCurrentPage] = useState(1);
  
    // const lastIndex = currentPage * itemsPerPage;
    // const firstIndex = lastIndex - itemsPerPage;
    // const currentItems = userData.slice(firstIndex, lastIndex);
  
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
   {/* <CRow>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CImage src={userImage} alt="User Icon" width={24} height={24} />}
          padding={false}
          title="User Id"
          value="Shadab2378"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CImage src={nameImage} alt="Name Icon" width={24} height={24} />}
          padding={false}
          title="Name"
          value="Name of user"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CImage src={emailImage} alt="Email Icon" width={24} height={24} />}
          padding={false}
          title="Email"
          value="Username@gmail.com"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CImage src={mobileImage} alt="Mobile Number Icon" width={24} height={24} />}
          padding={false}
          title="Mobile Number"
          value="+91 8956412325"
        />
      </CCol>
      <CCol xs={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          icon={<CImage src={balanceImage} alt="Balance Icon" width={24} height={24} />}
          padding={false}
          title="Balance"
          value="₹8000"
        />
      </CCol>
    </CRow> */}
    <CRow>
      <CCol xs={12}>
        {/* Table Section */}
        <CCard className="mb-4">
          <CCardBody>
            <h5>Users</h5>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">User ID</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Referral Code</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Referred By</CTableHeaderCell>

                  <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Mobile</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Balance</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Action</CTableHeaderCell>

                  <CTableHeaderCell className="bg-body-tertiary text-center">View</CTableHeaderCell>
                  


                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Render rows dynamically from userData */}
                {
                 userData.length > 0 ? (
                userData.map((user) => (
                  <CTableRow key={user.userId}>
                    <CTableDataCell className="text-center">{user?.userId}</CTableDataCell>
                    <CTableDataCell className="text-center">
  {user?.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {user?.referralCode}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {user?.parentReferralCode ? user?.parentReferralCode :  "NA"}
                    </CTableDataCell>
                    <CTableDataCell  style={{
          overflow: 'hidden',
        }} className="text-center">{user?.email}</CTableDataCell>
                    <CTableDataCell className="text-center">{user?.mobile}</CTableDataCell>
                    <CTableDataCell className="text-center">{user?.winningBalance}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {(user?.status ==='ACTIVE') ? 'Active' : 'Deactive'}
                    </CTableDataCell>
                    {/* <CTableDataCell className="text-center">
                        <CButton onClick={() => handleStatusChange(user._id, user?.status)}>{user?.status === 'ACTIVE' ? 'Deactive' : 'Active'}</CButton>
                      </CTableDataCell> */}
                    <CTableDataCell className="text-center">
  <CButton 
    onClick={() => handleStatusChange(user._id, user?.status)} 
    style={{
      backgroundColor: user?.status === 'ACTIVE' ? 'green' : 'red',
      color: 'white' // add this to make the text visible
    }}
  >
    {user?.status === 'ACTIVE' ? 'Deactive' : 'Active'}
  </CButton>
</CTableDataCell>
                     
                    <CTableDataCell className="text-center">
  <CButton onClick={() => handleUserDetail(user._id)}>View</CButton>
</CTableDataCell>
                  </CTableRow>
                )) ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      No bets record found.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default User
