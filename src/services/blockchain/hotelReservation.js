import {
	jsonFileToKeys
} from "./utils/jsonFileToKeys";
import {
	HotelReservationFactoryContract,
	initHotelReservationContract,
} from "./config/contracts-config";
import {
	validateBookingExists,
	validateCancellation,
	validateReservationParams
} from "./validators/reservation-validators";
import {
	web3
} from './config/contracts-config.js';
import {
	formatEndDateTimestamp,
	formatStartDateTimestamp,
	formatTimestamp
} from "./utils/timeHelper";
import {
	validateLocBalance
} from "./validators/token-validators";
import {
	approveContract
} from "./utils/approveContract";
import {
	signTransaction
} from "./utils/signTransaction";

const gasConfig = require('./config/gas-config.json');
const errors = require('./config/errors.json');

export class HotelReservation {
	static async createReservation(jsonObj,
		password,
		hotelReservationId,
		reservationCostLOC,
		reservationStartDate,
		reservationEndDate,
		daysBeforeStartForRefund,
		refundPercentage,
		hotelId,
		roomId,
		numberOfTravelers) {
		const userKeys = jsonFileToKeys(jsonObj, password);
		const callOptions = {
			from: userKeys.address,
			gas: gasConfig.hotelReservation.create
		};

		const reservationStartDateFormatted = formatStartDateTimestamp(reservationStartDate);
		const reservationEndDateFormatted = formatEndDateTimestamp(reservationEndDate);
		const hotelReservationIdHex = web3.utils.utf8ToHex(hotelReservationId);
		const hotelIdHex = web3.utils.utf8ToHex(hotelId);
		const roomIdHex = web3.utils.utf8ToHex(roomId);

		await validateReservationParams(jsonObj,
			password,
			hotelReservationIdHex,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentage,
			hotelIdHex,
			roomIdHex,
			numberOfTravelers,
			callOptions);

		await validateLocBalance(userKeys.address, reservationCostLOC);

		await approveContract(userKeys.address, userKeys.privateKey, reservationCostLOC, HotelReservationFactoryContract._address);

		const createReservationMethod = HotelReservationFactoryContract.methods.createHotelReservation(hotelReservationIdHex,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentage,
			hotelIdHex,
			roomIdHex,
			numberOfTravelers
		);

		const funcData = await createReservationMethod.encodeABI(callOptions);
		const signedData = await signTransaction(
			HotelReservationFactoryContract._address,
			userKeys.address,
			userKeys.privateKey,
			gasConfig.hotelReservation.create,
			funcData
		);

		return new Promise(function (resolve, reject) {
			web3.eth.sendSignedTransaction(signedData)
				.once('transactionHash', function (transactionHash) {
					resolve({
						transactionHash
					});
				});
		});
	}

	static async cancelReservation(jsonObj,
		password,
		hotelReservationId) {
		const userKeys = jsonFileToKeys(jsonObj, password);
		const callOptions = {
			from: userKeys.address,
			gas: gasConfig.hotelReservation.cancel
		};

		if (!jsonObj || !password || !hotelReservationId) {
			throw new Error(errors.INVALID_PARAMS);
		}

		const hotelReservationIdHex = web3.utils.utf8ToHex(hotelReservationId);

		const reservation = await this.getReservation(hotelReservationId);
		// ToDo: Rename customerAddress to _customerAddress after fix in contract
		validateCancellation(reservation._refundPercentage,
			reservation._daysBeforeStartForRefund,
			reservation._reservationStartDate,
			reservation._customerAddress,
			userKeys.address);

		const cancelReservationMethod = HotelReservationFactoryContract.methods.cancelHotelReservation(hotelReservationIdHex);
		const funcData = await cancelReservationMethod.encodeABI(callOptions);
		const signedData = await signTransaction(
			HotelReservationFactoryContract._address,
			userKeys.address,
			userKeys.privateKey,
			gasConfig.hotelReservation.cancel,
			funcData
		);

		return new Promise(function (resolve, reject) {
			web3.eth.sendSignedTransaction(signedData)
				.once('transactionHash', function (transactionHash) {
					resolve({
						transactionHash
					});
				});
		});
	}

	static async getReservation(hotelReservationId) {
		const hotelReservationContractAddress = await validateBookingExists(hotelReservationId);
		const hotelReservationContract = initHotelReservationContract(hotelReservationContractAddress);
		const reservation = await hotelReservationContract.methods.getHotelReservation().call();
		return reservation;
	}
}