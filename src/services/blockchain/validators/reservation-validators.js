import { addDaysToNow, formatStartDateTimestamp, formatTimestamp } from "../utils/timeHelper";
import { HotelReservationFactoryContract } from "../config/contracts-config";
import { validateAddress } from "./base-validators";
import { web3 } from './../config/contracts-config.js';

const ERROR = require('./../config/errors.json');

export async function validateReservationParams(jsonObj,
                                                password,
                                                hotelReservationId,
                                                reservationCostLOC,
                                                reservationStartDate,
                                                reservationEndDate,
                                                daysBeforeStartForRefund,
                                                refundPercentage,
                                                hotelId,
                                                roomId,
                                                numberOfTravelers,
                                                callOptions) {
	if (!jsonObj ||
		!password ||
		!hotelReservationId ||
		!reservationCostLOC ||
		reservationCostLOC * 1 < 0 ||
		!reservationStartDate ||
		!reservationEndDate ||
		!daysBeforeStartForRefund ||
		daysBeforeStartForRefund * 1 < 0 ||
		!refundPercentage ||
		!hotelId ||
		!roomId ||
		!numberOfTravelers
	) {
		throw new Error(ERROR.INVALID_PARAMS);
	}

	if (refundPercentage * 1 > 100 || refundPercentage * 1 < 0) {
		throw new Error(ERROR.INVALID_REFUND_AMOUNT);
	}

	await validateBookingDoNotExists(hotelReservationId, callOptions);

	validateReservationDates(reservationStartDate, reservationEndDate);

	return true;

}

export async function validateBookingExists(hotelReservationId) {
	await isHotelReservationIdEmpty(hotelReservationId);
	const bookingContractAddress = await HotelReservationFactoryContract.methods.getHotelReservationContractAddress(
		web3.utils.utf8ToHex(hotelReservationId)
	).call();

	if (bookingContractAddress === '0x0000000000000000000000000000000000000000') {
		throw ERROR.MISSING_BOOKING;
	}

	return bookingContractAddress;
}

function isHotelReservationIdEmpty(hotelReservationId) {
	if (hotelReservationId === '') {
		throw ERROR.MISSING_RESERVATION_ID;
	}
}

export async function validateBookingDoNotExists(hotelReservationId, callOptions) {
	let bookingAddress = await HotelReservationFactoryContract.methods.getHotelReservationContractAddress(
		hotelReservationId
	).call(callOptions);

	if (bookingAddress === '0x0000000000000000000000000000000000000000') {
		return true;
	}

	throw new Error(ERROR.EXISTING_BOOKING);
}

export function validateReservationDates(reservationStartDate, reservationEndDate) {
	const nowUnixFormatted = formatStartDateTimestamp(new Date().getTime() / 1000 | 0);
	if (reservationStartDate < nowUnixFormatted) {
		throw new Error(ERROR.INVALID_PERIOD_START);
	}

	if (reservationStartDate >= reservationEndDate) {
		throw new Error(ERROR.INVALID_PERIOD);
	}

	return true;
}

export function validateCancellation(refundPercentage,
                                     daysBeforeStartForRefund,
                                     reservationStartDate,
                                     customerAddress,
                                     senderAddress) {
	// ToDo: Handel new validation about daysBeforeStartForRefund and customerAddress to _customerAddress fix
	const daysBeforeStartForRefundAddedToNow = addDaysToNow(+daysBeforeStartForRefund).getTime() / 1000 | 0;
	refundPercentage = +refundPercentage;
	reservationStartDate = +reservationStartDate;
	customerAddress = customerAddress.toLowerCase();
	senderAddress = senderAddress.toLowerCase();
	if (refundPercentage <= 0 ||
		daysBeforeStartForRefundAddedToNow > reservationStartDate ||
		customerAddress !== senderAddress) {
		throw new Error(ERROR.INVALID_CANCELLATION);
	}

	return true;
}