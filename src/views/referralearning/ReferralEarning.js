import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
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
import { ReferralEarningDeatil, userDeatil } from '../../endpoints'
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
  const [earningData, setUserEarningData] = useState([])
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [userParentInfo, setParentUserInfo] = useState({})
  const [responseStatus, setResponseStatus] = useState(false)


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
      const response = await ReferralEarningDeatil(id)
      console.log({response})
     
      setResponseStatus(response?.meta?.status)
      setUserEarningData(response?.data[0]?.childUsers)
      setUserInfo(response?.data[0])

      console.log(response)
      // setUserInfo(response1.data[0].user)

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
            icon={<CImage src={nameImage} alt="Name Icon" width={24} height={24} />}
            padding={false}
            value={
              <div>
                <span className="text-dark">Name</span>
                <br />
                <span>{userInfo.name}</span>
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
                <span>{userInfo.mobile}</span>
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
                <span className="text-dark">Referral earning</span>
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
                  {userInfo.totalEarnings}
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
                  {userInfo.email}
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
                <span>{userInfo.referralCode}</span>
              </div>
            }
          />
        </CCol>
        {/* <CCol xs={3}>
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
        </CCol> */}
      </CRow>
       :<p>Loading...</p>
    }
    </> : <></>}

    
      <CRow>
        <CCol xs={12}>
          {/* Table Section */}
          <CCard className="mb-4">
            <CCardBody>
              <h5>Referral Transaction
              </h5>
              <div className="text-end">
                <button className="btn btn-primary mb-2" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Total Earning
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      User Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      User Id
                    </CTableHeaderCell>

                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Level
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Profit
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Recharge Amount
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Referral Code
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Referred To
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Created At</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {responseStatus &&
                  typeof earningData !== 'undefined' &&
                  earningData.length > 0 ? (
                    earningData.map((earningData, index) => (
                      <CTableRow key={index}>
                        
                        <CTableDataCell className="text-center">
                          <a
                            className="btn-link"
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                          >
                            {earningData?.name &&
                              earningData?.name.charAt(0).toUpperCase() +
                                earningData?.name.slice(1)}
                          </a>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <a
                            className="btn-link"
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                          >
                            {earningData?.userId}
                          </a>
                        </CTableDataCell>

      
                        <CTableDataCell className="text-center">
                          {earningData?.level}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {earningData?.profit}
                        </CTableDataCell>

                        <CTableDataCell className="text-center">
                          {earningData.amount}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {earningData?.referralCode}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {earningData?.parentReferralCode
                            ? earningData?.parentReferralCode
                            : 'NA'}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {new Date(earningData?.createdAt).toLocaleString()}
                        </CTableDataCell>
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
