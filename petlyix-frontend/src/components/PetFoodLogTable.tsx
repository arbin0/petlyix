import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from '../styles/TableScrollArea.module.css';
import { petsApi } from "../api/pets";
import { type FoodLog } from "../types/api";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';


export function PetFoodLogTable() {
    const { petId } = useParams();
    const { data: foods = [] } = useQuery<FoodLog[]>({
       queryKey: ['foods', petId],
       queryFn: () => petsApi.getFoodLogs(petId!),
       enabled: !!petId,
    });
    const [scrolled, setScrolled] = useState(false);

    const rows = foods.map((row) => (
        <Table.Tr key={row.id}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.calories}</Table.Td>
            <Table.Td>{new Date(row.logged_time).toLocaleString()}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Food</Table.Th>
                        <Table.Th>Calories</Table.Th>
                        <Table.Th>Meal Time</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}