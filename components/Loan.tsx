import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ILoan from '../types/loan';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
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
  const initialDate = new Date(loan.initialDate);
  const finalDate = new Date(loan.finalDate);

  return (
    <StyledTableRow key={loan._id}>
      <StyledTableCell component="th" scope="loan">
        {loan.bookId}
      </StyledTableCell>
      <StyledTableCell>{`${initialDate.getDate()}/${initialDate.getMonth()}/${initialDate.getFullYear()}`}</StyledTableCell>
      <StyledTableCell>
        {loan.finalDate ? (
          `${finalDate.getDate()}/${finalDate.getMonth()}/${finalDate.getFullYear()}`
        ) : (
          <Button color="warning" variant="contained">
            Devolver
          </Button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Loan;
