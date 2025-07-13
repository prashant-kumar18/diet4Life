import { Patient } from "@/app/types/types";
import { handleDownload } from "@/app/utils/utils";
import { Accordion, AccordionItem, Modal, Stack } from "@carbon/react";

export function PatientDetailsView({
  isModalOpen,
  setIsModalOpen,
  setLoadingRowId,
  selectedPatient,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingRowId:React.Dispatch<React.SetStateAction<string | null>>;
  selectedPatient: Patient | null;
}) {
  return (
    <Modal
      open={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      modalHeading="Patient Details"
      primaryButtonText="Download"
      secondaryButtonText="Close"
      onRequestSubmit={() => selectedPatient && handleDownload([selectedPatient])}
      size="lg"
    >
      {selectedPatient && (
        <Stack gap={5}>
          <p>
            <strong>Name:</strong> {selectedPatient.name}
          </p>
          <p>
            <strong>Age:</strong> {selectedPatient.age}
          </p>
          <p>
            <strong>Gender:</strong> {selectedPatient.gender}
          </p>
          <p>
            <strong>Address:</strong> {selectedPatient.address}
          </p>

          <Accordion>
            {selectedPatient.consultations.map((consultation, idx) => (
              <AccordionItem
                key={idx}
                title={`Consultation on ${consultation.date} with ${consultation.doctor}`}
              >
                <Accordion>
                  <AccordionItem title="Symptoms & Diagnosis">
                    <p><strong>Symptoms:</strong> {consultation.symptoms}</p>
                    <p><strong>Duration:</strong> {consultation.duration}</p>
                    <p><strong>Severity:</strong> {consultation.severity}</p>
                    <p><strong>Triggers:</strong> {consultation.triggers}</p>
                    <p><strong>Relieving Factors:</strong> {consultation.relievingFactors}</p>
                    <p><strong>Diagnosis:</strong> {consultation.diagnosis}</p>
                  </AccordionItem>

                  <AccordionItem title="Medical History">
                    <p><strong>Chronic Conditions:</strong> {consultation.chronicConditions.join(', ')}</p>
                    <p><strong>Past Surgeries:</strong> {consultation.surgeries}</p>
                    <p><strong>Family History:</strong> {consultation.familyHistory}</p>
                    <p><strong>Medications:</strong> {consultation.takingMedication} - {consultation.medicationsList}</p>
                    <p><strong>Supplements:</strong> {consultation.supplements}</p>
                    <p><strong>Allergies:</strong> {consultation.allergies}</p>
                  </AccordionItem>

                  <AccordionItem title="Lifestyle">
                    <p><strong>Sleep:</strong> {consultation.sleep}</p>
                    <p><strong>Appetite:</strong> {consultation.appetite}</p>
                    <p><strong>Water Intake:</strong> {consultation.waterIntake}</p>
                    <p><strong>Bowel:</strong> {consultation.bowel}</p>
                    <p><strong>Physical Activity:</strong> {consultation.activity}</p>
                  </AccordionItem>

                  <AccordionItem title="Vitals">
                    <p><strong>Height:</strong> {consultation.height} cm</p>
                    <p><strong>Weight:</strong> {consultation.weight} kg</p>
                    <p><strong>Blood Pressure:</strong> {consultation.bp}</p>
                    <p><strong>Pulse:</strong> {consultation.pulse}</p>
                    <p><strong>Temperature:</strong> {consultation.temperature}</p>
                    <p><strong>SpO2:</strong> {consultation.spo2}</p>
                  </AccordionItem>

                  <AccordionItem title="Investigations">
                    <p><strong>Tests:</strong> {consultation.investigations.join(', ')}</p>
                    <p><strong>Other Tests:</strong> {consultation.otherTests}</p>
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