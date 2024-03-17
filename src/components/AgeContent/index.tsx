import { Button, FormItem, Group, Spinner, Text, useAppearance } from "@vkontakte/vkui"
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from 'classnames';

import styles from './styles.module.css';
import { IAge } from "../../types/age";
import { useQuery } from "@tanstack/react-query";
import { Icon28ErrorCircleOutline } from "@vkontakte/icons";

interface IAgeContentProps {
    id: string;
    ariaLabelledby: string;
}

interface IFormInput {
    name: string;
}

export const AgeContent: React.FC<IAgeContentProps> = (props) => {
    const { ariaLabelledby, id } = props;
    const [refetchCounter, setRefetchCounter] = useState(0);
    const [name, setName] = useState('');
    const { register, handleSubmit } = useForm<IFormInput>();
    const { isLoading, isError, data, error, refetch } = useQuery({ 
        queryKey: ['age', name, refetchCounter], 
        queryFn: () => fetchAge(name), 
    });
    const theme = useAppearance();

    async function fetchAge(name: string): Promise<IAge | null> {
        if (!name) {
            return null;
        }
        const response = await fetch(`https://api.agify.io/?name=${name}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера.');
        }
        const data: IAge = await response.json();
        return data;
    }

    const onSubmit: SubmitHandler<IFormInput> = (inputData) => {
        setRefetchCounter(refetchCounter + 1);
        setName(inputData.name);
        refetch();
    }

    if (isLoading) {
        return (
            <Group className={cn(styles.container, styles.placeholder)}>
                <Spinner size="regular" className={styles.spinner}/>
            </Group>
        )
    }

    if (isError) {
        return (
            <Group className={cn(styles.container, styles.placeholder)}>
                <div className={styles.error}>
                    <Icon28ErrorCircleOutline height={30} width={30} fill="#2688eb"/>
                    <Text>{error.message} Попробуйте перезагрузить страницу</Text>
                </div>
            </Group>
        )
    }

    return (
        <Group
            id={id}
            aria-labelledby={ariaLabelledby}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                <FormItem top="Ваше имя (латинскими буквами)" htmlFor="text" className={styles.input}>
                    <input defaultValue={name} className={cn(styles.inputField, theme === 'light' ? styles.light : styles.dark)} {...register("name")}/>
                </FormItem>
                <FormItem top="Ваш возраст" htmlFor="number" className={styles.input}>
                    <input defaultValue={data?.age} placeholder="Узнайте свой возраст прямо сейчас!" className={cn(styles.inputField, theme === 'light' ? styles.light : styles.dark)}/>
                </FormItem>
                <FormItem className={styles.button}>
                    <Button type="submit" size="l">Хочу узнать свой возраст!</Button>
                </FormItem>
            </form>
        </Group>
    )
}