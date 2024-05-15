import './style.css'
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect, useState} from "react";
export const StatusesPage = () => {
    const [subject2, setSubject] = useState('Собеседование HR');
    const [isSended, setIsSended] = useState(false);
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            statusText: subject2
        }
        tg.sendData(JSON.stringify(data));
        setIsSended(true)
    }, [subject2])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Перместить на этап'
        })
    }, [])







    const onChangeSubject = (e:any) => {
        setSubject(e.target.value)
    }
    return (
        <div>
            <h3> Выберите этап для кандидатов:</h3>
            <select value={subject2} onChange={onChangeSubject} className={'select'}>
                <option value={'Собеседование HR'}>Собеседование HR</option>
                <option value={'Собеседование Тех'}>Собеседование Тех</option>
                <option value={'Тестовое задание'}>Тестовое задание</option>
                <option value={'Служба безопасности'}>Служба безопасности</option>
                <option value={'Оффер'}>Оффер</option>
                <option value={'Отказ'}>Отказ</option>
            </select>
            {isSended && <p>Отпралвено</p>}
        </div>
)
}