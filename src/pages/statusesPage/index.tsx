import './style.css'
import {useCallback, useEffect} from "react";
import {useTelegram} from "../../hooks/useTelegram";
export const StatusesPage = () => {
    const {tg} = useTelegram();
    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Начать поиск'
        })
    }, [])

    const setStatus = (status:any) => {
            const data = {
                status
            }
            tg.sendData(JSON.stringify(data));
    }
    return (
        <div>
            <h3> Выберите этап для кандидатов:</h3>
                <p onClick={()=>setStatus('Собеседование HR')}>Собеседование HR</p>
                <p onClick={()=>setStatus('Собеседование Тех')}>Собеседование Тех</p>
                <p onClick={()=>setStatus('Тестовое задание')}>Тестовое задание</p>
                <p onClick={()=>setStatus('Служба безопасности')}>Служба безопасности</p>
                <p onClick={()=>setStatus('Оффер')}>Оффер</p>
                <p onClick={()=>setStatus('Отказ')}>Отказ</p>
        </div>
)
}