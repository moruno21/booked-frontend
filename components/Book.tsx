import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IBook from '../types/book';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ILoan from '../types/loan';

const Book = ({ book }: { book: IBook }) => {
  const [currentBookLoan, setCurrentBookLoan] = useState<ILoan>();
  const { data: session } = useSession();

  useEffect(() => {
    const getBookLoans = async () => {
      const res = await fetch(`http://localhost:3500/loans/${book._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const data = await res.json();
      if (Object.keys(data).length !== 0) setCurrentBookLoan(data);
    };
    getBookLoans();
  }, []);

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
        <CardActions>
          {currentBookLoan ? (
            <Typography variant="body2">Libro prestado</Typography>
          ) : (
            <Button size="small">¡Lo quiero!</Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Book;
