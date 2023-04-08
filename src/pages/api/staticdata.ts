import fs from 'fs/promises';

import { NextApiRequest, NextApiResponse } from 'next';

import path from 'path';

const databasePath = new URL('../../../db.json', import.meta.url);

export type Data = { [key: string]: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  async function select(): Promise<Data> {
    const data = await fs.readFile(databasePath, 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  if (req.method === 'GET') {
    const data = select();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    try {
      const data = select();
      const updatedData = Object.assign(data, req.body);

      await fs.writeFile(databasePath, JSON.stringify(updatedData));

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
