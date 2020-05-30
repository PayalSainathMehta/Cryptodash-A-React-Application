import React from "react";
import {AppContext} from "../App/AppProvider";
import styled from "styled-components";
import CoinTile from "./CoinTile";
import {filter} from "fuzzy";


export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 15px;
`
function getLowerSectionCoins(coinList, filteredCoins){
    return (filteredCoins && Object.keys(filteredCoins))
        || Object.keys(coinList).slice(0, 100)
}
function getCoinsToDisplay(coinList, topSection, favorites, filterCoins){
    return topSection ? favorites: getLowerSectionCoins(coinList, filterCoins);
}
export default function ({topSection}) {
    return (<AppContext.Consumer>
        {({coinList, favorites, filteredCoins}) => (<CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey =>
                <CoinTile key = {coinKey} topSection = {topSection} coinKey = {coinKey} />
            )}
        </CoinGridStyled>)}
    </AppContext.Consumer>
    );
}
