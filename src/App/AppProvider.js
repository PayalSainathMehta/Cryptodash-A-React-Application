import React from "react";
import _ from 'lodash';

const cc = require('cryptocompare');
const MAX_FAVORITES = 10;

export const AppContext = new React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites
        }
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites});
        }
    }

    isInFavorites = key => _.includes(this.state.favorites, key)


    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    }
        componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async() => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        // console.log(coinList);
    }
    confirmFavorites = () =>{
        // console.log("Helloooo");
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            // test: 'helloo'
            favorites: this.state.favorites
        }));
    }
    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoDashData;
        return {favorites};
    }

    setPage = page => this.setState({page})

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )

    }
}