import React, { useState, useMemo } from 'react';

import { connect } from 'react-redux';

import * as TableActions from '../../../store/actions/table';

import {
    useTable,
    // useGroupBy,
    // useFilters,
    // useExpanded,
    // usePagination,
} from 'react-table';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/Edit';

import './style.css';


function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className="table-pagination">
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="primeira página"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="pagina anterior">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="próxima pagina"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="ultima página"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

const TableRedux = ({ table, dispatch, pageSize }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize ? pageSize : 5);

    const columns = useMemo(() => table.headers, [table.headers]);

    function selectHandler(e) {
        const selected_id = e.currentTarget.id;
        dispatch(TableActions.updateTable(table.headers, table.data, selected_id))
        return true;
    }

    table.data.map(item => {
        item.id = <IconButton
            className="btn-select"
            id={item.id}
            onClick={selectHandler}
            size="small">
            <EditIcon />
        </IconButton>;
        return true;
    });

    const data = useMemo(() => table.data, [table.data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // //Paginação
        // // pageOptions,
        // // page,
        // state: { pageIndex, pageSize },
        // // gotoPage,
        // previousPage,
        // nextPage,
        // // setPageSize,
        // canPreviousPage,
        // canNextPage,
    } = useTable({
        columns,
        data,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {!data.length > 0 ?
                <h1 className="app-subtitle" style={{ textAlign: 'center' }}>Não foram encontrado Dados</h1>
                :
                <>
                    <TableContainer component={Paper}>
                        <Table className="app-table" aria-label="Tabela de Registros" {...getTableProps()}>
                            <TableHead>
                                {headerGroups.map(headerGroup => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <TableCell {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {(rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map((cell, index) => {
                                                return <TableCell key={index} component="th" scope="row">
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'Todos', value: -1 }]}
                                        colSpan={table.headers.length}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'linhas por página' },
                                            native: true,
                                        }}
                                        labelRowsPerPage="Linhas por página"
                                        labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </>
            }
        </>
    )
}

export default connect(state => ({ table: state.table }))(TableRedux);