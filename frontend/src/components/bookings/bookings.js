import { array, func, string } from 'prop-types'
import BookingsChart from './bookings-chart/booking-chart'
import BookingsControl from './bookings-control/bookings-control'
import BookingList from './bookings-list/bookings-list'

const Bookings = ({ bookings, onDelete, outputType, onChange }) => {
	return (
		<div>
			<BookingsControl activeOutputType={outputType} onChange={onChange} />
			{outputType === 'list' ? (
				<BookingList bookings={bookings} onDelete={onDelete} />
			) : (
				<BookingsChart bookings={bookings} />
			)}
		</div>
	)
}

Bookings.propTypes = {
	bookings: array.isRequired,
	onDelete: func.isRequired,
	outputType: string,
	onChange: func.isRequired,
}

export default Bookings
