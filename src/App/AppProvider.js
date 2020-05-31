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
            confirmFavorites: this.confirmFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            setFilteredCoins: this.setFilteredCoins

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
        this.fetchPrices();
    }

    fetchCoins = async() => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        // console.log(coinList);
    }

    fetchPrices = async() => {
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices});
    }

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }))
    }

    prices = async() => {
        let returnData = [];
        for(let i = 0; i < this.state.favorites.length; i++){
            try{
                let priceData = await cc.priceFull(this.state.favorites[i],'USD');
                returnData.push(priceData);
            }
            catch(e){
                console.log("Fetch price error", e);
            }
        }
        return returnData;
    }
    confirmFavorites = () =>{
        // console.log("Helloooo");
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
        }, () => {
            this.fetchPrices();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({
            // test: 'helloo'
            favorites: this.state.favorites,
            currentFavorite
        }));
    }
    savedSettings(){
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if(!cryptoDashData){
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
    }

    setPage = page => this.setState({page})
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )

    }
}