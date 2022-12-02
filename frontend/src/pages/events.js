import { useContext, useEffect, useRef, useState } from 'react'
import Backdrop from '../components/backdrop/backdrop'
import EventList from '../components/events/event-list/event-list'
import Modal from '../components/modal/modal'
import Spinner from '../components/spinner/spinner'
import AuthContext from '../context/auth-context'
import { postApiCall } from '../helpers/api'
import './events.css'

const EventsPage = () => {
	const [creating, setCreating] = useState(false)
	const [events, setEvents] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)
	const titleElRef = useRef()
	const priceElRef = useRef()
	const dateElRef = useRef()
	const descriptionElRef = useRef()

	const { token, userId } = useContext(AuthContext)

	const fetchEvents = () => {
		setIsLoading(true)
		const requestBody = {
			query: `
				query {
					events {
					_id
					title
					description
					date
					price
					creator {
						_id
						email
					}
				}
			}
			`,
		}
		postApiCall({
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			},
			onSuccess: (resData) => {
				setEvents(resData.data.events)
			},
			onError: () => {
				setIsLoading(false)
			},
			onEnd: () => {
				setIsLoading(false)
			},
		})
	}

	useEffect(() => {
		fetchEvents()
		return () => {}
	}, [])

	const startCreateEventHandler = () => {
		setCreating(true)
	}

	const modalConfirmHandler = () => {
		setCreating(false)
		const title = titleElRef.current.value
		const price = +priceElRef.current.value
		const date = dateElRef.current.value
		const description = descriptionElRef.current.value

		if (title.trim().length === 0 || price < 0 || date.trim().length === 0 || description.trim().length === 0) {
			return
		}

		const requestBody = {
			query: `
				mutation createEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
					createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
						_id
						title
						description
						date
						price
					}
				}
			`,
			variables: {
				title,
				description,
				price,
				date,
			},
		}

		postApiCall({
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			onSuccess: (resData) => {
				const events = [...events, resData.data.createEvent]
				setEvents(events)
			},
		})
	}

	const modalCancelHandler = () => {
		setCreating(false)
		setSelectedEvent(null)
	}

	const showDetailHandler = (eventId) => {
		setSelectedEvent(events.find((e) => e._id === eventId))
	}

	const bookEventHandler = () => {
		if (!token) {
			setSelectedEvent(null)
			return
		}

		const requestBody = {
			query: `
				mutation {
					bookEvent(eventId: "${selectedEvent._id}") {
						_id
						createdAt
						updatedAt
					}
				}
			`,
		}

		postApiCall({
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			onSuccess: () => {
				setSelectedEvent(null)
			},
		})
	}

	return (
		<>
			{(creating || selectedEvent) && <Backdrop />}
			{creating && (
				<Modal
					title="Add Event"
					canCancel
					canConfirm
					onCancel={modalCancelHandler}
					onConfirm={modalConfirmHandler}
					confirmText="Confirm"
				>
					<form>
						<div className="form-control">
							<label htmlFor="title">Title</label>
							<input type="text" id="title" ref={titleElRef} />
						</div>
						<div className="form-control">
							<label htmlFor="price">Price</label>
							<input type="number" id="price" ref={priceElRef} />
						</div>
						<div className="form-control">
							<label htmlFor="date">Date</label>
							<input type="datetime-local" id="date" ref={dateElRef} />
						</div>
						<div className="form-control">
							<label htmlFor="description">Description</label>
							<textarea id="description" rows="4" ref={descriptionElRef} />
						</div>
					</form>
				</Modal>
			)}
			{selectedEvent && (
				<Modal
					title={selectedEvent.title}
					canCancel
					canConfirm
					onCancel={modalCancelHandler}
					onConfirm={bookEventHandler}
					confirmText={token ? 'Book' : 'Confirm'}
				>
					<h1>{selectedEvent.title}</h1>
					<h2>
						${selectedEvent.price} -{new Date(selectedEvent.date).toLocaleDateString('it-IT')}
					</h2>
					<p>{selectedEvent.description}</p>
				</Modal>
			)}
			{token && (
				<div className="events-control">
					<p>Share your own Events!</p>
					<button onClick={startCreateEventHandler}>Create Event</button>
				</div>
			)}
			{isLoading ? <Spinner /> : <EventList events={events} authUserId={userId} onViewDetail={showDetailHandler} />}
		</>
	)
}

export default EventsPage
