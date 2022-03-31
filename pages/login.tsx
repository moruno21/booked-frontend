import { signIn, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Button, Box } from '@mui/material';

const LogIn = () => {
  return (
    <Box textAlign="center" alignItems="center" sx={{ height: '100vh' }}>
      <Button
        onClick={() => signIn('github')}
        variant="contained"
        sx={{ bgcolor: 'warning.main', top: '50%' }}
        disableElevation
      >
        Sign in with Github
      </Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default LogIn;
