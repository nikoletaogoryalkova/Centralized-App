import {
	addDaysToNow,
	formatStartDateTimestamp,
	formatTimestamp
} from "../utils/timeHelper";
import {
	HotelReservationFactoryContract
} from "../config/contracts-config";
import {
	validateAddress
} from "./base-validators";
import ethers from 'ethers';

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
	numberOfTravelers) {
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

	await validateBookingDoNotExists(hotelReservationId);

	validateReservationDates(reservationStartDate, reservationEndDate, daysBeforeStartForRefund);

	return true;

}

export async function validateBookingExists(hotelReservationId) {
	await isHotelReservationIdEmpty(hotelReservationId);
	const bookingContractAddress = await HotelReservationFactoryContract.getHotelReservationContractAddress(
		ethers.utils.toUtf8Bytes(hotelReservationId)
	);
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

export async function validateBookingDoNotExists(hotelReservationId) {
	let bookingAddress = await HotelReservationFactoryContract.getHotelReservationContractAddress(
		hotelReservationId
	);

	if (bookingAddress === '0x0000000000000000000000000000000000000000') {
		return true;
	}

	throw new Error(ERROR.EXISTING_BOOKING);
}

export function validateReservationDates(reservationStartDate, reservationEndDate, daysBeforeStartForRefund) {
	const nowUnixFormatted = formatTimestamp(new Date().getTime() / 1000 | 0);
	if (reservationStartDate < nowUnixFormatted) {
		throw new Error(ERROR.INVALID_PERIOD_START);
	}

	if (reservationStartDate >= reservationEndDate) {
		throw new Error(ERROR.INVALID_PERIOD);
	}
	let day = 60 * 60 * 24;

	if ((nowUnixFormatted + (daysBeforeStartForRefund * day)) > reservationStartDate) {
		throw new Error(ERROR.INVALID_REFUND_DAYS);
	}

	return true;
}

export function validateCancellation(refundPercentage,
	daysBeforeStartForRefund,
	reservationStartDate,
	customerAddress,
	senderAddress) {
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