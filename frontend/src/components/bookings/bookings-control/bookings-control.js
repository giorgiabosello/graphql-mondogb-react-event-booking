import { func, string } from 'prop-types'
import './bookings-control.css'

const BookingsControl = ({ activeOutputType, onChange }) => {
	return (
		<div className="bookings-control">
			<button className={activeOutputType === 'list' ? 'active' : ''} onClick={() => onChange('list')}>
				List
			</button>
			<button className={activeOutputType === 'chart' ? 'active' : ''} onClick={() => onChange('chart')}>
				Chart
			</button>
		</div>
	)
}

BookingsControl.propTypes = {
	activeOutputType: string.isRequired,
	onChange: func.isRequired,
}

export default BookingsControl
