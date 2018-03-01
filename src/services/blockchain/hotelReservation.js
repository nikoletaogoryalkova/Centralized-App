import { jsonFileToKeys } from "./utils/jsonFileToKeys";
import { HotelReservationContract } from "./config/contracts-config";
import {
	validateReservationParams
} from "./validators/reservation-validators";
import {
	web3
} from './config/contracts-config.js';
import { formatTimestamp } from "./utils/timeHelper";
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
		const result = jsonFileToKeys(jsonObj, password);
		const callOptions = {
			from: result.address,
			gas: gasConfig.hotelReservation.create
		};

		const reservationStartDateFormatted = formatTimestamp(reservationStartDate);
		const reservationEndDateFormatted = formatTimestamp(reservationEndDate);
		const hotelReservationIdHex = web3.utils.utf8ToHex(hotelReservationId);
		const hotelIdHex = web3.utils.utf8ToHex(hotelId);
		const roomIdHex = web3.utils.utf8ToHex(roomId);

		await validateReservationParams(HotelReservationContract,
			jsonObj,
			password,
			hotelReservationIdHex,
			reservationCostLOC,
			reservationStartDate,
			reservationEndDate,
			daysBeforeStartForRefund,
			refundPercentage,
			hotelIdHex,
			roomIdHex,
			callOptions);

		await validateLocBalance(result.address, reservationCostLOC);

		await approveContract(result.address, result.privateKey, reservationCostLOC, HotelReservationContract._address);

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
			result.address,
			result.privateKey,
			gasConfig.hotelReservation.create,
			funcData
		);

		return new Promise(function (resolve, reject) {
			web3.eth.sendSignedTransaction(signedData)
				.once('transactionHash', function (transactionHash) {
					console.log(transactionHash);
					resolve({
						transactionHash
					});
				});
		});
	}
}