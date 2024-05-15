import React from 'react';

function Navbar(){
    return (
        <nav className='mx-auto bg-[#004D8E] relative top-0 left-0 w-full px-8 cl:px-0'>
            <div className='container mx-auto flex justify-between items-center h-20 max-w-[1300px]'>
                <a href="https://kabum.com.br/" target='_blank'>
                    <img src="img/logo-kabum.webp" alt="Logo KaBuM!" className='w-[70px] xxs:w-auto'/>
                </a>
                <ul className='flex gap-12'>
                    <li className='text-white'><a href='#' target='_blank'>Contato</a></li>
                    <li className='text-white'><a href='#' target='_blank'>Sobre a KBM!</a></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar