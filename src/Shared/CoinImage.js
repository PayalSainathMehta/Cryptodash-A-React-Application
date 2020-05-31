import React from "react";
import styled,{css} from "styled-components";

const CoinImage = styled.img`
    height: 50px;
    margin: auto;
    display: block;
    
    ${props => props.spotlight && css`
        height: 200px;  
    `}
`
export default function({coin, spotlight}){
    return <CoinImage
        spotlight = {spotlight}
        alt = {coin.Symbol}
        src = {`http://cryptocompare.com/${
            coin.ImageUrl
          }`}
        />;
}