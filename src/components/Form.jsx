import React from 'react'
import styled from '@emotion/styled'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { useEffect, useState } from 'react'
import { currencies } from '../data/Currencies'
import Error from './Error'


const ImputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    
    const [ currency , SelectCurrency ] = useSelectCurrency('Choose your currency', currencies)
    const [ cryptoCurrency , SelectCryptoCurrency ] = useSelectCurrency('Choose your crypto currency', cryptos)
    
    useEffect(() => {
        const apiRequest= async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            
            const response = await fetch(url)
            const result = await response.json()
            const arrayCrypto = result.Data.map( c => {
                const object = {
                    id: c.CoinInfo.Name,
                    name: c.CoinInfo.FullName
                }
                return object
            })
            setCryptos(arrayCrypto)
        }
        apiRequest();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([currency, cryptoCurrency].includes('')){
            setError(true)
            return
        }

        setError(false)
        setCurrencies({
            currency,
            cryptoCurrency
        })
    }

    return (
        <>
        {error && <Error>All fields are required</Error>}
        <form 
        onSubmit={handleSubmit}>
            <SelectCurrency/>
            <SelectCryptoCurrency/>
            <ImputSubmit type='submit' value='Quote'/>
        </form>
        </>
    )
}

export default Form
