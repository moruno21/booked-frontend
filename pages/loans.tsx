import LoanList from '../components/LoanList';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import LogIn from './login';

const Loans = ({ session }: { session: Session }) => {
  if (!session) return <LogIn />;
  return <LoanList></LoanList>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
};

export default Loans;
