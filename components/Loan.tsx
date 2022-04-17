import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ILoan from '../types/loan';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import IBook from '../types/book';

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
  const { data: session } = useSession();
  const [loanBook, setLoanBook] = useState<IBook>();

  const initialDate = new Date(loan.initialDate);
  const finalDate = new Date(loan.finalDate);

  useEffect(() => {
    const getBook = async () => {
      const res = await fetch(`http://localhost:3500/books/${loan.bookId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await res.json();
      setLoanBook(data);
    };
    getBook();
  }, []);

  return (
    <StyledTableRow key={loan._id}>
      <StyledTableCell component="th" scope="loan">
        {loanBook?.title}
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
