
import express from 'express';
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  async function create() {
    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: '3df0a5a9867e403899bbff999c0ac523',
      },
      properties: {
        Nome: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          rich_text: [
            {
              text: {
                content: email,
              },
            },
          ],
        },
        Mensagem: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });

    console.log(response);
  }

  await create();

  res.status(200).json({ message: 'Success' });
});

export default router;
