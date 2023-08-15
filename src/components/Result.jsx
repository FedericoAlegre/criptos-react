import styled from "@emotion/styled"

const ResultDiv = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;

`
const Text = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Price = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`
const Img = styled.img`
    display: block;
    width: 120px;

`

const Result = ({result}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result

  return (
    <ResultDiv>
        <Img src={`https://cryptocompare.com/${IMAGEURL}`} alt="icon"/>
        <div>
            <Price>Price: <span>{PRICE}</span></Price>
            <Text>Today Highest Price: <span>{HIGHDAY}</span></Text>
            <Text>Today Lowest Price: <span>{LOWDAY}</span></Text>
            <Text>Last 24hs variation: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Last update: <span>{LASTUPDATE}</span></Text>
        </div>
    </ResultDiv>
  )
}

export default Result
