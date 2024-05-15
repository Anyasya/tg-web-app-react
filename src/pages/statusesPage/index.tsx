import './style.css'
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect, useState} from "react";
export const StatusesPage = () => {
    const {tg} = useTelegram();
    const [subject, setSubject] = useState('Собеседование HR');

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Выбрать этап'
        })
    }, [])


    const onSendData = useCallback(() => {
        const data = {
            statusText: subject
        }
        tg.sendData(JSON.stringify(data));

    }, [subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onChangeSubject = (e:any) => {
        setSubject(e.target.value)
    }
    return (
        <div>
            <h3> Выберите этап для кандидатов:</h3>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'Собеседование HR'}>Собеседование HR</option>
                <option value={'Собеседование Тех'}>Собеседование Тех</option>
                <option value={'Тестовое задание'}>Тестовое задание</option>
                <option value={'Служба безопасности'}>Служба безопасности</option>
                <option value={'Оффер'}>Оффер</option>
                <option value={'Отказ'}>Отказ</option>
            </select>
        </div>
)
}