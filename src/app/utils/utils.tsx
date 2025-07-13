import { Patient } from '@/app/types/types';

export function handleDownload(selectedPatients: Patient[] | null) {
  if (!selectedPatients?.length) return;

  const csvHeaders = [
    'Patient ID',
    'Name',
    'Age',
    'Gender',
    'Address',
    'Consultation Date',
    'Doctor',
    'Symptoms',
    'Duration',
    'Severity',
    'Triggers',
    'Relieving Factors',
    'Chronic Conditions',
    'Surgeries',
    'Family History',
    'Taking Medication',
    'Medications List',
    'Supplements',
    'Allergies',
    'Sleep',
    'Appetite',
    'Water Intake',
    'Bowel',
    'Activity',
    'Height',
    'Weight',
    'Blood Pressure',
    'Pulse',
    'Temperature',
    'SpO2',
    'Diagnosis',
    'Investigations',
    'Other Tests',
  ];

  const rows: string[][] = [];

  selectedPatients.forEach((patient) => {
    patient.consultations.forEach((c) => {
      rows.push([
        patient.id,
        patient.name,
        patient.age.toString(),
        patient.gender,
        patient.address,
        c.date,
        c.doctor,
        c.symptoms,
        c.duration,
        c.severity.toString(),
        c.triggers,
        c.relievingFactors,
        c.chronicConditions.join('; '),
        c.surgeries,
        c.familyHistory,
        c.takingMedication,
        c.medicationsList,
        c.supplements,
        c.allergies,
        c.sleep,
        c.appetite,
        c.waterIntake,
        c.bowel,
        c.activity,
        c.height,
        c.weight,
        c.bp,
        c.pulse,
        c.temperature,
        c.spo2,
        c.diagnosis,
        c.investigations.join('; '),
        c.otherTests,
      ]);
    });
  });

  const csv = [csvHeaders, ...rows]
    .map((row) => row.map((val) => `"${val}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `patients_consultations_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}