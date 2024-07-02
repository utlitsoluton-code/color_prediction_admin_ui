import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import { slotlist, updateStatus } from '../../endpoints'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const [userData, setUserData] = useState([])
  const [rawStatus, setstatus] = useState('')
  const [handleUpdate, setHandleUpdate] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await slotlist();
      const agents = await response.data;
      setResponseStatus(response?.meta?.status)

      await setUserData(agents)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const toggleModal = async () => {
    await navigate('/slot')
  }

  //   async function handleStatusChange(_id, data) {
  //     console.log(data)
  //     if(!_id || ! data){
  //      return  false
  //     }
  //     setstatus((data =='CLOSE')? "OPEN": "CLOSE" )
  //     Swal.fire({
  //         title: 'Are you sure?',
  //         text: `You want to change status ${(data =='CLOSE')? "Open": "Close" }!`,
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes!'
  //     }).then(async (result) => {
  //         if (result.isConfirmed) {
  //             await updateStatus(_id, data==='CLOSE' ? "OPEN":"CLOSE")
  //                 .then((d) => {
  //                     Swal.fire(
  //                         'Changed!',
  //                         `Status has been updated.`,
  //                         'success'
  //                     )

  //                     setstatus((prev)=>  (prev === 'CLOSE')? 'CLOSE' : "OPEN")
  //                      setHandleUpdate(!handleUpdate);
  //                 })
  //                 .catch(err => console.log("Err -> ", err))
  //         }
  //     })
  // }
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          {/* Table Section */}
          <CCard className="mb-4">
            <CCardBody>
              <h5>Slots</h5>
              <div className="text-end">
                <button type="submit" onClick={toggleModal} className="btn btn-primary mb-2">
                  Add Slot
                </button>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Slot Number
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Slot Name{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Start Date{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Start Time{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      End Time{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Status
                    </CTableHeaderCell>

                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Action
                    </CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* Render rows dynamically from userData */}
                   {responseStatus && typeof userData !== 'undefined' && userData.length > 0 ? (
                    userData.map((user) => (
                      <CTableRow key={user._id}>
                        <CTableDataCell className="text-center">{user?.slotNumber}</CTableDataCell>
                        <CTableDataCell className="text-center">{user?.slotName}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          {new Date(user?.startDate).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {new Date(user?.startTime).toLocaleTimeString()}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {new Date(user?.endTime).toLocaleTimeString()}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                          //                   style={{
                          //   backgroundColor: user?.status === 'OPEN' ? 'green' : 'red',
                          //   color: 'white' // add this to make the text visible
                          // }}
                          >
                            {user?.status}
                          </CButton>
                        </CTableDataCell>
                        {/* <CTableDataCell className="text-center">
                        <CButton onClick={() => handleStatusChange(user._id, user?.status)}>{user?.status === 'OPEN' ? 'Close' : 'Open'}</CButton>
                      </CTableDataCell> */}
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center">
                        No Slot record found.
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
