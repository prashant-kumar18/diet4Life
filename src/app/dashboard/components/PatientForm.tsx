'use client';

import {
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  TextArea,
  Checkbox,
  FileUploaderDropContainer,
  Button,
  Form,
  FormGroup,
  Grid,
  Column,
  Stack,
  Loading,
  Modal,
} from '@carbon/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { PatientFormData } from '../../types/types';
import { usePostPatient } from '@/app/utils/api';

const chronicConditions = [
  'Diabetes',
  'Hypertension',
  'Thyroid Disorder',
  'Asthma',
  'Heart Disease',
  'Kidney Disease',
  'Liver Disorder',
  'PCOS / Hormonal Issues',
  'Other',
];

const investigations = [
  'Hemogram',
  'ESR',
  'Thyroid Profile',
  'Liver Function Test',
  'Kidney Function Test',
  'USG/CT/MRI',
  'ECG/Echo',
  'Urine Test',
  'Other',
];

export default function AddPatient({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const initialFormData={
    name: '',
    age: 1,
    gender: '',
    address: '',
    firstConsultation: '',
    doctorName: '',
    symptoms: '',
    symptomDuration: '',
    severity: 1,
    triggers: '',
    relievingFactors: '',
    chronicConditions: [],
    pastSurgeries: '',
    familyHistory: '',
    onMedication: '',
    medicationList: '',
    supplements: '',
    allergies: '',
    sleepPattern: '',
    appetite: '',
    waterIntake: '',
    bowelMovements: '',
    physicalActivity: [],
    height: 1,
    weight: 1,
    bp: '',
    pulse: '',
    temperature: '',
    spo2: '',
    diagnosis: '',
    investigations: [],
    otherTests: '',
    reports: [],
  }
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);

  const { mutate: addPatient, isPending } = usePostPatient();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'checkbox' && target instanceof HTMLInputElement) {
      const isChecked = target.checked;

      setFormData((prev) => {
        const current = new Set(prev[name as keyof PatientFormData] as string[]);
        if (isChecked) {
          current.add(value);
        } else {
          current.delete(value);
        }
        return { ...prev, [name]: Array.from(current) };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNumberChange = (name: keyof PatientFormData, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (files: FileList) => {
    setFormData((prev) => ({
      ...prev,
      reports: Array.from(files),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof PatientFormData)[] = [
      'name',
      'age',
      'gender',
      'address',
      'firstConsultation',
      'doctorName',
      'symptoms',
      'symptomDuration',
      'triggers',
      'relievingFactors',
      'pastSurgeries',
      'familyHistory',
      'onMedication',
      'medicationList',
      'supplements',
      'allergies',
      'sleepPattern',
      'appetite',
      'waterIntake',
      'bowelMovements',
      'height',
      'weight',
      'bp',
      'pulse',
      'temperature',
      'spo2',
      'diagnosis',
      'otherTests',
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (
        value === '' ||
        value === null ||
        (typeof value === 'number' && value === 0)
      ) {
        alert(`Please fill in the required field: ${field}`);
        return;
      }
    }

    if (formData.physicalActivity.length === 0) {
      alert('Please select at least one physical activity level.');
      return;
    }

    const payload = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      address: formData.address,
      consultations: [
        {
          date: formData.firstConsultation,
          doctor: formData.doctorName,
          symptoms: formData.symptoms,
          duration: formData.symptomDuration,
          severity: formData.severity,
          triggers: formData.triggers,
          relievingFactors: formData.relievingFactors,
          chronicConditions: formData.chronicConditions,
          surgeries: formData.pastSurgeries,
          familyHistory: formData.familyHistory,
          takingMedication: formData.onMedication,
          medicationsList: formData.medicationList,
          supplements: formData.supplements,
          allergies: formData.allergies,
          sleep: formData.sleepPattern,
          appetite: formData.appetite,
          waterIntake: formData.waterIntake,
          bowel: formData.bowelMovements,
          activity: formData.physicalActivity.join(', '),
          height: formData.height.toString(),
          weight: formData.weight.toString(),
          bp: formData.bp,
          pulse: formData.pulse,
          temperature: formData.temperature,
          spo2: formData.spo2,
          diagnosis: formData.diagnosis,
          investigations: formData.investigations,
          otherTests: formData.otherTests,
        },
      ],
    };

    addPatient(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        setFormData(initialFormData)
      },
      onError: (err) => {
        console.error('Error adding patient:', err);
        alert('Failed to add patient. Please try again.');
      },
    });
  };

  return (
    <>
      {isPending && <Loading withOverlay />}
      <Modal
        open={isModalOpen}
        modalHeading="Add Consultation Details"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        size="lg"
        onRequestClose={() => setIsModalOpen(false)}
        onRequestSubmit={handleSubmit}
      >
        <Form>
          <Grid>
            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Basic Info</h6>
                  <TextInput id="name" name="name" labelText="Patient Full Name" value={formData.name} onChange={handleChange} required />
                  <NumberInput id="age" label="Patient Age" min={1} value={formData.age} onChange={(_, { value }) => handleNumberChange('age', Number(value))} required />
                  <Select id="gender" name="gender" labelText="Gender" value={formData.gender} onChange={handleChange} required>
                    <SelectItem value="" text="Choose" />
                    <SelectItem value="male" text="Male" />
                    <SelectItem value="female" text="Female" />
                    <SelectItem value="other" text="Other" />
                  </Select>
                  <TextArea id="address" name="address" labelText="Patient Address" value={formData.address} onChange={handleChange} required />
                  <TextInput id="firstConsultation" name="firstConsultation" type="date" labelText="Date of First Consultation" value={formData.firstConsultation} onChange={handleChange} required />
                  <TextInput id="doctorName" name="doctorName" labelText="Consulting Doctor Name" value={formData.doctorName} onChange={handleChange} required />
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Symptoms</h6>
                  <TextArea id="symptoms" name="symptoms" labelText="Chief Complaints / Symptoms" value={formData.symptoms} onChange={handleChange} required />
                  <TextInput id="symptomDuration" name="symptomDuration" labelText="Duration of Symptoms" value={formData.symptomDuration} onChange={handleChange} required />
                  <NumberInput id="severity" label="Severity (1–10)" min={1} max={10} value={formData.severity} onChange={(_, { value }) => handleNumberChange('severity', Number(value))} required />
                  <TextInput id="triggers" name="triggers" labelText="Any Triggers?" value={formData.triggers} onChange={handleChange} required />
                  <TextInput id="relievingFactors" name="relievingFactors" labelText="Relieving Factors" value={formData.relievingFactors} onChange={handleChange} required />
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Chronic Conditions</h6>
                  {chronicConditions.map((condition) => (
                    <Checkbox
                      key={condition}
                      id={`cc-${condition}`}
                      name="chronicConditions"
                      labelText={condition}
                      value={condition}
                      checked={formData.chronicConditions.includes(condition)}
                      onChange={handleChange}
                    />
                  ))}
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <FormGroup legendText="">
                <h6>Medical History</h6>
                <TextArea id="pastSurgeries" name="pastSurgeries" labelText="Past Surgeries / Hospitalizations" value={formData.pastSurgeries} onChange={handleChange} required />
                <TextArea id="familyHistory" name="familyHistory" labelText="Family Medical History" value={formData.familyHistory} onChange={handleChange} required />
                <Select id="onMedication" name="onMedication" labelText="Is patient currently taking any medication?" value={formData.onMedication} onChange={handleChange} required>
                  <SelectItem value="" text="Choose" />
                  <SelectItem value="yes" text="Yes" />
                  <SelectItem value="no" text="No" />
                  <SelectItem value="maybe" text="Maybe" />
                </Select>
                <TextArea id="medicationList" name="medicationList" labelText="List medications" value={formData.medicationList} onChange={handleChange} required />
                <TextArea id="supplements" name="supplements" labelText="Supplements" value={formData.supplements} onChange={handleChange} required />
                <TextArea id="allergies" name="allergies" labelText="Known Allergies" value={formData.allergies} onChange={handleChange} required />
              </FormGroup>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Lifestyle</h6>
                  <TextInput id="sleepPattern" name="sleepPattern" labelText="Sleep Pattern" value={formData.sleepPattern} onChange={handleChange} required />
                  <TextInput id="appetite" name="appetite" labelText="Appetite" value={formData.appetite} onChange={handleChange} required />
                  <TextInput id="waterIntake" name="waterIntake" labelText="Water Intake" value={formData.waterIntake} onChange={handleChange} required />
                  <Select id="bowelMovements" name="bowelMovements" labelText="Bowel Movements" value={formData.bowelMovements} onChange={handleChange} required>
                    <SelectItem value="" text="Choose" />
                    <SelectItem value="normal" text="Normal" />
                    <SelectItem value="constipated" text="Constipated" />
                    <SelectItem value="loose" text="Loose" />
                  </Select>
                  {['sedentary', 'moderate', 'active'].map((activity) => (
                    <Checkbox
                      key={activity}
                      id={`pa-${activity}`}
                      name="physicalActivity"
                      labelText={activity[0].toUpperCase() + activity.slice(1)}
                      value={activity}
                      checked={formData.physicalActivity.includes(activity)}
                      onChange={handleChange}
                    />
                  ))}
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Vitals</h6>
                  <NumberInput id="height" label="Height (cm)" min={1} value={formData.height} onChange={(_, { value }) => handleNumberChange('height', Number(value))} required />
                  <NumberInput id="weight" label="Weight (kg)" min={1} value={formData.weight} onChange={(_, { value }) => handleNumberChange('weight', Number(value))} required />
                  <TextInput id="bp" name="bp" labelText="Blood Pressure" value={formData.bp} onChange={handleChange} required />
                  <TextInput id="pulse" name="pulse" labelText="Pulse Rate" value={formData.pulse} onChange={handleChange} required />
                  <TextInput id="temperature" name="temperature" labelText="Temperature" value={formData.temperature} onChange={handleChange} required />
                  <TextInput id="spo2" name="spo2" labelText="Oxygen Saturation (SpO2)" value={formData.spo2} onChange={handleChange} required />
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Diagnosis & Investigations</h6>
                  <TextArea id="diagnosis" name="diagnosis" labelText="Provisional Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
                  {investigations.map((test) => (
                    <Checkbox
                      key={test}
                      id={`inv-${test}`}
                      name="investigations"
                      labelText={test}
                      value={test}
                      checked={formData.investigations.includes(test)}
                      onChange={handleChange}
                    />
                  ))}
                  <TextInput id="otherTests" name="otherTests" labelText="Other Tests" value={formData.otherTests} onChange={handleChange} required />
                </FormGroup>
              </Stack>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Stack gap={6}>
                <FormGroup legendText="">
                  <h6>Upload Reports</h6>
                  <FileUploaderDropContainer
                    labelText="Upload up to 10 files"
                    multiple
                    accept={['.pdf', '.docx', '.jpg', '.png', '.xls', '.ppt', '.mp3', '.mp4']}
                    onAddFiles={(event) => {
                      const input = event.target as HTMLInputElement;
                      if (input.files) {
                        handleFileChange(input.files);
                      }
                    }}
                  />
                </FormGroup>
                {/* <Button type="submit">Submit</Button> */}
              </Stack>
            </Column>
          </Grid>
        </Form>
      </Modal>
    </>
  );
}