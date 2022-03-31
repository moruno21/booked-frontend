import { useSession } from 'next-auth/react';
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading</p>;

  return (
    <>
      {session ? <Navbar /> : <></>}
      <main>{children}</main>
    </>
  );
};

export default Layout;
