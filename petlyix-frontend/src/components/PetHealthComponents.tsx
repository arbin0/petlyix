import { petsApi } from "../api/pets";
import { type Vet, type VetVisit, type PetHealth, type Appointment } from "../types/api";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { PetVetDetails } from "./PetVetDetails";
import { AddVetModal } from "./Modals/AddVetModal";
import { AddPetHealthModal } from "./Modals/AddPetHealthModal";
import { AddVetVisitModal } from "./Modals/AddVetVisitModal";
import { EditAppointmentModal } from "./Forms/EditAppointmentModal";
import { AddAppointmentModal } from "./Modals/AddAppointmentModal";
import { Flex, Space } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { IconBuildingHospital, IconReportMedical, IconCalendarEvent, IconClipboardHeart } from "@tabler/icons-react";

export const PetHealthComponents = () => {
    const { petId } = useParams();

    const { data: vets = [] } = useQuery<Vet[]>({
       queryKey: ['vets', petId],
       queryFn: () => petsApi.getVets(petId!),
       enabled: !!petId,
    });

    const { data: vetVisits = [] } = useQuery<VetVisit[]>({
        queryKey: ['vetVisits', petId],
        queryFn: () => petsApi.getVetVisits(petId!),
        enabled: !!petId,
    });

    const { data: healthRecords = [] } = useQuery<PetHealth[]>({
        queryKey: ['petHealth', petId],
        queryFn: () => petsApi.getPetHealth(petId!),
        enabled: !!petId,
    });

    const { data: appointments = [] } = useQuery<Appointment[]>({
        queryKey: ['appointments', petId],
        queryFn: () => petsApi.getAppointments(petId!),
        enabled: !!petId,
    });

    return (
        <div>
            <Tabs defaultValue="health">
                <Tabs.List>
                    <Flex justify="space-between" w="100%">
                        <Tabs.Tab value="health" leftSection={<IconClipboardHeart size={20} />}>
                            Health Records
                        </Tabs.Tab>

                        <Tabs.Tab value="vets" leftSection={<IconBuildingHospital size={20} />}>
                            Vets
                        </Tabs.Tab>

                        <Tabs.Tab value="vet_visits" leftSection={<IconReportMedical size={20} />}>
                            Vet Visits
                        </Tabs.Tab>

                        <Tabs.Tab value="appointments" leftSection={<IconCalendarEvent size={20} />}>
                            Appointments
                        </Tabs.Tab>
                    </Flex>
                </Tabs.List>

                {/* Health Records */}
                <Tabs.Panel value="health">
                    <AddPetHealthModal />
                    <Space h="xs" />
                    {healthRecords.length === 0 ? (
                        <p>No health records found.</p>
                    ) : (
                        healthRecords.map((record) => (
                            <div key={record.id}>
                                <p>Weight: {record.weight}</p>
                                {record.height && <p>Height: {record.height}</p>}
                                {record.medical_conditions && <p>Medical Conditions: {record.medical_conditions}</p>}
                                {record.vaccinations && <p>Vaccinations: {record.vaccinations}</p>}
                                {record.notes && <p>Notes: {record.notes}</p>}
                                <hr />
                            </div>
                        ))
                    )}
                </Tabs.Panel>

                {/* Vets */}
                <Tabs.Panel value="vets">
                    <AddVetModal />
                    <Space h="xs" />
                    <PetVetDetails vets={vets} />
                </Tabs.Panel>

                {/* Vet Visits */}
                <Tabs.Panel value="vet_visits">
                    <AddVetVisitModal />
                    <Space h="xs" />
                    {vetVisits.length === 0 ? (
                        <p>No vet visits found.</p>
                    ) : (
                        vetVisits.map((visit) => (
                            <div key={visit.id}>
                                <p>Vet: {visit.vet}</p>
                                <p>Date: {new Date(visit.visit_date).toLocaleString()}</p>
                                {visit.reason && <p>Reason: {visit.reason}</p>}
                                {visit.notes && <p>Notes: {visit.notes}</p>}
                                <hr />
                            </div>
                        ))
                    )}
                </Tabs.Panel>

                {/* Appointments */}
               <Tabs.Panel value="appointments">
                <AddAppointmentModal />
                {appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    appointments.map((appt) => (
                    <Flex 
                        key={appt.id} 
                        justify="space-between" 
                        align="center" 
                        mb="sm" 
                        p="sm" 
                        style={{ border: '1px solid #eee', borderRadius: 6 }}
                    >
                        <div>
                        <p><strong>Vet:</strong> {appt.vet}</p>
                        <p><strong>Date:</strong> {new Date(appt.appointment_date).toLocaleString()}</p>
                        <p><strong>Status:</strong> {appt.status}</p>
                        </div>
                        <EditAppointmentModal appointment={appt} />
                    </Flex>
                    ))
                )}
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
