/* eslint-disable no-useless-catch */
import DataLoader from 'dataloader'
import { dateToString } from '../../helpers/date'
import Event from '../../models/event'
import User from '../../models/user'

const eventLoader = new DataLoader((eventIds) => events(eventIds))
const userLoader = new DataLoader((userIds) => User.find({ _id: { $in: userIds } }))

export const events = async (eventIds) => {
	try {
		const events = await Event.find({ _id: { $in: eventIds } })
		// sort events by date
		events.sort((a, b) => new Date(b.date) - new Date(a.date))
		return events.map((event) => transformEvent(event))
	} catch (err) {
		throw err
	}
}

export const singleEvent = async (eventId) => {
	try {
		const event = await eventLoader.load(eventId.toString())
		return event
	} catch (err) {
		throw err
	}
}

export const user = async (userId) => {
	try {
		const user = await userLoader.load(userId.toString())
		return {
			...user._doc,
			_id: user.id,
			createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
		}
	} catch (err) {
		throw err
	}
}

export const transformEvent = (event) => ({
	...event._doc,
	_id: event.id,
	date: dateToString(event._doc.date),
	creator: () => user(event.creator),
})

export const transformBooking = (booking) => ({
	...booking._doc,
	_id: booking.id,
	user: () => user(booking._doc.user),
	event: () => singleEvent(booking._doc.event),
	createdAt: dateToString(booking._doc.createdAt),
	updatedAt: dateToString(booking._doc.updatedAt),
})
