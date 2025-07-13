'use client';

import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableSelectRow,
  TableBatchActions,
  TableBatchAction,
  Button,
  Loading,
  OverflowMenu,
  OverflowMenuItem,
  Modal,
} from '@carbon/react';
import { Add, Download, RowDelete } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

import { PatientDetailsView } from './components/PatientDetailsView';
import { PatientDetailsEdit } from './components/PatientDetailsEdit';
import { AddConsultation } from './components/AddConsultation';
import { DeletePatient } from './components/DeletePatient';

import { handleDownload } from '../utils/utils';
import { useData } from '../components/ContextProvider';
import { Patient } from '../types/types';
import { Dialog } from '@carbon/react/lib/components/Dialog';
import PatientForm from '../components/PatientForm';
import AddPatient from './components/PatientForm';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'age', header: 'Age' },
  { key: 'gender', header: 'Gender' },
  { key: 'diagnosis', header: 'Diagnosis' },
  { key: 'actions', header: 'Actions' },
];

const Dashboard = () => {
  const router = useRouter();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddPatinetModalOpen, setIsAddPatinetModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddConsultModalOpen, setIsAddConsultModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]);
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null);

  const patientsData = useData(); // from React Query
  const patients = patientsData.data ?? [];

  if (patientsData.isLoading) return <Loading withOverlay />;

  const handleAddPatinent = () => {
    setIsAddPatinetModalOpen(true);

  };
  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);

  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDelete = (idOrIds: string[] ) => {
    setSelectedPatientIds(idOrIds);
    setIsDeleteModalOpen(true);
  };

  const handleAddConsultation = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsAddConsultModalOpen(true);
  };

  const rowsWithActions = patients.map((patient: Patient) => ({
    ...patient,
    diagnosis: patient.consultations?.[0]?.diagnosis || 'N/A',
    actions:
      loadingRowId === patient.id ? (
        <Loading small withOverlay={false} />
      ) : (
        <OverflowMenu>
          <OverflowMenuItem itemText="View Details" onClick={() => handleView(patient)} />
          <OverflowMenuItem itemText="Edit Details" onClick={() => handleEdit(patient)} />
          <OverflowMenuItem itemText="Add Consultation" onClick={() => handleAddConsultation(patient)} />
          <OverflowMenuItem itemText="Delete" onClick={() => handleDelete([patient.id])} />
        </OverflowMenu>
      ),
  }));

  return (
    <>
      <DataTable rows={rowsWithActions} headers={headers} isSortable>
        {({
          rows,
          headers,
          getTableProps,
          getTableContainerProps,
          getSelectionProps,
          getBatchActionProps,
          getToolbarProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="Patient List" {...getTableContainerProps()}>
            <TableToolbar {...getToolbarProps()}>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction tabIndex={0} onClick={() => handleDelete(
                  selectedRows
                    .map((row) => patients.find((p: { id: string; }) => p.id === row.id)?.id)
                    .filter((id): id is string => !!id))} 
                    renderIcon={RowDelete}>
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={1}
                  onClick={() =>
                    handleDownload(
                      selectedRows
                        .map((row) => patients.find((p: { id: string; }) => p.id === row.id))
                        .filter(Boolean) as Patient[]
                    )
                  }
                  renderIcon={Download}
                >
                  Download
                </TableBatchAction>
              </TableBatchActions>

              <TableToolbarContent>
                <TableToolbarSearch
                  persistent
                  labelText="Search patients"
                  onChange={(event) => {
                    if (event && typeof event !== 'string') {
                      onInputChange(event);
                    }
                  }}
                />
                <Button renderIcon={Add} onClick={handleAddPatinent}>
                  Add
                </Button>
              </TableToolbarContent>
            </TableToolbar>

            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header) => (
                    <TableHeader key={header.key}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>

      <PatientDetailsView
        isModalOpen={isViewModalOpen}
        setIsModalOpen={setIsViewModalOpen}
        setLoadingRowId={setLoadingRowId}
        selectedPatient={selectedPatient}
      />
      <PatientDetailsEdit
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        setLoadingRowId={setLoadingRowId}
        selectedPatient={selectedPatient}
      />
      <AddConsultation
        isModalOpen={isAddConsultModalOpen}
        setIsModalOpen={setIsAddConsultModalOpen}
        setLoadingRowId={setLoadingRowId}
        selectedPatient={selectedPatient}
      />
      <DeletePatient
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setLoadingRowId={setLoadingRowId}
        selectedPatientIds={selectedPatientIds}
      />      
      <AddPatient
        isModalOpen={isAddPatinetModalOpen}
        setIsModalOpen={setIsAddPatinetModalOpen}
      />
    </>
  );
};

export default Dashboard;