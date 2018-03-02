import { jsonFileToKeys } from "./utils/jsonFileToKeys";
import { HotelReservationContract } from "./config/contracts-config";
import {
	validateReservationParams
} from "./validators/reservation-validators";
import {
	web3
} from './config/contracts-config.js';
import { formatEndDateTimestamp, formatStartDateTimestamp, formatTimestamp } from "./utils/timeHelper";
import { validateLocBalance } from "./validators/token-validators";
import { approveContract } from "./utils/approveContract";
import { signTransaction } from "./utils/signTransaction";

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
	                               roomId) {
		const userKeys = jsonFileToKeys(jsonObj, password);
		const callOptions = {
			from: userKeys.address,
			gas: gasConfig.hotelReservation.create
		};

		// TODO Change formatTimestamp to set to 00:01 on startDate and 23:59 on EndDate - after Marto confirm it in truffle tests
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
			callOptions);

		await validateLocBalance(userKeys.address, reservationCostLOC);

		await approveContract(userKeys.address, userKeys.privateKey, reservationCostLOC, HotelReservationContract._address);

		const createReservationMethod = HotelReservationContract.methods.createHotelReservation(hotelReservationIdHex,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentage,
			hotelIdHex,
			roomIdHex
		);

		const funcData = await createReservationMethod.encodeABI(callOptions);
		const signedData = await signTransaction(
			HotelReservationContract._address,
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
}