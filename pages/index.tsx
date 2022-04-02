import type { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import BookList from '../components/BookList';
import LogIn from './login';

const Home = ({ session }: { session: Session }) => {
  if (!session) return <LogIn />;
  return <BookList></BookList>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
};

export default Home;
