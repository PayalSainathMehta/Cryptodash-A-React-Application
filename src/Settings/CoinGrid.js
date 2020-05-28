import React from "react";
import {AppContext} from "../App/AppProvider";
import styled, {css} from "styled-components";
import {SelectableTile} from "../Shared/Tile";

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
`
export default function (props) {
    return <AppContext.Consumer>
        {({coinList}) => <CoinGridStyled>
            {Object.keys(coinList).map(coinKey => <SelectableTile> {coinKey} </SelectableTile>)}
        </CoinGridStyled>
        }
    </AppContext.Consumer>;
}
