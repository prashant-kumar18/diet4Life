import { Patient } from "@/app/types/types";
import { useDeletePatient } from "@/app/utils/api";
import { Loading, Modal } from "@carbon/react";

export function DeletePatient({
  isModalOpen,
  setIsModalOpen,
  setLoadingRowId,
  selectedPatientIds,

}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingRowId: React.Dispatch<React.SetStateAction<string | null>>
  selectedPatientIds: string[];
}) {
  const { mutate: deletePatientapi,isPending } = useDeletePatient();
  const handleSubmit = () => {
    if (selectedPatientIds.length == 0) return;

    deletePatientapi(selectedPatientIds, {
      onSuccess: () => {
        console.log("Patients Deleted:");
      },
      onError: (error) => {
        console.error("Error deleting patient:", error);
      },

    });

    setIsModalOpen(false);
  };

  return (
   <> {isPending && <Loading  withOverlay/>}
    <Modal
      open={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      modalHeading={`Are you sure you want to delete?`}
      primaryButtonText="Delete"
      secondaryButtonText="Cancel"
      onRequestSubmit={handleSubmit}
      size="lg"
    >
      This action cannot be undone.
    </Modal>
    </>
  );
}