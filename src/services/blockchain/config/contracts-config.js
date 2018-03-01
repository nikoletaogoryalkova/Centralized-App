import Web3 from 'web3';
import {
	Config
} from './../../../config';
import StandardToken from './contracts-json/StandardToken.json'
import LOCExchangeContractJSON from './contracts-json/LOCExchange.json'
import IHotelReservationFactory from './contracts-json/IHotelReservationFactory.json'

let web3 = new Web3(new Web3.providers.HttpProvider(Config.getValue('WEB3_HTTP_PROVIDER')));

export {
	web3
};


/**
 * Creation of LOCTokenContract object
 * @type {web3.eth.Contract}
 */

export let LOCTokenContract = new web3.eth.Contract(
	StandardToken.abi,
	Config.getValue('LOCTokenContract'),
);

/**
 * Creation of LOCExchangeContract object
 * @type {web3.eth.Contract}
 */

export let LOCExchangeContract = new web3.eth.Contract(
	LOCExchangeContractJSON.abi,
	Config.getValue('LOCExchange'),
);

/**
 * Creation of LOCExchangeContract object
 * @type {web3.eth.Contract}
 */

export let HotelReservationContract = new web3.eth.Contract(
	IHotelReservationFactory.abi,
	Config.getValue('HotelReservationFactoryProxy')
);