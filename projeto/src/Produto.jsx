import React from 'react';

const Produto = (atributos) =>{
    const {imagem, titulo, serie, driver, manual, classe, categoria,hidden } = atributos
    let e = 0
    return (
        <div className={`dr driver ${classe} ${categoria}s container mx-auto justify-center py-28 lg:gap-16 gap-40 flex-col lg:flex-row lg:px-2 px-8`} key={titulo+e++} style={{display:hidden}}>
            <div className="flex flex-col lg:w-4/12 w-full">
                <div className="py-20 relative">
                    <img src={imagem} draggable={false} loading='lazy'
                         className="absolute block w-full max-w-[500px] mx-auto lg:-top-12 -top-40 left-1/2 -translate-x-2/4 duration-150 mix-blend-darken" 
                    />
                </div>
            </div>
            <div className="lg:w-[40%] w-full">
                <strong className='text-black sm:text-5xl text-4xl'>
                    {titulo}
                </strong> <br/><br/>

                <p className="text-[#999] font-bold text-sm [text-wrap:balance] md:text-left text-center">
                    {serie}
                </p>
                <br/>
                <div className="flex gap-8 flex-col sm:flex-row md:justify-start justify-center">
                    <div className={`text-center${driver === 'N/A' ? ' hidden' : ``}`}>
                        <strong className={`text-3xl manual`}>Drivers</strong> <br/><br/>
                        <a href={`${driver === 'N/A' ? '#' : driver }`} 
                            className="text-white px-6 py-2 bg-[#097BE5] rounded-xl block w-full sm:w-[unset]" 
                            target='_blank' data-type='Drivers'>Download</a>
                    </div>
                    <hr className="rotate-90 bg-gray-400 sm:block w-16 self-center hidden h-[2px]"/>
                    <div className={`text-center${manual === 'N/A' ? ' hidden' : ``}`}>
                        <strong className={`text-3xl manual`}>Manual</strong> <br/><br/>
                        <a href={`${manual === 'N/A' ? '#' : manual }`} 
                            className="text-white px-6 py-2 bg-[#F76412] rounded-xl block w-full sm:w-[unset]" 
                            target='_blank' data-type='Manual'>Download</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Produto


