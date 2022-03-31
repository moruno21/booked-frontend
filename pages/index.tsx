import type { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BookList from '../components/BookList';
import LogIn from './login';

const Home = ({ session }: { session: Session }) => {
  if (!session) return <LogIn />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Booked</title>
      </Head>
      <BookList></BookList>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  // Instead of redirecting, we check within the component whether there's a session or not (so we return the login component)
  // if (!session)
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };

  return {
    props: {
      session: session,
    },
  };
};

export default Home;
