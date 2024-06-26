import React, { useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

const data = Array.from({ length: 30 }, (_, index) => {
  const slotNumber = `${(index + 1).toString().padStart(3, '0')}`;
  const slotName = `Slot ${index + 1}`;
  const winningNumber = `Winning ${index + 1}`;
  const betNumber = `Bet ${index + 1}`;
  const amount = `$${(index + 1) * 100}`;
  const isWin = index % 2 === 0; // Example: Set isWin based on index, modify as per your logic
  return { slotNumber, slotName, winningNumber, betNumber, amount, isWin };
});

const Betlist = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterInput, setFilterInput] = useState('');

  const columns = [
    { Header: 'Slot No.', accessor: 'slotNumber' },
    { Header: 'Slot Name', accessor: 'slotName' },
    { Header: 'Winning Number', accessor: 'winningNumber' },
    { Header: 'Bet Number', accessor: 'betNumber' },
    { Header: 'Amount', accessor: 'amount' },
    {
      Header: 'Status',
      accessor: 'isWin',
      Cell: ({ value }) => {
        const actionText = value ? 'Win' : 'Loss';
        const actionColor = value ? 'text-success' : 'text-danger';
        return <span className={actionColor}>{actionText}</span>;
      },
    },
  ];

  const tableInstance = useTable(
    { columns, data, initialState: { pageSize: 10 } },
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
    page,
  } = tableInstance;

  const handleFilterChange = (e) => {
    const value = e.target.value || '';
    setGlobalFilter(value);
    setFilterInput(value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handlePreviousClick = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <CCard>
        <CCardHeader>
          <CRow className="justify-content-between align-items-center mb-2">
            <CCol xs={4}>
              <h5>Bet List</h5>
            </CCol>
            <CCol xs={4} className="text-end">
              <CForm className="d-flex">
                <CFormInput
                  type="search"
                  className="me-2"
                  value={filterInput}
                  onChange={handleFilterChange}
                  placeholder="Search Slot..."
                />
              </CForm>
            </CCol>
          </CRow>
        </CCardHeader>
        <CTable {...getTableProps()}>
          <CTableHead>
            {headerGroups.map((headerGroup) => (
              <CTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <CTableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            ))}
          </CTableHead>
          <CTableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <CTableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
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
              <CPaginationItem
                key={index}
                active={index === currentPage}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === pageCount - 1}
              onClick={handleNextClick}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </div>
      </CCard>
    </div>
  );
};

export default Betlist;
