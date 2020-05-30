import React from "react";
import styled, {css} from "styled-components";
import {SelectableTile} from "../Shared/Tile";
import {fontSize3, fontSizeBig} from "../Shared/Styles";
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";

const JustifyRight = styled.div`
    justify-self: right;
`

const JustifyLeft = styled.div`
    justify-self: left;
`
const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3}
        grid-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
       `} 
`
const TickerSize = styled.div`
    ${fontSizeBig}
`
const numberFormat = number => {
    return + (number + '').slice(0,7);
}

const ChangePct = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`
function ChangePercent({data}){
    return ( <JustifyRight>
        <ChangePct red = {data.CHANGEPCT24HOUR < 0}>
            {numberFormat(data.CHANGEPCT24HOUR)}
        </ChangePct>
    </JustifyRight>);
}
function PriceTile({sym, data}){
    return (
        <PriceTileStyled>
            <CoinHeaderGridStyled>
                <JustifyLeft> {sym} </JustifyLeft>
                <ChangePercent data = {data} />
            </CoinHeaderGridStyled>
            <TickerSize>
                ${numberFormat(data.PRICE)}
            </TickerSize>

        </PriceTileStyled>
    );
}

function PriceTileCompact({sym, data}){
    return (
        <PriceTileStyled compact>
            <CoinHeaderGridStyled>
                <JustifyLeft> {sym} </JustifyLeft>
                <ChangePercent data = {data} />
            </CoinHeaderGridStyled>
            <div>
                ${numberFormat(data.PRICE)}
            </div>

        </PriceTileStyled>
    )
}
export default function({price, index}){
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile: PriceTileCompact;
    return (
        <TileClass sym = {sym} data = {data}>
            {sym} {data.PRICE}
        </TileClass>
    )
}