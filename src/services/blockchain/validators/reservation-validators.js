import { NotificationManager } from 'react-notifications';
import { BigNumber } from 'bignumber.js';
import { validateEtherAddress } from "./ether-validators";
import { formatTimestamp } from "../utils/timeHelper";

const ERROR = require('./../config/errors.json');

export async function validateReservationParams(contract,
                                                jsonObj,
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
		NotificationManager.error(ERROR.INVALID_PARAMS);
		throw new Error(ERROR.INVALID_PARAMS);
	}

	if (refundPercentage * 1 > 100 || refundPercentage * 1 < 0) {
		NotificationManager.error(ERROR.INVALID_REFUND_AMOUNT);
		throw new Error(ERROR.INVALID_REFUND_AMOUNT);
	}

	await checkExistingBooking(contract, hotelReservationId, callOptions);

	validateReservationDates(reservationStartDate, reservationEndDate);

	return true;

}

export async function checkExistingBooking(contract, hotelReservationId, callOptions) {
	let bookingAddress = await contract.methods.getHotelReservationContractAddress(
		hotelReservationId,
	).call(callOptions);

	if (bookingAddress === '0x0000000000000000000000000000000000000000') {
		return true;
	}

	NotificationManager.error(ERROR.EXISTING_BOOKING);
	throw new Error(ERROR.EXISTING_BOOKING);
}

export function validateReservationDates(reservationStartDate, reservationEndDate) {
	const nowUnixFormatted = formatTimestamp(+new Date().getTime() / 1000);
	if (reservationStartDate < nowUnixFormatted) {
		NotificationManager.error(ERROR.INVALID_PERIOD_START);
		throw new Error(ERROR.INVALID_PERIOD_START);
	}

	if (reservationStartDate >= reservationEndDate) {
		NotificationManager.error(ERROR.INVALID_PERIOD);
		throw new Error(ERROR.INVALID_PERIOD);
	}

	return true;
}

