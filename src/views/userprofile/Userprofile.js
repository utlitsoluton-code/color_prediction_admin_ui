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
import { useLocation } from 'react-router-dom'
import { userDeatil } from '../../endpoints'
import { useNavigate } from 'react-router-dom'

import userImage from '../../assets/images/new/user.svg'
import nameImage from '../../assets/images/new/user.svg'
import emailImage from '../../assets/images/new/email.svg'
import mobileImage from '../../assets/images/new/mobile.svg'
import balanceImage from '../../assets/images/new/rupees.svg'
import { useParams } from 'react-router-dom'

const Userprofile = () => {
  const { id } = useParams()

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setmobile] = useState('')
  const [winningBalance, setwinningBalance] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [parentReferralCode, setParentReferralCode] = useState('')
  const [responseStatus, setResponseStatus] = useState(false)

  const [userData, setUserBetsData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (!id) {
        return false
      }
      const response = await userDeatil(id)
      setResponseStatus(response?.meta?.status)


      setEmail(response?.email)
      setName(response?.name)
      setmobile(response?.mobile)
      setUserId(response?.userId)
      setwinningBalance(response?.winningBalance)
      setUserBetsData(response?.bets)
      setReferralCode(response?.referralCode)
      setParentReferralCode(response?.parentReferralCode)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
     { id && responseStatus ? <>
      {!loading ?
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={userImage} alt="User Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">User Id</span>
                <br />
                <span>{userId}</span>
              </div>
            }
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={nameImage} alt="Name Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Name</span>
                <br />
                <span>{name && name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </div>
            }
          />
        </CCol>

        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={mobileImage} alt="Mobile Number Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Mobile Number</span>
                <br />
                <span>{mobile}</span>
              </div>
            }
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={balanceImage} alt="Balance Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Winning Balance</span>
                <br />
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100px',
                    display: 'block',
                  }}
                >
                  {winningBalance}
                </span>
              </div>
            }
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={emailImage} className="" alt="Email Icon" width={28} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Email</span>
                <br />{' '}
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100px',
                    display: 'block',
                  }}
                >
                  {email}
                </span>
              </div>
            }
          />
        </CCol>

        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={nameImage} alt="Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Referral Code</span>
                <br />
                <span>{referralCode}</span>
              </div>
            }
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CImage src={nameImage} alt="Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Referred By</span>
                <br />
                <span>{parentReferralCode ? parentReferralCode : 'NA'}</span>
              </div>
            }
          />
        </CCol>
      </CRow>
  :<p>Loading...</p>
}
</> : <></>}
      <CRow>
        <CCol xs={12}>
          {/* Table Section */}
          <CCard className="mb-4">
            <CCardBody>
              <h5>Bets</h5>
              <div className="text-end">
                <button className="btn btn-primary mb-2" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Slot Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Bets No
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Amount
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Winning Number
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Winning Amount
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Status
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {responseStatus && typeof userData !== 'undefined' && userData.length > 0 ? (
                    userData.map((data) => (
                      <CTableRow key={data._id}>
                        <CTableDataCell className="text-center">
                          {data?.slot?.slotName}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a
                            className="btn-link"
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                          >
                            {data.number}
                          </a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">{data.amount}</CTableDataCell>
                        {/* <CTableDataCell className="text-center">{data.status}</CTableDataCell> */}
                        <CTableDataCell className="text-center">
                          {data.winningNumber ? data.winningNumber : 'NA'}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {data.winningAmount}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">{data.status}</CTableDataCell>

                        {/* <CTableDataCell className="text-center">
          <CFormSwitch
            label={`${data.status ? 'Active' : 'Deactive'}`}
            id={`formSwitchCheckChecked-${user._id}`}
            defaultChecked={user.active}
          />
        </CTableDataCell> */}
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center">
                        No record found.
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

export default Userprofile
