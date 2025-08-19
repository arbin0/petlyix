import { useState } from 'react';
import cx from 'clsx';
import { ScrollArea, Table } from '@mantine/core';
import classes from '../styles/TableScrollArea.module.css';
import { type FoodLog } from "../types/api";


interface PetFoodLogProps {
    foods: FoodLog[];
}

export function PetFoodLogTable({foods} : PetFoodLogProps) {
   
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