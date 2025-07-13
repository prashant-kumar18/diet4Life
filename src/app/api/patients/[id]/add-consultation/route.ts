// src/app/api/patients/[id]/add-consultation/route.ts
import dbConnect from '@/lib/mongoose';
import Patient from '@/models/Patient';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  context: { params: { id: Promise<{ id: string }> } }
) {
  try {
    await dbConnect();

    const consultation = await req.json();

    const { id } =await context.params;

    console.log('add-consult server log--> ', consultation);
    console.log('add-consult server log patientId--> ', id);

    const updatedPatient = await Patient.findOneAndUpdate(
      { id: id },
      {
        $push: { consultations: consultation },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedPatient), { status: 200 });
  } catch (err) {
    console.error('[Error in add-consultation route]', err);
    return new Response('Error adding consultation', { status: 500 });
  }
}