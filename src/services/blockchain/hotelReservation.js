import {
	HotelReservationFactoryContract,
	initHotelReservationContract,
	HotelReservationFactoryContractWithWallet
} from "./config/contracts-config";
import {
	validateBookingExists,
	validateCancellation,
	validateReservationParams
} from "./validators/reservation-validators";
import {
	formatEndDateTimestamp,
	formatStartDateTimestamp,
} from "./utils/timeHelper";
import {
	validateLocBalance
} from "./validators/token-validators";
import {
	approveContract
} from "./utils/approveContract";
import {
	fundTransactionAmountIfNeeded,
	getGasPrice
} from "./utils/ethFuncs"
import ethers from 'ethers';

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
		refundPercentages,
		hotelId,
		roomId,
		numberOfTravelers) {

		const reservationStartDateFormatted = formatStartDateTimestamp(reservationStartDate);
		const reservationEndDateFormatted = formatEndDateTimestamp(reservationEndDate);
		const hotelReservationIdBytes = ethers.utils.toUtf8Bytes(hotelReservationId);
		const hotelIdBytes = ethers.utils.toUtf8Bytes(hotelId);
		const roomIdBytes = ethers.utils.toUtf8Bytes(roomId);
		let wallet = await ethers.Wallet.fromEncryptedWallet(jsonObj, password);
		const gasPrice = await getGasPrice();

		await validateReservationParams(jsonObj,
			password,
			hotelReservationIdBytes,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentages,
			hotelIdBytes,
			roomIdBytes,
			numberOfTravelers);
		await validateLocBalance(wallet.address, reservationCostLOC, wallet, gasConfig.hotelReservation.create);

		await fundTransactionAmountIfNeeded(
			wallet.address,
			wallet.privateKey,
			gasConfig.hotelReservation.create
		);


		await approveContract(wallet, reservationCostLOC, HotelReservationFactoryContract.address, gasPrice);

		let HotelReservationFactoryContractWithWalletInstance = HotelReservationFactoryContractWithWallet(wallet);

		const overrideOptions = {
			gasLimit: gasConfig.hotelReservation.create,
			gasPrice: gasPrice
		};

		const createReservationTxHash = await HotelReservationFactoryContractWithWalletInstance.createHotelReservation(hotelReservationIdBytes,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentages,
			hotelIdBytes,
			roomIdBytes,
			numberOfTravelers,
			overrideOptions
		);

		return createReservationTxHash;
	}

	static async cancelReservation(jsonObj,
		password,
		hotelReservationId) {

		if (!jsonObj || !password || !hotelReservationId) {
			throw new Error(errors.INVALID_PARAMS);
		}
		let wallet = await ethers.Wallet.fromEncryptedWallet(jsonObj, password);
		const gasPrice = await getGasPrice();
		await fundTransactionAmountIfNeeded(
			wallet.address,
			wallet.privateKey,
			gasConfig.hotelReservation.cancel
		);

		const hotelReservationIdBytes = ethers.utils.toUtf8Bytes(hotelReservationId);

		const reservation = await this.getReservation(hotelReservationId);

		validateCancellation(reservation._refundPercentages,
			reservation._daysBeforeStartForRefund,
			reservation._reservationStartDate,
			reservation._customerAddress,
			wallet.address);

		let HotelReservationFactoryContractWithWalletInstance = HotelReservationFactoryContractWithWallet(wallet);
		const overrideOptions = {
			gasLimit: gasConfig.hotelReservation.cancel,
			gasPrice: gasPrice
		};

		const cancelReservationTxHash = await HotelReservationFactoryContractWithWalletInstance.cancelHotelReservation(hotelReservationIdBytes, overrideOptions);

		return cancelReservationTxHash;
	}

	static async getReservation(hotelReservationId) {
		const hotelReservationContractAddress = await validateBookingExists(hotelReservationId);
		const hotelReservationContract = initHotelReservationContract(hotelReservationContractAddress);
		const reservation = await hotelReservationContract.getHotelReservation();
		return reservation;
	}
}