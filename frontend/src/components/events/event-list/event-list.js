import { array, func } from 'prop-types'
import EventItem from './event-item/event-item'
import './event-list.css'

const EventList = ({ events, onViewDetail }) => {
	return (
		<ul className="event__list">
			{events?.map((event) => (
				<EventItem key={event._id} {...event} onDetail={onViewDetail} />
			))}
		</ul>
	)
}

EventList.defaultProps = {
	events: [],
	onViewDetail: () => {},
}

EventList.propTypes = {
	events: array,
	onViewDetail: func,
}

export default EventList
