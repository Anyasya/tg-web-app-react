import React from 'react';
// import './ProductItem.css';
import Button from "../Button";

const Applicant = ({product, className, onAdd, onDelete,addedItems}: { product: any, className?: string, onAdd: any, onDelete: any,addedItems:any }) => {

    const onAddHandler = () => {
        onAdd(product);
    }
    const onDeleteHandler = () => {
        onDelete(product);
    }

    return (
        <div className={'product ' + className} style={{marginBottom: 10, width: '45%'}}>
            <img className={'img'} src={product.src} style={{width: 100, height: 100, objectFit: 'cover'}}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'} style={{maxWidth: 143,
                height: 23,
                overflow: 'scroll'}}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler} style={{marginRight: 10}}>
                {addedItems.includes(addedItems) ? 'Отменить' : 'Выбрать'}

            </Button>
            <Button className={'add-btn'} onClick={onDeleteHandler}>
                -
            </Button>
        </div>
    );
};

export default Applicant;