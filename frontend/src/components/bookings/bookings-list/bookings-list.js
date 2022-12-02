import './bookings-list.css'

const BookingList = ({ bookings, onDelete }) => {
	return (
		<ul className="bookings__list">
			{bookings?.map((bookings) => (
				<li key={bookings._id} className="bookings__item">
					<div className="bookings__item-data">
						{bookings.event.title} - {new Date(bookings.createdAt).toLocaleDateString('it-IT')}
					</div>
					<div className="bookings__item-actions">
						<button onClick={() => onDelete(bookings._id)}>Cancel</button>
					</div>
				</li>
			))}
		</ul>
	)
}

export default BookingList
