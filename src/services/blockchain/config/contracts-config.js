import {
	Config
} from './../../../config';
import ethers from 'ethers';
import StandardToken from './contracts-json/StandardToken.json';
import LOCExchangeContractJSON from './contracts-json/LOCExchange.json';
import IHotelReservationFactory from './contracts-json/IHotelReservationFactory.json';
import IHotelReservation from './contracts-json/IHotelReservation.json';

const providers = ethers.providers;
const localNodeProvider = new providers.JsonRpcProvider(Config.getValue('WEB3_HTTP_PROVIDER'), providers.networks.unspecified);

/**
 * Creation of LOCTokenContract object
 * @type {ethers.Contract}
 */

export let LOCTokenContract = new ethers.Contract(
	Config.getValue('LOCTokenContract'), StandardToken.abi, localNodeProvider);

export function LOCTokenContractWithWallet(wallet) {
	wallet.provider = localNodeProvider;

	return new ethers.Contract(Config.getValue('LOCTokenContract'), StandardToken.abi, wallet);
}

/**
 * Creation of LOCExchangeContract object
 * @type {ethers.Contract}
 */

export let LOCExchangeContract = new ethers.Contract(Config.getValue('LOCExchange'), LOCExchangeContractJSON.abi, localNodeProvider);

export function LOCExchangeContractWithWallet(wallet) {
	wallet.provider = localNodeProvider;

	return new ethers.Contract(Config.getValue('LOCExchange'), LOCExchangeContractJSON.abi, wallet);
}

/**
 * Creation of HotelReservationFactoryContract object
 * @type {ethers.Contract}
 */

export let HotelReservationFactoryContract = new ethers.Contract(
	Config.getValue('HotelReservationFactoryProxy'), IHotelReservationFactory.abi, localNodeProvider);


export function HotelReservationFactoryContractWithWallet(wallet) {
	wallet.provider = localNodeProvider;
	return new ethers.Contract(Config.getValue('HotelReservationFactoryProxy'), IHotelReservationFactory.abi, wallet);
}

/**
 * Creation of HotelReservationContract object
 * @type {ethers.Contract}
 */

export function initHotelReservationContract(hotelReservationContractAddress) {
	return new ethers.Contract(
		hotelReservationContractAddress, IHotelReservation.abi, localNodeProvider)

};