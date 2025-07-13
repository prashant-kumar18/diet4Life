import dbConnect from '@/lib/mongoose';
import Patient from '@/models/Patient';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } =await context.params;
    const patient = await Patient.findOneAndUpdate({id:id});

    if (!patient) {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(patient), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[GET Patient Error]', err);
    return new Response('Error fetching patient', { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } =await context.params;
    const data = await req.json();

    const updated = await Patient.findOneAndUpdate({id:id}, data, { new: true });

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[PUT Patient Error]', err);
    return new Response('Error updating patient', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } =await context.params;
        console.log("server log",id);
    const deleted = await Patient.findOneAndDelete({id:id});

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('[DELETE Patient Error]', err);
    return new Response('Error deleting patient', { status: 500 });
  }
}