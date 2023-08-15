import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImgCripto from './img/imagen-criptos.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'

const Conteiner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width:90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin:100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #9497FF;
    display: block;
    margin: 10px auto 0 auto;

  }
`

function App() {
  const [currencies, setCurrencies] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if(Object.keys(currencies).length > 0){
      const quoteCrypto = async () => {
        setLoading(true)
        setResult({})
        const {currency, cryptoCurrency} = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`
        const response = await fetch(url)
        const result = await response.json()
        setResult(result.DISPLAY[cryptoCurrency][currency])
        setLoading(false)
      }
      quoteCrypto()
    }
  }, [currencies])

  return (
    <Conteiner>
      <Image src={ImgCripto} alt='Cripto image'/>
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Form
          setCurrencies={setCurrencies}/>
        {loading && <Spinner/>}
        {result.PRICE && <Result result={result}/>}
      </div>
      
    </Conteiner>
  )
}

export default App
