import { Patient } from '@/app/types/types';
import jsPDF from 'jspdf';

export function handleDownload(
  selectedPatients: Patient[] | null,
  format: 'csv' | 'pdf' = 'csv'
) {
  if (!selectedPatients?.length) return;

  if (format === 'csv') {
    const headers = [
      'Patient ID', 'Name', 'Age', 'Gender', 'Address',
      'Consultation Date', 'Doctor', 'Symptoms', 'Duration', 'Severity',
      'Triggers', 'Relieving Factors', 'Chronic Conditions', 'Surgeries',
      'Family History', 'Taking Medication', 'Medications List', 'Supplements',
      'Allergies', 'Sleep', 'Appetite', 'Water Intake', 'Bowel', 'Activity',
      'Height', 'Weight', 'Blood Pressure', 'Pulse', 'Temperature', 'SpO2',
      'Diagnosis', 'Investigations', 'Other Tests',
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

    const csv = [headers, ...rows]
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

  if (format === 'pdf') {
    const doc = new jsPDF({ orientation: 'portrait' });
    const lineHeight = 8;
    let y = 10;

    selectedPatients.forEach((patient, pIdx) => {
      if (pIdx > 0) {
        doc.addPage();
        y = 10;
      }

      doc.setFontSize(14);
      doc.text(`Patient Report: ${patient.name}`, 10, y);
      y += lineHeight;

      doc.setFontSize(10);
      doc.text(`ID: ${patient.id}`, 10, y); y += lineHeight;
      doc.text(`Age: ${patient.age}    Gender: ${patient.gender}`, 10, y); y += lineHeight;
      doc.text(`Address: ${patient.address}`, 10, y); y += lineHeight * 2;

      patient.consultations.forEach((c, cIdx) => {
        doc.setFont(undefined, 'bold');
        doc.text(`Consultation #${cIdx + 1}`, 10, y); y += lineHeight;
        doc.setFont(undefined, 'normal');

        const addText = (label: string, val: string) => {
          doc.text(`${label}: ${val || '-'}`, 10, y);
          y += lineHeight;
          if (y > 280) {
            doc.addPage();
            y = 10;
          }
        };

        addText('Date', c.date);
        addText('Doctor', c.doctor);
        addText('Symptoms', c.symptoms);
        addText('Duration', c.duration);
        addText('Severity', c.severity.toString());
        addText('Triggers', c.triggers);
        addText('Relieving Factors', c.relievingFactors);
        addText('Diagnosis', c.diagnosis);
        addText('Chronic Conditions', c.chronicConditions.join(', '));
        addText('Surgeries', c.surgeries);
        addText('Family History', c.familyHistory);
        addText('Taking Medication', c.takingMedication);
        addText('Medications List', c.medicationsList);
        addText('Supplements', c.supplements);
        addText('Allergies', c.allergies);
        addText('Sleep', c.sleep);
        addText('Appetite', c.appetite);
        addText('Water Intake', c.waterIntake);
        addText('Bowel', c.bowel);
        addText('Physical Activity', c.activity);
        addText('Height', `${c.height} cm`);
        addText('Weight', `${c.weight} kg`);
        addText('Blood Pressure', c.bp);
        addText('Pulse', c.pulse);
        addText('Temperature', c.temperature);
        addText('SpO2', c.spo2);
        addText('Investigations', c.investigations.join(', '));
        addText('Other Tests', c.otherTests);

        y += lineHeight; // Add space before next consultation
      });
    });

    doc.save(`patient_report_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}