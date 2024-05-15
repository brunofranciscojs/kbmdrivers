import React, {useState, useEffect} from 'react';
import Navbar from './NavBar.jsx'
import Footer from './Footer.jsx'
import './index.css';
import Produto from './Produto.jsx';
import Categoria from './Categoria.jsx';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Splide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function App() {
  const [produtos,setProdutos] = useState([]), 
  produto = [], 
  filter = new Set()

  useEffect(() =>{
    const fetchPlanilha = async () => {
        for (const aba of ['Teclados','Headsets','Mouses']) {
            const dadosPlanilha = await fetch(`https://docs.google.com/spreadsheets/d/1Zt49I9zhYKHISOyxCn9TKe2xpS2AG0oxRPvk2FzZs-g/gviz/tq?&sheet=${aba}`);
            const planilha = await dadosPlanilha.text();
            const produtos = JSON.parse(planilha.substring(47).slice(0, -2)).table['rows'];
          
            produtos.map((item,index) => {
                produto.push({
                  id:      produto.length,
                  titulo:  item.c[2]['v'],
                  classe:  item.c[2]['v'].split(' ').join('').toLowerCase(),
                  serie:   item.c[0]['v'],
                  imagem:  item.c[5]['v'],
                  manual:  item.c[4]['v'],
                  driver:  item.c[3]['v'],
                  key:     Math.random() * index + produto.length * 2.1,
                  categoria:   item.c[2]['v'].split(' ')[0].toLowerCase(),
                  hidden: 'none'
                })
            });

        }
        setProdutos(produto);

    };
    fetchPlanilha();
    
},[]);
  const SliderSettings = {
    focus:2, 
    type:'slide', 
    rewind: true, 
    gap: '1.3rem', 
    pagination:false, 
    perPage:3, 
    breakpoints:{ 
      960:{ perPage:3, gap: '1rem'}, 
      769:{ perPage:2, gap: '1rem'}, 
      500:{ perPage:1, gap: '1rem'}
    }
  }
  const resultadoDropDown = (prdcts) => {
    return ( 
        <div className='text-[#444]'>
          <img src={prdcts.imagem} className="w-[40px] inline-block mr-2 mix-blend-darken"/>
          <span className='inline-block'> {prdcts.titulo}</span> 
          <small className='text-[.6rem] text-gray-400'> | {prdcts.serie}</small>
        </div>
      )
  }
  const renderProduto = (prdcts) => {
    const produto = prdcts.classe;

    const mostrarProduto = produtos.map((item) => {
      if (item.classe === produto) {
        fecharResultado();
        window.scrollTo(0, 10000)
        return { ...item, hidden: 'flex'};
      } else {
        return { ...item, hidden: 'none'};
      }
    });
    setProdutos(mostrarProduto);
  };
  
  const novaBusca = (value) => {
    if(value.trim() === ''){
        document.querySelectorAll('.driver').forEach(driver => driver.style.cssText = 'display:none')
    }
  }
  const fecharResultado = () =>{
    document.querySelectorAll('.dr').forEach(driver => {
      driver.style.cssText = 'display:none;';
      driver.classList.remove('opened')
    })
  }    

const escolherCategoria = (e) =>{
  if(e.target.tagName === 'DIV'){
    window.scrollTo(0, document.body.scrollHeight)
    
    document.querySelectorAll(`.dr`).forEach(driver => {
      if(driver.className.includes(e.target.getAttribute('class').split(' ')[3].slice(0,-1))){
        driver.classList.remove('driver'),
        driver.classList.add('opened'),
        driver.querySelectorAll('a').forEach(link => link.innerText = `Download ${link.getAttribute('data-type')}`)
      }else{
        driver.classList.add('driver'),
        driver.classList.remove('opened'),
        driver.style.cssText = 'display:none;',
        driver.querySelectorAll('a').forEach(link => link.innerText = `Download`)
      }
    }) 
  }
}
useEffect(() =>{
  document.querySelector('.categorias').removeEventListener('click',escolherCategoria)
},[])
 
 return (
  <>
    <header className='3xl:container w-full bg-[url("/img/bg-header.webp")] bg-center bg-no-repeat bg-cover'>
      <Navbar/>
      <div className='relative w-screen flex flex-col justify-center h-full py-48 container mx-auto'>
        <h2 className='text-center font-bold text-white text-5xl'>Localize seu produto</h2> <br />
        <p className='text-center text-white text-2xl'>Obtenha drivers, manuais, documentos da garantia e outras informações para o seu produto.</p>

          <ReactSearchAutocomplete
              items={produtos}
              autoFocus={false}
              formatResult={resultadoDropDown} 
              showNoResultsText={'nada encontrado.'} 
              onSelect={renderProduto}
              onSearch={novaBusca}
              placeholder={'Nome, marca ou nª de série'}
              fuseOptions={{ keys: ["titulo", "imagem", "serie"] }}
              resultStringKeyName="titulo"
              className='rounded-full max-w-[700px] w-[90%] h-12 mx-auto mt-8 relative z-50 
              focus-within:after:content-[url("/img/seta.png")] after:focus-within:animate-[busquinha_.2s_linear] 
              after:absolute after:content-[url("/img/search-icon.png")] after:right-1 after:-top-0 after:z-10 after:scale-75'
          />
      </div>
    </header>

    <section className='relative 3xl:container categorias duration-200 transition-all overflow-x-clip overflow-y-visible pt-4 pb-4'>
          <div className="container periferals mx-auto !overflow-visible relative max-w-[1366px]" onClick={escolherCategoria}>
            <Splide options={SliderSettings}>
              {produtos.map((ctg) => {
                const categoria = ctg.categoria;
                  if (!filter.has(categoria)) {
                    filter.add(categoria);
                    return <Categoria key={ctg.categoria} {...ctg} />;
                  }
                })}
            </Splide>
          </div>
    </section>

    <section className='3xl:container produtos duration-200 transition-all relative [&:has(.opened)_button]:block [&:has(.opened)_.hr]:flex [&:has(.dr[style="display:_flex;"])_button]:block'>
      
      <div className='hidden hr justify-center items-center gap-3 pointer-events-none '>
        <hr className='bg-[#e5e7eb] text-[#e5e7eb] h-[2px] w-1/3 block '/>
        <img src="img/scroll.png" className='w-[15px] block brightness-95' draggable={false}/>
        <hr className='bg-[#e5e7eb] text-[#e5e7eb] h-[2px] w-1/3 block '/>
      </div>

        <div className='container relative mx-auto z-10'>
          <button className='text-[#999] rounded-full h-8 w-8 p-2 leading-none bg-[#f3f3f3] absolute top-0 right-0 shadow-xl hidden cursor-pointer ' 
                  onClick={(e)=>(fecharResultado(),e.target.classList.add('hidden'))}>⛌</button>
        </div>
        <div className="4xl:container mx-auto max-w-[1700px]">
            <div className="escondido relative" >
                <div className="flex [&:has(.opened)]:gap-4 relative -translate-y-20 [&:has(.opened)]:translate-y-0 flex-wrap justify-center">
                  {produtos.map((item) => {
                    const driver = item.titulo;
                    if (!filter.has(driver)) {
                        filter.add(driver);
                        return <Produto key={item.key} {...item}/>
                      }
                  })}
                </div>
            </div>
        </div>
    </section>
    
    <Footer/>
  </>
  )
}

