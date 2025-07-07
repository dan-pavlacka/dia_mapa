// app/api/poznatky/route.js

/*Původní verze bez přepisování jsonu, připravená na napojení db*/

/*
import poznatkyData from '@/data/poznatky.json';

export async function GET() {
  return Response.json(poznatkyData);
}

export async function POST(req) {
  const body = await req.json();

  console.log('Přijat nový poznatek:', body);

  // Teď jen "na oko" — neuloží se to nikam
  return Response.json({ success: true, newItem: body });
}

*/

/*Verze s editováním jsonu*/

// app/api/poznatky/route.js
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/poznatky.json');

export async function GET() {
  const file = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(file);
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const file = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(file);

  // Přidat nový záznam
  data.push(body);

  // Zapsat zpět do souboru
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log('✅ Uložen nový poznatek:', body);

  return Response.json({ success: true, newItem: body });
}

