import React from 'react';
import { SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

 const Categoria = (categorias) =>{
    const {categoria} = categorias

    return (
        <SplideSlide key={`${categoria}s`}>
            <div className={`fx relative flex ${categoria}s`}>
                <img src={`img/${categoria}.png`} className='block w-[100px] mx-auto'/>
                <img src={`img/bg-${categoria}.png`} className='w-[100px] mx-auto absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'/>
                <h2>{categoria}</h2>
            </div>
        </SplideSlide>
    );
}

export default Categoria