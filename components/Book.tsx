import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IBook from '../types/book';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ILoan from '../types/loan';
import { TextField } from '@mui/material';
import { fontWeight } from '@mui/system';

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
        <CardMedia component="img" image={`/books/${book.image}`} alt={book.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
        {currentBookLoan ? (
          <CardActions sx={{ justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 'light' }}>Libro prestado</Typography>
          </CardActions>
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>¡Lo quiero!</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                id="outlined-basic"
                label="Código de reserva"
                variant="outlined"
                color="warning"
              />
            </AccordionDetails>
          </Accordion>
        )}
      </Card>
    </Grid>
  );
};

export default Book;
