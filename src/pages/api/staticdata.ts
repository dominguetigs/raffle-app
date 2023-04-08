import fs from 'fs/promises';

import { NextApiRequest, NextApiResponse } from 'next';

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
    console.log(databasePath);

    try {
      const data = await select();
      const updatedData = { ...data, ...req.body };

      await fs.writeFile(databasePath, JSON.stringify(updatedData));

      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
