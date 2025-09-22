// app/api/companies/top-paid/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '5', 10), 50);

    const client = await clientPromise;
    const db = client.db("test");          
    const coll = db.collection("companies");  

    const companies = await coll
      .find({})
      .sort({ 'salaryBand.base': -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({ items: companies }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/top-paid error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
