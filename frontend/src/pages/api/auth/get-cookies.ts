import type { NextApiRequest, NextApiResponse } from 'next';

import { cookieName } from '@/constants/api/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;

  if (!cookies || !cookies[cookieName])
    return res.status(401).json('Unauthenticated.');

  if (req.method === 'OPTIONS') {
    return res.status(200).json(cookies[cookieName]);
  }

  return res.status(405).json('Method not allowed.');
}
