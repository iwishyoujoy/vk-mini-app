import { useQuery } from "@tanstack/react-query";
import { Group, Textarea, Button, Text, Spinner, usePlatform } from "@vkontakte/vkui";
import React, { useState } from "react";
import cn from 'classnames';

import { IFact } from "../../types/fact";

import styles from './styles.module.css';
import { Icon28ErrorCircleOutline } from "@vkontakte/icons";

interface IFactContentProps {
    id: string;
    ariaLabelledby: string;
}

export const FactContent: React.FC<IFactContentProps> = (props) => {
    const { ariaLabelledby, id } = props;
    const [refetchCounter, setRefetchCounter] = useState(0);
    const platform = usePlatform();

    const { isLoading, isError, data, error, refetch } = useQuery({ 
        queryKey: ['fact', refetchCounter], 
        queryFn: fetchFact, 
    });

    async function fetchFact(): Promise<IFact> {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера.');
        }
        const data: IFact = await response.json();
        return data;
    }

    const handleButtonClick = () => {
        setRefetchCounter(refetchCounter + 1);
        refetch();
    }

    if (isLoading) {
        return (
            <Group className={styles.container}>
                <Spinner size="regular" className={styles.spinner}/>
                <Button className={styles.button} size='l' onClick={handleButtonClick}>Получить новый факт</Button>
            </Group>
        )
    }

    if (isError) {
        return (
            <Group className={styles.container}>
                <div className={styles.error}>
                    <Icon28ErrorCircleOutline height={30} width={30} fill="#2688eb"/>
                    <Text>{error.message} Попробуйте перезагрузить страницу или запросить факт еще раз</Text>
                </div>
                <Button className={styles.button} size='l' onClick={handleButtonClick}>Получить новый факт</Button>
            </Group>
        )
    }

    return (
        <Group
            id={id}
            aria-labelledby={ariaLabelledby}
            className={styles.container}
        >
            <Text className={styles.label}>Интересный факт про котиков</Text>
            <Textarea className={styles.textarea} rows={10} defaultValue={data?.fact}/>
            <Button className={styles.button} size='l' onClick={handleButtonClick}>Получить новый факт</Button>
        </Group>
    )
}
