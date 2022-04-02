import { useSession } from 'next-auth/react';
import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Home.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  return (
    <>
      <Head>
        <title>Booked</title>
      </Head>
      {session ? <Navbar /> : <></>}
      <div className={styles.container}>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
