'use client';

import { TextInput, NumberInput, Select, SelectItem, TextArea, Checkbox, FileUploaderDropContainer, Button, Form, FormGroup, Grid, Column, Stack, } from '@carbon/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { PatientFormData } from '../types/types';

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



export default function PatientForm() {
    const [formData, setFormData] = useState<PatientFormData>({
        name: '',
        age: 0,
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
        height: 0,
        weight: 0,
        bp: '',
        pulse: '',
        temperature: '',
        spo2: '',
        diagnosis: '',
        investigations: [],
        otherTests: '',
        reports: [],
    });

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
    const handleFileChange = (files: FileList) => {
        setFormData((prev) => ({
            ...prev,
            reports: Array.from(files),
        }));
    };

    const handleNumberChange = (name: keyof PatientFormData, value: number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        // POST to /api/patients or similar
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid>

                <Column lg={8} md={4} sm={4}>
                    {/* Basic Info */}
                    <Stack gap={6}>
                        <FormGroup legendText="Basic Info" >
                            <TextInput id="name" name="name" labelText="Patient Full Name" value={formData.name} onChange={handleChange} />
                            <NumberInput
                                id="age"
                                label="Patient Age"
                                min={0}
                                value={formData.age}
                                onChange={(_, { value }) => handleNumberChange('age', Number(value))}
                            />
                            <Select id="gender" name="gender" labelText="Gender" value={formData.gender} onChange={handleChange}>
                                <SelectItem value="" text="Choose" />
                                <SelectItem value="male" text="Male" />
                                <SelectItem value="female" text="Female" />
                                <SelectItem value="other" text="Other" />
                            </Select>
                            <TextArea id="address" name="address" labelText="Patient Address" value={formData.address} onChange={handleChange} />
                            <TextInput id="firstConsultation" name="firstConsultation" type="date" labelText="Date of First Consultation" value={formData.firstConsultation} onChange={handleChange} />
                            <TextInput id="doctorName" name="doctorName" labelText="Consulting Doctor Name" value={formData.doctorName} onChange={handleChange} />
                        </FormGroup>
                    </Stack>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}>
                        {/* Symptoms */}
                        <FormGroup legendText="Symptoms">
                            <TextArea id="symptoms" name="symptoms" labelText="Chief Complaints / Symptoms" value={formData.symptoms} onChange={handleChange} />
                            <TextInput id="symptomDuration" name="symptomDuration" labelText="Duration of Symptoms" value={formData.symptomDuration} onChange={handleChange} />
                            <NumberInput
                                id="severity"
                                label="Severity (1–10)"
                                min={1}
                                max={10}
                                value={formData.severity}
                                onChange={(_, { value }) => handleNumberChange('severity', Number(value))}
                            />
                            <TextInput id="triggers" name="triggers" labelText="Any Triggers?" value={formData.triggers} onChange={handleChange} />
                            <TextInput id="relievingFactors" name="relievingFactors" labelText="Relieving Factors" value={formData.relievingFactors} onChange={handleChange} />
                        </FormGroup>
                    </Stack>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}>
                        {/* Chronic Conditions */}
                        <FormGroup legendText="Chronic Conditions">
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
                        </FormGroup></Stack>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}></Stack>
                    {/* Medical History */}
                    <FormGroup legendText="Medical History">
                        <TextArea id="pastSurgeries" name="pastSurgeries" labelText="Past Surgeries / Hospitalizations" value={formData.pastSurgeries} onChange={handleChange} />
                        <TextArea id="familyHistory" name="familyHistory" labelText="Family Medical History" value={formData.familyHistory} onChange={handleChange} />
                        <Select id="onMedication" name="onMedication" labelText="Is patient currently taking any medication?" value={formData.onMedication} onChange={handleChange}>
                            <SelectItem value="" text="Choose" />
                            <SelectItem value="yes" text="Yes" />
                            <SelectItem value="no" text="No" />
                            <SelectItem value="maybe" text="Maybe" />
                        </Select>
                        <TextArea id="medicationList" name="medicationList" labelText="List medications" value={formData.medicationList} onChange={handleChange} />
                        <TextArea id="supplements" name="supplements" labelText="Supplements" value={formData.supplements} onChange={handleChange} />
                        <TextArea id="allergies" name="allergies" labelText="Known Allergies" value={formData.allergies} onChange={handleChange} />
                    </FormGroup>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}>
                        {/* Lifestyle */}
                        <FormGroup legendText="Lifestyle">
                            <TextInput id="sleepPattern" name="sleepPattern" labelText="Sleep Pattern" value={formData.sleepPattern} onChange={handleChange} />
                            <TextInput id="appetite" name="appetite" labelText="Appetite" value={formData.appetite} onChange={handleChange} />
                            <TextInput id="waterIntake" name="waterIntake" labelText="Water Intake" value={formData.waterIntake} onChange={handleChange} />
                            <Select id="bowelMovements" name="bowelMovements" labelText="Bowel Movements" value={formData.bowelMovements} onChange={handleChange}>
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
                        </FormGroup></Stack>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}>
                        {/* Vitals */}
                        <FormGroup legendText="Vitals">
                            <NumberInput id="height" label="Height (cm)" min={0} value={formData.height} onChange={(_, { value }) => handleNumberChange('height', Number(value))} />
                            <NumberInput id="weight" label="Weight (kg)" min={0} value={formData.weight} onChange={(_, { value }) => handleNumberChange('weight', Number(value))} />
                            <TextInput id="bp" name="bp" labelText="Blood Pressure" value={formData.bp} onChange={handleChange} />
                            <TextInput id="pulse" name="pulse" labelText="Pulse Rate" value={formData.pulse} onChange={handleChange} />
                            <TextInput id="temperature" name="temperature" labelText="Temperature" value={formData.temperature} onChange={handleChange} />
                            <TextInput id="spo2" name="spo2" labelText="Oxygen Saturation (SpO2)" value={formData.spo2} onChange={handleChange} />
                        </FormGroup></Stack>
                </Column>
                <Column lg={8} md={4} sm={4}>
                    <Stack gap={6}>
                        {/* Investigations */}
                        <FormGroup legendText="Diagnosis & Investigations">
                            <TextArea id="diagnosis" name="diagnosis" labelText="Provisional Diagnosis" value={formData.diagnosis} onChange={handleChange} />
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
                            <TextInput id="otherTests" name="otherTests" labelText="Other Tests" value={formData.otherTests} onChange={handleChange} />
                        </FormGroup>
                    </Stack>
                </Column>
                <Column lg={8} md={4} sm={4} >
                    <Stack gap={6}>
                        {/* File Upload */}
                        <FormGroup legendText="Upload Reports" >
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
                        <Button type="submit">Submit</Button>
                    </Stack>
                </Column>
            </Grid>

        </Form>
    );
}