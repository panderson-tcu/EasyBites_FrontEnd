// clerkUtils.js


import { Session } from '@clerk/clerk-react';

export const getSessionId = async () => {
  if (!Session) {
    throw new Error('Clerk Session is not available');
  }

  const session = await Session.getSession();
  const sessionId = session.id;
  return sessionId;
};
