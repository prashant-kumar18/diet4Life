/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Accordion,
    AccordionItem,
    Modal,
    Stack,
    TextInput,
    TextArea,
} from "@carbon/react";
import { Patient } from "@/app/types/types";
import { useState, useEffect } from "react";
import { useEditPatient } from "@/app/utils/api";

export function PatientDetailsEdit({
    isModalOpen,
    setIsModalOpen,
    setLoadingRowId,
    selectedPatient,
}: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingRowId: any;
    selectedPatient: Patient | null;
}) {
    const [editablePatient, setEditablePatient] = useState<Patient | null>(null);

    const { mutate: editPatient } = useEditPatient();

    useEffect(() => {
        if (selectedPatient) {
            setEditablePatient({ ...selectedPatient });
        }
    }, [selectedPatient]);

    const handleChange = (field: keyof Patient, value: string | number) => {
        if (!editablePatient) return;
        setEditablePatient({ ...editablePatient, [field]: value });
    };

    const handleConsultationChange = (index: number, field: string, value: any) => {
        if (!editablePatient) return;
        const updated = [...editablePatient.consultations];
        (updated[index] as any)[field] = value;
        setEditablePatient({ ...editablePatient, consultations: updated });
    };

    const handleSave = () => {
        if (!editablePatient) return;
        setLoadingRowId(editablePatient.id);
        editPatient({
            patientId: editablePatient.id,
            patientData: editablePatient,
        });
        console.log("Saved patient:", editablePatient);
        setLoadingRowId(null)
        setIsModalOpen(false);

    };

    return (
        <Modal
            open={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            modalHeading="Patient Details"
            primaryButtonText="Save"
            secondaryButtonText="Close"
            onRequestSubmit={handleSave} // ✅ Fixed
            size="lg"
        >
            {editablePatient && (
                <Stack gap={5}>
                    <>
                        <TextInput
                            id="name"
                            labelText="Name"
                            value={editablePatient.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <TextInput
                            id="age"
                            labelText="Age"
                            type="number"
                            value={editablePatient.age}
                            onChange={(e) => handleChange("age", parseInt(e.target.value))}
                        />
                        <TextInput
                            id="gender"
                            labelText="Gender"
                            value={editablePatient.gender}
                            onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        <TextArea
                            id="address"
                            labelText="Address"
                            value={editablePatient.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </>

                    <Accordion>
                        {editablePatient.consultations.map((c, idx) => (
                            <AccordionItem
                                key={idx}
                                title={`Consultation on ${c.date} with ${c.doctor}`}
                            >
                                <Accordion>
                                    <AccordionItem title="Symptoms & Diagnosis">
                                        <>
                                            <TextArea
                                                labelText="Symptoms"
                                                value={c.symptoms}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "symptoms", e.target.value)
                                                }
                                                id={`symptoms-${idx}`}
                                            />
                                            <TextInput
                                                labelText="Duration"
                                                value={c.duration}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "duration", e.target.value)
                                                }
                                                id={`duration-${idx}`}
                                            />
                                            <TextInput
                                                labelText="Severity"
                                                value={c.severity}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "severity", e.target.value)
                                                }
                                                id={`severity-${idx}`}
                                            />
                                            <TextInput
                                                labelText="Triggers"
                                                value={c.triggers}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "triggers", e.target.value)
                                                }
                                                id={`triggers-${idx}`}
                                            />
                                            <TextInput
                                                labelText="Relieving Factors"
                                                value={c.relievingFactors}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "relievingFactors", e.target.value)
                                                }
                                                id={`relieving-${idx}`}
                                            />
                                            <TextInput
                                                labelText="Diagnosis"
                                                value={c.diagnosis}
                                                onChange={(e) =>
                                                    handleConsultationChange(idx, "diagnosis", e.target.value)
                                                }
                                                id={`diagnosis-${idx}`}
                                            />
                                        </>
                                    </AccordionItem>
                                </Accordion>

                                <Accordion>
                                    <AccordionItem title="Medical History">
                                        <TextArea
                                            labelText="Chronic Conditions"
                                            value={c.chronicConditions.join(", ")}
                                            onChange={(e) =>
                                                handleConsultationChange(
                                                    idx,
                                                    "chronicConditions",
                                                    e.target.value.split(",").map((s) => s.trim())
                                                )
                                            }
                                            id={`chronic-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Past Surgeries"
                                            value={c.surgeries}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "surgeries", e.target.value)
                                            }
                                            id={`surgeries-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Family History"
                                            value={c.familyHistory}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "familyHistory", e.target.value)
                                            }
                                            id={`family-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Medications"
                                            value={c.takingMedication ? `Yes - ${c.medicationsList}` : "No"}
                                            onChange={(e) => {
                                                const [taking, ...rest] = e.target.value.split("-");
                                                handleConsultationChange(
                                                    idx,
                                                    "takingMedication",
                                                    taking.trim().toLowerCase() === "yes"
                                                );
                                                handleConsultationChange(
                                                    idx,
                                                    "medicationsList",
                                                    rest.join("-").trim()
                                                );
                                            }}
                                            id={`meds-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Supplements"
                                            value={c.supplements}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "supplements", e.target.value)
                                            }
                                            id={`supplements-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Allergies"
                                            value={c.allergies}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "allergies", e.target.value)
                                            }
                                            id={`allergies-${idx}`}
                                        />
                                    </AccordionItem>
                                </Accordion>

                                <Accordion>
                                    <AccordionItem title="Lifestyle">
                                        <TextInput
                                            labelText="Sleep"
                                            value={c.sleep}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "sleep", e.target.value)
                                            }
                                            id={`sleep-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Appetite"
                                            value={c.appetite}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "appetite", e.target.value)
                                            }
                                            id={`appetite-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Water Intake"
                                            value={c.waterIntake}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "waterIntake", e.target.value)
                                            }
                                            id={`water-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Bowel"
                                            value={c.bowel}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "bowel", e.target.value)
                                            }
                                            id={`bowel-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Physical Activity"
                                            value={c.activity}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "activity", e.target.value)
                                            }
                                            id={`activity-${idx}`}
                                        />
                                    </AccordionItem>
                                </Accordion>

                                <Accordion>
                                    <AccordionItem title="Vitals">
                                        <TextInput
                                            labelText="Height (cm)"
                                            type="number"
                                            value={c.height}
                                            onChange={(e) =>
                                                handleConsultationChange(
                                                    idx,
                                                    "height",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            id={`height-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Weight (kg)"
                                            type="number"
                                            value={c.weight}
                                            onChange={(e) =>
                                                handleConsultationChange(
                                                    idx,
                                                    "weight",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                            id={`weight-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Blood Pressure"
                                            value={c.bp}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "bp", e.target.value)
                                            }
                                            id={`bp-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Pulse"
                                            value={c.pulse}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "pulse", e.target.value)
                                            }
                                            id={`pulse-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Temperature"
                                            value={c.temperature}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "temperature", e.target.value)
                                            }
                                            id={`temp-${idx}`}
                                        />
                                        <TextInput
                                            labelText="SpO2"
                                            value={c.spo2}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "spo2", e.target.value)
                                            }
                                            id={`spo2-${idx}`}
                                        />
                                    </AccordionItem>
                                </Accordion>

                                <Accordion>
                                    <AccordionItem title="Investigations">
                                        <TextArea
                                            labelText="Tests"
                                            value={c.investigations.join(", ")}
                                            onChange={(e) =>
                                                handleConsultationChange(
                                                    idx,
                                                    "investigations",
                                                    e.target.value.split(",").map((s) => s.trim())
                                                )
                                            }
                                            id={`investigations-${idx}`}
                                        />
                                        <TextInput
                                            labelText="Other Tests"
                                            value={c.otherTests}
                                            onChange={(e) =>
                                                handleConsultationChange(idx, "otherTests", e.target.value)
                                            }
                                            id={`othertests-${idx}`}
                                        />
                                    </AccordionItem>
                                </Accordion>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Stack>
            )}
        </Modal>
    );
}