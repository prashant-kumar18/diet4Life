/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AddConsultation.tsx
'use client';

import React, { useState } from 'react';
import {
    Modal,
    TextInput,
    TextArea,
    NumberInput,
    MultiSelect,
    Grid,
    Column,
} from '@carbon/react';
import { Patient, Consultation } from '@/app/types/types';
import { usePostConsultation } from '@/app/utils/api';

interface AddConsultationProps {
    isModalOpen: boolean;
    setIsModalOpen: (val: boolean) => void;
    setLoadingRowId: React.Dispatch<React.SetStateAction<string | null>>;
    selectedPatient: Patient | null;
}

const chronicOptions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'ibd', label: 'IBS' },
    { id: 'copd', label: 'COPD' },
];

const investigationOptions = [
    { id: 'blood', label: 'Blood Test' },
    { id: 'xray', label: 'X-Ray' },
    { id: 'mri', label: 'MRI' },
    { id: 'pft', label: 'PFT' },
    { id: 'ultrasound', label: 'Ultrasound' },
];

export const AddConsultation: React.FC<AddConsultationProps> = ({ isModalOpen, setIsModalOpen, setLoadingRowId, selectedPatient }) => {
    const [formData, setFormData] = useState<Partial<Consultation>>({});
    const { mutate: postConsultation } = usePostConsultation();
    const handleChange = (key: keyof Consultation, value: string | number) => {
        setFormData({ ...formData, [key]: value });
    };


    const handleSubmit = () => {
        if (!selectedPatient || !formData.date || !formData.doctor) return;

        const newConsultation: Consultation = {
            ...formData,
            severity: Number(formData.severity || 0),
            chronicConditions: formData.chronicConditions || [],
            investigations: formData.investigations || [],
        } as Consultation;

        setLoadingRowId(selectedPatient.id);
        postConsultation({
            patientId: selectedPatient.id,
            consultationData: newConsultation,
        },
            {
                onSuccess: () => {
                    setFormData({});
                },
            }
        );
        setLoadingRowId(null);
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            modalHeading="Add Consultation Details"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            size="lg"
            onRequestClose={() => setIsModalOpen(false)}
            onRequestSubmit={handleSubmit}
        >
            <Grid fullWidth>
                <Column sm={4} md={8} lg={16}>
                    <TextInput
                        id="consultation-date"
                        labelText="Date"
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />

                    <TextInput
                        id="consultation-doctor"
                        labelText="Doctor"
                        value={formData.doctor || ''}
                        onChange={(e) => handleChange('doctor', e.target.value)}
                    />

                    <TextArea
                        id="consultation-symptoms"
                        labelText="Symptoms"
                        value={formData.symptoms || ''}
                        onChange={(e) => handleChange('symptoms', e.target.value)}
                    />

                    <TextInput
                        id="consultation-duration"
                        labelText="Duration"
                        value={formData.duration || ''}
                        onChange={(e) => handleChange('duration', e.target.value)}
                    />

                    <NumberInput
                        id="consultation-severity"
                        label="Severity (1-10)"
                        min={1}
                        max={10}
                        value={formData.severity || 1}
                        onChange={(e: any) => handleChange('severity', e.imaginaryTarget?.value || 1)}
                    />

                    <TextInput
                        id="consultation-triggers"
                        labelText="Triggers"
                        value={formData.triggers || ''}
                        onChange={(e) => handleChange('triggers', e.target.value)}
                    />

                    <TextInput
                        id="consultation-relieving-factors"
                        labelText="Relieving Factors"
                        value={formData.relievingFactors || ''}
                        onChange={(e) => handleChange('relievingFactors', e.target.value)}
                    />

                    <MultiSelect
                        id="consultation-chronic"
                        label="Chronic Conditions"
                        titleText="Chronic Conditions"
                        items={chronicOptions}
                        itemToString={(item) => item?.label || ''}
                        onChange={(e: any) => {
                            const values = e.selectedItems.map((item: any) => item.label);
                            handleChange('chronicConditions', values);
                        }}
                    />

                    <TextInput
                        id="consultation-surgeries"
                        labelText="Surgeries"
                        value={formData.surgeries || ''}
                        onChange={(e) => handleChange('surgeries', e.target.value)}
                    />

                    <TextInput
                        id="consultation-family-history"
                        labelText="Family History"
                        value={formData.familyHistory || ''}
                        onChange={(e) => handleChange('familyHistory', e.target.value)}
                    />

                    <TextInput
                        id="consultation-taking-medication"
                        labelText="Taking Medication"
                        value={formData.takingMedication || ''}
                        onChange={(e) => handleChange('takingMedication', e.target.value)}
                    />

                    <TextInput
                        id="consultation-medications-list"
                        labelText="Medications List"
                        value={formData.medicationsList || ''}
                        onChange={(e) => handleChange('medicationsList', e.target.value)}
                    />

                    <TextInput
                        id="consultation-supplements"
                        labelText="Supplements"
                        value={formData.supplements || ''}
                        onChange={(e) => handleChange('supplements', e.target.value)}
                    />

                    <TextInput
                        id="consultation-allergies"
                        labelText="Allergies"
                        value={formData.allergies || ''}
                        onChange={(e) => handleChange('allergies', e.target.value)}
                    />

                    <TextInput
                        id="consultation-sleep"
                        labelText="Sleep"
                        value={formData.sleep || ''}
                        onChange={(e) => handleChange('sleep', e.target.value)}
                    />

                    <TextInput
                        id="consultation-appetite"
                        labelText="Appetite"
                        value={formData.appetite || ''}
                        onChange={(e) => handleChange('appetite', e.target.value)}
                    />

                    <TextInput
                        id="consultation-water-intake"
                        labelText="Water Intake"
                        value={formData.waterIntake || ''}
                        onChange={(e) => handleChange('waterIntake', e.target.value)}
                    />

                    <TextInput
                        id="consultation-bowel"
                        labelText="Bowel"
                        value={formData.bowel || ''}
                        onChange={(e) => handleChange('bowel', e.target.value)}
                    />

                    <TextInput
                        id="consultation-activity"
                        labelText="Activity"
                        value={formData.activity || ''}
                        onChange={(e) => handleChange('activity', e.target.value)}
                    />

                    <TextInput
                        id="consultation-height"
                        labelText="Height (cm)"
                        value={formData.height || ''}
                        onChange={(e) => handleChange('height', e.target.value)}
                    />

                    <TextInput
                        id="consultation-weight"
                        labelText="Weight (kg)"
                        value={formData.weight || ''}
                        onChange={(e) => handleChange('weight', e.target.value)}
                    />

                    <TextInput
                        id="consultation-bp"
                        labelText="Blood Pressure (e.g., 120/80)"
                        value={formData.bp || ''}
                        onChange={(e) => handleChange('bp', e.target.value)}
                    />

                    <TextInput
                        id="consultation-pulse"
                        labelText="Pulse"
                        value={formData.pulse || ''}
                        onChange={(e) => handleChange('pulse', e.target.value)}
                    />

                    <TextInput
                        id="consultation-temperature"
                        labelText="Temperature"
                        value={formData.temperature || ''}
                        onChange={(e) => handleChange('temperature', e.target.value)}
                    />

                    <TextInput
                        id="consultation-spo2"
                        labelText="SPO2"
                        value={formData.spo2 || ''}
                        onChange={(e) => handleChange('spo2', e.target.value)}
                    />

                    <TextInput
                        id="consultation-diagnosis"
                        labelText="Diagnosis"
                        value={formData.diagnosis || ''}
                        onChange={(e) => handleChange('diagnosis', e.target.value)}
                    />

                    <MultiSelect
                        id="consultation-investigations"
                        label="Investigations"
                        titleText="Investigations"
                        items={investigationOptions}
                        itemToString={(item) => item?.label || ''}
                        onChange={(e: any) => {
                            const values = e.selectedItems.map((item: any) => item.label);
                            handleChange('investigations', values);
                        }}
                    />

                    <TextInput
                        id="consultation-other-tests"
                        labelText="Other Tests"
                        value={formData.otherTests || ''}
                        onChange={(e) => handleChange('otherTests', e.target.value)}
                    /><MultiSelect
                        id="investigations"
                        label="Investigations"
                        titleText="Investigations"
                        items={investigationOptions}
                        itemToString={(item) => item?.label || ''}
                        onChange={(e: any) => {
                            const values = e.selectedItems.map((item: any) => item.label);
                            handleChange('investigations', values);
                        }}
                    />
                    <TextInput labelText="Other Tests" value={formData.otherTests || ''} onChange={(e) => handleChange('otherTests', e.target.value)} id={''} />
                </Column>
            </Grid>
        </Modal>
    );
};