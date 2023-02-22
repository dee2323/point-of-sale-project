
import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { category, products } from '../../types';
import { CategoryColumn } from '../../types';
import Overlay from './CategoryModal';
import Confirm from '../../components/common/ConfirmModale';
import { categoriesContext } from '../../context/CategoryContext';
const columns: readonly CategoryColumn[] = [
    { id: 'category', label: 'Category', minWidth: 80 },
];

interface props {
    add: boolean;
    setAdd: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function StickyHeadTable({ add, setAdd }: props) {
    const sampleAppContext = useContext(categoriesContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [showConfirm, setShowConfirm] = React.useState(false)
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    const rows: category[] | undefined = sampleAppContext?.categories;
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(!rows?.length)
    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>

                            ))}
                            {rows?.length ? <TableCell>Delete</TableCell> : ''}
                            {rows?.length ? <TableCell>Edit</TableCell> : ''}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {

                            !rows?.length ? <div className='empty'>
                                no categories to show! </div> :
                                rows
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value: any = row[column.id];

                                                    return (
                                                        <TableCell key={column.id} align={column.align}>


                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}

                                                <TableCell key={'delet'} >
                                                    <i className="fa-solid fa-trash"
                                                        onClick={() => { setId(String(row.id) || ''); setShowConfirm(true) }}></i>

                                                </TableCell>
                                                <TableCell key={'edit'} >
                                                    <i className="fa-solid fa-pen-to-square edit"
                                                        onClick={() => {
                                                            setId(String(row.id) || '');
                                                            setEdit(true)
                                                        }}
                                                    ></i>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}


                    </TableBody>
                </Table>
            </TableContainer>
            {rows?.length ? <TablePagination
                rowsPerPageOptions={[5, 4, 6]}
                component="span"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> : ''}
            {
                (edit || add) && <Overlay setAdd={setAdd} id={id} edit={edit} setEdit={setEdit} />
            }
            {showConfirm && <Confirm setShowOverlay={setShowConfirm} id={id}
                handleDeleting={sampleAppContext?.handleDeletingCategory} />}

        </Paper>


    );
}
