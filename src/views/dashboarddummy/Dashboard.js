import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import Swal from 'sweetalert2';
import {
  CCardGroup,
  CRow,
  CWidgetStatsC,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CPagination, CPaginationItem, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CFormLabel, CModalFooter,CFormSwitch

} from '@coreui/react'

import { DocsExample } from 'src/components'
import "../theme/colors/editor.css"
import { slotlist } from '../../endpoints';
const data = Array.from({ length: 30 }, (_, index) => {
  const slotNumber = `${(index + 1).toString().padStart(3, '0')}`;
  const slotName = `Slot ${index + 1}`;
  const startDate = new Date(2024, 5, index + 1).toLocaleDateString();
  const startTime = `${index % 12 + 1}:00 ${index < 12 ? 'AM' : 'PM'}`;
  const endTime = `${index % 12 + 2}:00 ${index < 11 ? 'AM' : 'PM'}`;
  const status = ''; 
  const isActive = true;
  return { slotNumber, slotName, startDate, startTime, endTime, status,isActive };
});


const columns = [
  { Header: 'Slot Number1', accessor: 'slotNumber' },
  { Header: 'Slot Name', accessor: 'slotName' },
  { Header: 'startDate', accessor: 'startDate' },
  { Header: 'Start Time', accessor: 'startTime' },
  { Header: 'End Time', accessor: 'endTime' },
  {
    Header: 'Status',
    accessor: 'OPEN',
    Cell: ({ row: { index }, value, column }) => {
      const [isActive, setIsActive] = useState(value);

      const handleSwitchChange = () => {
        setIsActive(!isActive);
        column.data1[index].isActive = !isActive;
      };

      return (
        <div>
          <span>{isActive ? 'OPEN' : 'CLOSE'}</span>
          <CFormSwitch
            label=""
            id={`formSwitchCheckChecked-${index}`}
            checked={isActive}
            onChange={handleSwitchChange}
          />
        </div>
      );
    },
  },
];
const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState("");
  const [filterInput, setFilterInput] = useState('');
  const [slotNumber, setSlotNumber] = useState('');
  const [slotName, setSlotName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [slotData, setSlotList] = useState();
  const [error , setError] = useState("")
  let perPageCount = 10;
  useEffect(()=>{
    const fetchSlotList = async () => {
      try {
        const data = await slotlist(perPageCount, currentPage);
         // Store token in local storage
         if (!data.meta.status) {
                setError(data.meta.msg);
              } else {
                setSlotList(data.data);
                console.log('list');
              }
        // handle successful login response
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSlotList();
  },[])
  console.log({slotData})
  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    // { columns, slotData, initialState: perPageCount },

    useGlobalFilter,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    pageCount,
    page
  } = tableInstance;
  console.log({getTableProps,prepareRow,getTableBodyProps,headerGroups,page})

  const handleFilterChange = e => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setFilterInput(value);
  };

  
  const handlePageChange = (pageIndex) => {
    setCurrentPage(currentPage);
    
  };
  
  const handlePreviousClick = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };
  
  const handleNextClick = () => {
    if (currentPage < pageCount - 1) {
      handlePageChange(currentPage + 1);
    }
  };
  
    const toggleModal = () => {
      setVisible(!visible);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Form validation
      if (!slotNumber || !slotName || !startDate || !startTime || !endTime) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all fields!',
        });
        return;
      }
  
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully!',
      });
  
    };
  return (
    <>

      <CRow>

        <DocsExample href="components/widgets/#cwidgetstatsc">

        </DocsExample>

        <CCard className="">
          <CCardHeader className="">
            <CRow className="justify-content-between align-items-center mb-2">
              <CCol xs={4} className="">
                <h5>Slot Management</h5>
              </CCol>
              <CCol xs={4} className="text-end">

                <CForm className="d-flex">
                  <CFormInput type="search" className="me-2" value={filterInput}
                    onChange={handleFilterChange}
                    placeholder="Search Slot..." />
                </CForm>
              </CCol>
              <CCol xs={4} className="text-end">

                <CCol xs={4} className="text-end">
                  <CButton color="primary" onClick={toggleModal}>Add List</CButton>
                </CCol>
              </CCol>
            </CRow>
          </CCardHeader>
          <CTable {...getTableProps()}>
        <CTableHead>
          {headerGroups.map(headerGroup => (
            <CTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <CTableHeaderCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          ))}
        </CTableHead>
        <CTableBody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <CTableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <CTableDataCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </CTableDataCell>
                ))}
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
          <div className="pagination">
            <CPagination
              aria-label="Page navigation example"
              activePage={currentPage + 1}
              pages={pageCount}
              onActivePageChange={handlePageChange}
            >
              <CPaginationItem disabled={currentPage === 0} onClick={handlePreviousClick}>
                Previous
              </CPaginationItem>
              {Array.from({ length: pageCount }, (_, index) => (
                <CPaginationItem key={index} active={index === currentPage} onClick={() => handlePageChange(index)}>
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem disabled={currentPage === pageCount - 1} onClick={handleNextClick}>
                Next
              </CPaginationItem>
            </CPagination>
          </div>
        </CCard>
      </CRow>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Add Slot</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit} className="form-container">
            <div className="mb-3">
              <CFormLabel htmlFor="slotNumberInput" className="form-label">Slot Number</CFormLabel>
              <CFormInput
                type="text"
                id="slotNumberInput"
                name="slotNumber"
                value={slotNumber}
                onChange={(e) => setSlotNumber(e.target.value)}
                placeholder="Enter slot number"
                className="input-field"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="slotNameInput" className="form-label">Slot Name</CFormLabel>
              <CFormInput
                type="text"
                id="slotNameInput"
                name="slotName"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                placeholder="Enter slot name"
                className="input-field"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="dateInput" className="form-label">Date</CFormLabel>
              <CFormInput
                type="date"
                id="dateInput"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="startTimeInput" className="form-label">Start Time</CFormLabel>
              <CFormInput
                type="time"
                id="startTimeInput"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="endTimeInput" className="form-label">End Time</CFormLabel>
              <CFormInput
                type="time"
                id="endTimeInput"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="mb-3">
              <CFormLabel className="form-label">Active</CFormLabel>
              <CFormSwitch
                label={isActive ? "Active" : "Deactive"}
                id="formSwitchCheckChecked"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
            </div>
            <CModalFooter>
              <CButton color="primary" type="submit">Submit</CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Dashboard
