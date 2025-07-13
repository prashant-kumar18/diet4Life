import dbConnect from '@/lib/mongoose';
import Patient from '@/models/Patient';

// GET: List patients
export async function GET() {
  await dbConnect();
  const patients = await Patient.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(patients));
}

// POST: Add new patient
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const patient = await Patient.create(data);
  return new Response(JSON.stringify(patient), { status: 201 });
}

// DELETE: Mass delete patients by IDs
export async function DELETE(req: Request) {
  await dbConnect();
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return new Response(JSON.stringify({ error: 'No patient IDs provided' }), {
      status: 400,
    });
  }

  const result = await Patient.deleteMany({ id: { $in: ids } });

  return new Response(
    JSON.stringify({ message: `${result.deletedCount} patient(s) deleted` }),
    { status: 200 }
  );
}