import React, { useMemo } from "react";
import { useTable } from "react-table";
import Swal from 'sweetalert2';

import {updateStatus} from "./../endpoints"
// import "./styles.css";
import '../scss/table/table.scss';
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


const Table = ({ data, setHandleUpdate, handleUpdate, visible, setVisible }) => {
  

    const Switch = ({ onChange, value }) => {
        
        return (
          <div className="switch">
            <input
              type="checkbox"
              checked={value}
              onChange={onChange}
            />
            <span className="slider round"></span>
          </div>
        );
      };
      const handleSlotDetail = async(row) => {
        if (!row || !row.original || !row.original._id) {
          console.error('Invalid row data');
          return;
        }
      
        try {
          await navigate('/slot-detail', { state: { id: row.original._id } });
        } catch (error) {
          console.error('Error navigating to slot detail:', error);
        }
      };
      
  const columns = useMemo(
    () => [
        { Header: 'Slot Number1', accessor: 'slotNumber' },
        { Header: 'Slot Name', accessor: 'slotName' },
        // { Header: 'startDate', accessor: 'startDate' },
        {
            Header: 'Start Date',
            accessor: 'startDate',
            Cell: ({ value }) => {
              const startDate = new Date(value);
              const year = startDate.getFullYear();
              const month = startDate.getMonth() + 1;
              const day = startDate.getDate();
              return <span>{`${month}/${day}/${year}`}</span>;
            },
          },
      
        {
            Header: 'Start Time',
            accessor: 'startTime',
            Cell: ({ value }) => {
              const startTime = new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              return <span>{startTime}</span>;
            },
          },
        {
            Header: 'End Time',
            accessor: 'endTime',
            Cell: ({ value }) => {
              const endTime = new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              return <span>{endTime}</span>;
            },
          },
          {
            Header: 'View',
            accessor: '_id',
            Cell: ({ row }) => (
              <button type="button" onClick={() => handleSlotDetail(row)} className="btn btn-primary">
                Slot Detail
              </button>
            ),
          },
          { Header: 'Status', accessor: 'status', Cell: ({ row }) =>
             <Switch onChange={() => handleStatusChange(row)} value={row.original.status}  /> },
    ],
    []
  );
  async function handleStatusChange(row) {
    data = row.original.status
    _id = row.original._id
    Swal.fire({
        title: 'Are you sure?',
        text: `You want to change status ${(data =='CLOSE')? "Close": "Open" }!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await updateStatus(_id, data)
                .then((d) => {
                    Swal.fire(
                        'Changed!',
                        `Status has been updated.`,
                        'success'
                    )
                    setHandleUpdate(!handleUpdate);
                })
                .catch(err => console.log("Err -> ", err))
        }
    })
}


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  const handleClose = () => {
    setVisible(!visible)
}

  return (
    <>
    <CRow>
   
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </CRow>
   
    </>
  );
};

export default Table;
