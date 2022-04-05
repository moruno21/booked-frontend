import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      // Persist the accessToken to the token right after signin
      if (account) {
        // We need to generate the token, because account.access_token is the github token (useless for our case)
        const secret = process.env.JWT_SECRET || 'changeme';
        const encodedToken = jwt.sign(token, secret, {
          expiresIn: '30d',
          algorithm: 'HS512',
        });
        token.accessToken = encodedToken;
      }
      return token;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async (data: any) => {
      const { secret, token, maxAge } = data;

      const encodedToken = jwt.sign(token, secret, {
        algorithm: 'HS512',
      });
      return encodedToken;
    },
    async decode(data: any) {
      const { secret, token } = data;
      const verify = jwt.verify(token, secret) as JWT;

      return verify;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      checks: ['none'],
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
