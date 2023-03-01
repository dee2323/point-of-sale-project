import React, { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Overlay from '../../../views/Products/ProductModal';
import OverlayCategory from '../../../views/category/CategoryModal';
import Confirm from '../ConfirmModale/index';
import { CategoryColumn, ProductColumn, products, category } from '../../../types';

interface Props<T> {
  type ?:string
  add: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleting: (id: string) => void | undefined;
  items: T[] | undefined;
  message: string;
  columns: readonly (CategoryColumn | ProductColumn)[];
}

export default function StickyHeadTable<T extends products | category>({
  add,
  setAdd,
  handleDeleting,
  items,
  message,
  columns,
  type
}: Props<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);
  const rows: T[] = items ?? []
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };
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
              {items?.length ? <TableCell>Delete</TableCell> : ''}
              {items?.length ? <TableCell>Edit</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {!items?.length ? (
              <div className="empty">{message}</div>
            ) : (
              items
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: T) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                      {columns.map((column) => {

                        const value: string | number = column.id in row ? row[column.id as keyof typeof row] as string | number : '';
                        if (column.id === 'image')
                        {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <img src={String(value) || './ images / shop.jpg'}  alt='' />
                            </TableCell>
                          )
                        } else
                        {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        }
                      })}
                      <TableCell key={'delet'}>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => {
                            setId(String(row.id) || '');
                            setShowConfirm(true);
                          }}
                        />
                      </TableCell>
                      <TableCell key={'edit'}>
                        <i
                          className="fa-solid fa-pen-to-square edit"
                          onClick={() => {
                            setId(String(row.id) || '');
                            setEdit(true);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {items?.length ? (
        <TablePagination
          rowsPerPageOptions={[5, 4, 6]}
          component="span"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : ''}
 {
 
    (type==='products') ?(edit || add) && <Overlay setAdd={setAdd} id={id} edit={edit} setEdit={setEdit} />
  :(edit || add) && <OverlayCategory setAdd={setAdd} id={id} edit={edit} setEdit={setEdit} />
}

      {showConfirm && (
        <Confirm
          setShowOverlay={setShowConfirm}
          id={id}
          handleDeleting={handleDeleting}
        />
      )}
    </Paper>)
}