import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ConsultationSchema = new mongoose.Schema({
  date: String,
  doctor: String,
  symptoms: String,
  duration: String,
  severity: Number,
  triggers: String,
  relievingFactors: String,
  chronicConditions: [String],
  surgeries: String,
  familyHistory: String,
  takingMedication: String,
  medicationsList: String,
  supplements: String,
  allergies: String,
  sleep: String,
  appetite: String,
  waterIntake: String,
  bowel: String,
  activity: String,
  height: String,
  weight: String,
  bp: String,
  pulse: String,
  temperature: String,
  spo2: String,
  diagnosis: String,
  investigations: [String],
  otherTests: String,
}, { _id: false });

const PatientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  address: String,
  consultations: [ConsultationSchema],
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);