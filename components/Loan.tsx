import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ILoan from '../types/loan';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Loan = ({ loan }: { loan: ILoan }) => {
  return (
    <StyledTableRow key={loan._id}>
      <StyledTableCell component="th" scope="loan">
        {loan.bookId}
      </StyledTableCell>
      <StyledTableCell>{loan.userId}</StyledTableCell>
      <StyledTableCell>{loan.initialDate}</StyledTableCell>
      <StyledTableCell>{loan.finalDate}</StyledTableCell>
    </StyledTableRow>
  );
};

export default Loan;
