import { useCallback, useContext, useEffect, useState } from 'react'
import Bookings from '../components/bookings/bookings'
import Spinner from '../components/spinner/spinner'
import AuthContext from '../context/auth-context'
import { postApiCall } from '../helpers/api'

const BookingsPage = () => {
	const { token } = useContext(AuthContext)

	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [outputType, setOutputType] = useState('list')

	const fetchBookings = useCallback(() => {
		setIsLoading(true)
		const requestBody = {
			query: `
				query {
					bookings {
						_id
						createdAt
						event {
							_id
							title
							date
						}
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
			onSuccess: (resData) => {
				setBookings(resData.data.bookings)
			},
			onEnd: () => {
				setIsLoading(false)
			},
		})
	}, [token])

	useEffect(() => {
		fetchBookings()
	}, [fetchBookings])

	const deleteBookingHandler = (bookingId) => {
		setIsLoading(true)
		const requestBody = {
			query: `
				mutation cancelBooking ($id: ID!) {
					cancelBooking(bookingId: $id) {
						_id
						title
					}
				}
			`,
			variables: {
				id: bookingId,
			},
		}

		postApiCall({
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			onSuccess: () => {
				setBookings(bookings.filter((bookings) => bookings._id !== bookingId))
			},
			onEnd: () => {
				setIsLoading(false)
			},
		})
	}

	const changeOutputTypeHandler = (outputType) => {
		setOutputType(outputType)
	}

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<Bookings
					bookings={bookings}
					onDelete={deleteBookingHandler}
					outputType={outputType}
					onChange={changeOutputTypeHandler}
				/>
			)}
		</>
	)
}

export default BookingsPage
