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
		refundPercentage,
		hotelId,
		roomId,
		numberOfTravelers) {

		const reservationStartDateFormatted = formatStartDateTimestamp(reservationStartDate);
		const reservationEndDateFormatted = formatEndDateTimestamp(reservationEndDate);
		const hotelReservationIdHex = ethers.utils.toUtf8Bytes(hotelReservationId);
		const hotelIdHex = ethers.utils.toUtf8Bytes(hotelId);
		const roomIdHex = ethers.utils.toUtf8Bytes(roomId);
		let wallet = await ethers.Wallet.fromEncryptedWallet(jsonObj, password);
		const gasPrice = await getGasPrice();

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
			numberOfTravelers);

		await validateLocBalance(wallet.address, reservationCostLOC, wallet, gasConfig.hotelReservation.create);

		await fundTransactionAmountIfNeeded(
			wallet.address,
			wallet.privateKey,
			gasConfig.hotelReservation.create
		);


		await approveContract(wallet, reservationCostLOC, HotelReservationFactoryContract.address, gasPrice);

		let HotelReservationFactoryContractWithWalletInstance = await HotelReservationFactoryContractWithWallet(wallet);
		const overrideOptions = {
			gasLimit: gasConfig.hotelReservation.create,
			gasPrice: gasPrice
		};

		const createReservationTxHash = await HotelReservationFactoryContractWithWalletInstance.createHotelReservation(hotelReservationIdHex,
			reservationCostLOC,
			reservationStartDateFormatted,
			reservationEndDateFormatted,
			daysBeforeStartForRefund,
			refundPercentage,
			hotelIdHex,
			roomIdHex,
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

		const hotelReservationIdHex = ethers.utils.toUtf8Bytes(hotelReservationId);

		const reservation = await this.getReservation(hotelReservationId);

		validateCancellation(reservation._refundPercentage,
			reservation._daysBeforeStartForRefund,
			reservation._reservationStartDate,
			reservation._customerAddress,
			wallet.address);

		let HotelReservationFactoryContractWithWalletInstance = await HotelReservationFactoryContractWithWallet(wallet);
		const overrideOptions = {
			gasLimit: gasConfig.hotelReservation.cancel,
			gasPrice: gasPrice
		};

		const cancelReservationTxHash = await HotelReservationFactoryContractWithWalletInstance.cancelHotelReservation(hotelReservationIdHex, overrideOptions);

		return cancelReservationTxHash;
	}

	static async getReservation(hotelReservationId) {
		const hotelReservationContractAddress = await validateBookingExists(hotelReservationId);
		const hotelReservationContract = initHotelReservationContract(hotelReservationContractAddress);
		const reservation = await hotelReservationContract.getHotelReservation();
		return reservation;
	}
}