import React, {useCallback, useEffect, useState} from 'react';
import './style.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [salary_from, setSalaryFrom] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            salary_from,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, salary_from, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Начать поиск'
        })
    }, [])

    useEffect(() => {
        if(!salary_from || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, salary_from])

    const onChangeCountry = (e:any) => {
        setCountry(e.target.value)
    }

    const onChangeSalaryFrom = (e:any) => {
        setSalaryFrom(e.target.value)
    }

    const onChangeSubject = (e:any) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите данные для поиска нужного кандидата</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Локация'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Зп от'}
                value={salary_from}
                onChange={onChangeSalaryFrom}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Мужчина</option>
                <option value={'legal'}>Женщина</option>
            </select>
        </div>
    );
};

export default Form;