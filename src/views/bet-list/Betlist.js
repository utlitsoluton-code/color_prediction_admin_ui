import React, {useState} from 'react';
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

// import userImage from "../../../assets/images/new/user.svg"
// import nameImage  from '../../../assets/images/new/user.svg';
// import emailImage from  '../../../assets/images/new/email.svg';
// import mobileImage from  '../../../assets/images/new/mobile.svg';
// import balanceImage from  '../../../assets/images/new/rupees.svg';
const Betlist = () => {
  
  const [userData, setUserData] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', mobile: '1234567890', balance: '$1000', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '9876543210', balance: '$2000', active: false },
  ]);
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
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = userData.slice(firstIndex, lastIndex);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                  <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Mobile</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Balance</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Active/Deactive</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* Render rows dynamically from userData */}
                {userData.map((user) => (
                  <CTableRow key={user.id}>
                    <CTableDataCell className="text-center">{user.id}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <a className="btn-link" style={{cursor:"pointer", textDecoration:"none"}} onClick={navigateToBetList}>{user.name}</a>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{user.email}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.mobile}</CTableDataCell>
                    <CTableDataCell className="text-center">{user.balance}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormSwitch
                        label={`${user.active ? 'Active' : 'Deactive'}`}
                        id={`formSwitchCheckChecked-${user.id}`}
                        defaultChecked={user.active}
                        onChange={() => handleSwitchChange(user.id)}
                      />
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default Betlist
