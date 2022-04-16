import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ILoan from '../types/loan';
import Loan from './Loan';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#ed6c02',
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const LoanList = () => {
  const [loans, setLoans] = useState<ILoan[]>();
  const { data: session } = useSession();

  useEffect(() => {
    const getLoans = async () => {
      const res = await fetch(`http://localhost:3500/loans`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.accessToken} `,
        },
      });
      const data = await res.json();
      setLoans(data);
    };
    getLoans();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 8 }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Libro</StyledTableCell>
                <StyledTableCell>Sacado por</StyledTableCell>
                <StyledTableCell>Fecha de inicio</StyledTableCell>
                <StyledTableCell>Fecha de fin</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans?.map((loan: ILoan) => (
                <Loan key={loan._id} loan={loan}></Loan>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
};

export default LoanList;
