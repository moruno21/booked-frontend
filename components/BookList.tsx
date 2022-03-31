import IBook from '../types/book';
import Book from './Book';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState<IBook[]>();

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch(`http://localhost:3500/books`);
      const data = await res.json();
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 8 }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {books?.map((book: IBook, index) => (
          <Book key={book._id} book={book} />
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
