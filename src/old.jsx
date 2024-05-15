import React, {useState, useEffect} from 'react';
import Navbar from './NavBar.jsx'
import Footer from './Footer.jsx'
import './index.css';
import Produto from './Produto.jsx';
import Categoria from './Categoria.jsx';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function App() {
    const [produtos,setProdutos] = useState(['']);
    const [buscado,setBuscado] = useState(['']);
    const goods = []
    useEffect(() =>{
        fetch('https://docs.google.com/spreadsheets/d/1WABX8e2NyJkNUaLuWyQvZ36vwd5WBQWYpVAG9lWw5-k/gviz/tq?')
        .then(response => { return response.text() })
        .then(json => {
            var planilha = JSON.parse(json.substring(47).slice(0, -2)).table['rows']
            setProdutos(planilha)
        })
    },[]);
    
    produtos.forEach(async (item,index) => {
      goods.push({ name: item.c['2']['v'], id: index, img:item.c['5']['v'] })
    })
    const resultado = (good) => {
      return ( 
        <div className='text-[#444]'>
          <img src={good.img} className="w-[40px] inline-block mr-2 mix-blend-darken"/>
          <span className=' inline-block'> {good.name}</span>
        </div> 
      )
    }
       const busca = (goods) =>{
        setBuscado(goods.name)

        const selectedProductClass = `.${goods.name.split(' ').join('').toLowerCase()}`;
        const selectedProductElements = document.querySelectorAll(selectedProductClass);
        
        selectedProductElements.forEach(element => {
          element.parentElement.style.cssText = 'display:block';
        });

        document.querySelectorAll('.driver').forEach(driver => {
          if (driver.className.includes(goods.name.split(' ').join('').toLowerCase())) {
            document.querySelector(`.${goods.name.split(' ').join('').toLowerCase()}`).style.cssText = 'display:flex;';
            document.getElementById(`scroll`).scrollIntoView({behavior:'smooth'})
          } else {
            driver.style.cssText = 'display:none;';
          }
        });
        
       }
  return (
    <>
    <header className='3xl:container w-screen bg-[url("/../src/assets/bg-header.webp")] bg-center bg-no-repeat bg-cover'>

      <Navbar/>

      <div className='relative w-screen flex flex-col justify-center h-full py-12'>
        <h2 className='text-center font-bold text-white text-2xl'>Localize seu produto</h2>
        <p className='text-center text-white text-lg'>Obtenha drivers, manuais, documentos da garantia e outras informações para o seu produto.</p>

        <div className='rounded-full w-[700px] h-12 mx-auto mt-8 relative z-50
                after:absolute after:content-[url("/../src/assets/search-icon.png")] after:right-1 after:-top-0 after:z-10 after:scale-75'>
          
        <ReactSearchAutocomplete 
            items={goods} 
            autoFocus={true}
            formatResult={resultado} 
            showNoResultsText={'nada encontrado.'} 
            placeholder={'Nome, marca ou nª de série'}
            onSelect={busca}
         />
         
        </div>
      </div>
    </header>

    <section className='3xl:container categorias'>
        <Categoria></Categoria>
        <Produto/>
    </section>
    
    <Footer/>
  </>
  )
}

export default App