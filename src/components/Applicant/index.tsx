import React from 'react';
// import './ProductItem.css';
import Button from "../Button";

const Applicant = ({product, className, onAdd}: { product: any, className?: string, onAdd: any }) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img className={'img'} src={product.src} style={{width: 100, height: 100, objectFit: 'cover'}}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Выбрать
            </Button>
            <Button className={'add-btn'} onClick={onAddHandler}>
                -
            </Button>
        </div>
    );
};

export default Applicant;