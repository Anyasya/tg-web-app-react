import React, {useState} from 'react';
//import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import Applicant from "../Applicant";



const getTotalPrice = (items = []) => {
    return items.reduce((acc, item:any) => {
        return acc += item.price
    }, 0)
}

const List2 = () => {
    const [addedItems, setAddedItems] = useState<any>([]);
    const {tg, queryId} = useTelegram();
    const [products, setProducts] = useState([
        {id: '1', title: 'Вадим Орлюк', price: 50000, description: 'АО Фирма Август, Менеджер по импортным закупкам',src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdHU5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d091b49821ba57679d1f437537165a1bfc9908fd/avatar.jpeg'},
        {id: '3', title: 'Chyngyz Turapov', price: 50000, description: 'Android-разработчик', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmk1IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1315a3f40984859d55f302e0471da311bb39b1dc/avatar.jpeg'},
        {id: '4', title: 'Алексей Геннадьевич Насонов', price: 122000, description: 'Продакт маркетинг менеджер', src: 'https://huntlee.ru/main/_ipx/_/remote/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0c3IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7e22f431632d5b0632769ec6ac51a411c85e8265/avatar'},
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
        </div>
    );
};

export default List2;