import { Card, Image, Group, Text, Badge } from '@mantine/core';
import styles from '../styles/cardDisplay.module.css';


interface CardProps {
    img_url:string,
    name: string,
    type: string,
}

export const CardDisplay = ({img_url,name,type}:CardProps) => {
    let badgeColor:string = "pink"
    if (type.toLowerCase() === 'dog'){
        badgeColor = "blue";
    } else if(type.toLowerCase() === 'cat'){
        badgeColor = "violet"
    }
    
    return(
        <div className={styles.CardDisplay}>        
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                src= {img_url}
                height={160}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name}</Text>
                
                <Badge color={badgeColor}>{type}</Badge>
            </Group>


        </Card>
        </div>
    );
}



