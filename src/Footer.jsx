import React from 'react';

function Footer(){
    return (
        <footer className="-tracking-tighter mx-auto">

            <div className="mx-auto 3xl:container text-white bg-[#303030]">
                <div className='container mx-auto flex justify-center py-8'>
                    <div className='max-w-[960px] mx-auto w-4/12'>
                        <h3 className='text-center'>Conheça nossas linhas</h3>
                    </div>
    
                    <div className='max-w-[960px] mx-auto flex gap-12 w-1/2'>
                        <a href='#' target='_blank'>
                            <img src="img/kbmessen.png" className='block w-auto hover:brightness-[2] duration-150 h-full'/>
                        </a>

                        <a href='#' target='_blank'>
                            <img src="img/kbmgaming.png" className='block w-auto hover:brightness-[2] duration-150 h-full'/>
                        </a>

                        <a href='#' target='_blank'>
                            <img src="img/kbmtech.png" className='block w-auto hover:brightness-[2] duration-150 h-full' />
                        </a>

                        <a href='#' target='_blank'>
                            <img src="img/kbmsmart.png" className='block w-auto hover:brightness-[2] duration-150 h-full'/>
                        </a>
                    </div>
                </div>
            </div> 

            <div className="mx-auto text-center font-bold 3xl:container py-8 text-[#F76412] bg-[#292929]">
                <span>&copy; 2023 KABUM S.A. | ALL RIGHTS RESERVED</span>
            </div>
        </footer>
    )
}
export default Footer