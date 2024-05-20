import React, {useState} from 'react';
//import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Applicant from "../Applicant";
import {useNavigate} from "react-router-dom";
import Button from "../Button";



const getTotalPrice = (items = []) => {
    return items.reduce((acc, item:any) => {
        return acc += item.price
    }, 0)
}

const List = () => {
    const [addedItems, setAddedItems] = useState<any>([]);
    const {tg, queryId} = useTelegram();
    const navigate = useNavigate()
    const [products, setProducts] = useState([
        {id: '1', title: 'Вадим Орлюк', price: 50000, description: 'АО Фирма Август, Менеджер по импортным закупкам',src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHU5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d091b49821ba57679d1f437537165a1bfc9908fd/avatar.jpeg'},
        {id: '2', title: 'Евгения Кусмакова', price: 120000, description: 'Оператор колл-центра , диспетчер', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGk5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0ef8fc2ed962e6cd4254e65abd249b4a000cccab/avatar.jpeg'},
        {id: '3', title: 'Chyngyz Turapov', price: 50000, description: 'Android-разработчик', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmk1IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1315a3f40984859d55f302e0471da311bb39b1dc/avatar.jpeg'},
        {id: '4', title: 'Алексей Геннадьевич Насонов', price: 122000, description: 'Продакт маркетинг менеджер', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0c3IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7e22f431632d5b0632769ec6ac51a411c85e8265/avatar'},
        {id: '5', title: 'Эркеш Викторович Дедеев', price: 50000, description: 'Android-разработчик', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcG05IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7be8cbb799ae7a63b0ce720d40527fc9b4ac16e6/avatar.jpeg'},
        {id: '6', title: 'Владимир Игоревич Ардатов', price: 60000, description: 'Android developer (Java,Kotlin)', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEs3IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c1c6a7bec26b9401340bd80e28ec7ce4ce52b3f1/avatar.jpeg'},
        {id: '7', title: 'Егор Гребенюк', price: 55000, description: 'Инженер-разработчик САПР', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb205IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3ed467576a46af3508e481898f651d639f1b0dab/avatar.jpeg'},
        {id: '8', title: 'Алексей Андреевич Шевченко', price: 120000, description: '1C ERP / УПП / Big Data / High Load / DevOps / Аналитик / Data Scientist / Fullstack / Back / Mobile', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnU5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7dce41d30cd95f4794be2d61071495b0048abb6d/avatar.jpeg'},
    ])

    const onSendData = useCallback(() => {
        // const data = {
        //     products: addedItems,
        //     totalPrice: getTotalPrice(addedItems),
        //     queryId,
        // }
        // fetch('http://85.119.146.179:8000/web-data', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })

        navigate("/new-status")
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product:any) => {
        const alreadyAdded = addedItems.find((item:any) => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter((item:any) => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Перейти к выбору этапа (кандидатов: ${newItems.length})`
            })
        }
    }

    const onDelete = (product:any) => {
        setProducts(products.filter(item => item.id !== product.id))
    }



    return (
        <div className={'list'} style={{display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'}}>
            {products.map(item => (
                <Applicant
                    product={item}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    className={'item'}
                    addedItems={addedItems}
                />
            ))}
            {/*<Button onClick={()=>navigate('/new-status')}>Далее </Button>*/}
        </div>
    );
};

export default List;