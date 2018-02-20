import Web3 from 'web3';
import {
	Config
} from './../../../config';
import StandartToken from './contracts-json/StandartToken.json'
import LOCExchangeContractJSON from './contracts-json/LOCExchange.json'

let web3 = new Web3(new Web3.providers.HttpProvider(Config.getValue('WEB3_HTTP_PROVIDER')));

export {
	web3
};


/**
 * Creation of LOCTokenContract obkect
 * @type {web3.eth.Contract}
 */

export let LOCTokenContract = new web3.eth.Contract(
	StandartToken.abi,
	Config.getValue('LOCTokenContract'),
)

/**
 * Creation of LOCExchangeContract obkect
 * @type {web3.eth.Contract}
 */

export let LOCExchangeContract = new web3.eth.Contract(
	LOCExchangeContractJSON.abi,
	Config.getValue('LOCExchange'),
)