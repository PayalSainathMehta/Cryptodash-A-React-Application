import React from "react";
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
cc.setApiKey('f1b07033d276e0451633dc9ee4b4c6a264bff6076d7a0e9694d8a810292fdd45');
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = new React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            changeChartSelect: this.changeChartSelect,
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
        this.fetchHistorical();
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

    fetchHistorical = async() => {
        if(this.state.firstVisit) return;
        let results = await this.historical();
        // console.log(results);
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical});
    }

    historical = () => {
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--){
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                     moment()
                         .subtract({[this.state.timeInterval]: units})
                         .toDate()
                )
            )
        }
        return Promise.all(promises);
    }

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
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
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
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


    changeChartSelect = (value) => {
        console.log(value);
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
    }
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )

    }
}