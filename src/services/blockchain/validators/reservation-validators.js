import { formatStartDateTimestamp, formatTimestamp } from "../utils/timeHelper";
import { HotelReservationContract } from "../config/contracts-config";

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
		!roomId
	) {
		throw new Error(ERROR.INVALID_PARAMS);
	}

	if (refundPercentage * 1 > 100 || refundPercentage * 1 < 0) {
		throw new Error(ERROR.INVALID_REFUND_AMOUNT);
	}

	await validateBookingDoNotExists(HotelReservationContract, hotelReservationId, callOptions);

	validateReservationDates(reservationStartDate, reservationEndDate);

	return true;

}

export async function validateBookingDoNotExists(HotelReservationContract, hotelReservationId, callOptions) {
	let bookingAddress = await HotelReservationContract.methods.getHotelReservationContractAddress(
		hotelReservationId,
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

