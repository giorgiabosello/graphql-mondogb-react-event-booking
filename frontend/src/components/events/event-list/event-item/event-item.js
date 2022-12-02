import { useContext } from 'react'
import AuthContext from '../../../../context/auth-context'
import './event-item.css'

const EventItem = ({ _id: eventId, title, price, date, creator: { _id: creatorId }, onDetail }) => {
	const { userId } = useContext(AuthContext)
	return (
		<li key={eventId} className="events__list-item">
			<div>
				<h1>{title}</h1>
				<h2>
					${price} - {new Date(date).toLocaleDateString('it-IT')}
				</h2>
			</div>
			<div>
				{userId === creatorId ? (
					<p>Your the owner of this event.</p>
				) : (
					<button onClick={() => onDetail(eventId)}>View Details</button>
				)}
			</div>
		</li>
	)
}

export default EventItem
