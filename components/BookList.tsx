import IBook from '../types/book';
import Book from './Book';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const BookList = () => {
  const [books, setBooks] = useState<IBook[]>();
  const { data: session } = useSession();

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(`http://localhost:3500/books`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await res.json();
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 8 }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {books?.map((book: IBook) => (
          <Book key={book._id} book={book} />
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
