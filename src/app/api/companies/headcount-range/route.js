// app/api/companies/headcount-range/route.js
import clientPromise from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const minParam = url.searchParams.get('min');
    const maxParam = url.searchParams.get('max');
    
    const min = minParam ? parseInt(minParam, 10) : 0;
    const max = maxParam ? parseInt(maxParam, 10) : null;

    // Validate input
    if (isNaN(min) || (maxParam && isNaN(max))) {
      return NextResponse.json({ error: 'Invalid min or max parameter' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");          
    const coll = db.collection("companies");  

    const filter = { headcount: { $gte: min } };
    if (max !== null) {
      filter.headcount.$lte = max;
    }

    const companies = await coll.find(filter).toArray();
    return NextResponse.json({ items: companies }, { status: 200 });
  } catch (err) {
    console.error('GET /api/companies/headcount-range error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
