import * as authResolver from './auth'
import * as bookingResolver from './booking'
import * as eventsResolver from './events'

const rootResolver = {
	...authResolver,
	...eventsResolver,
	...bookingResolver,
}

export default rootResolver
