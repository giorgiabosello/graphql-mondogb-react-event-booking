import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Bookings Chart',
		},
	},
}

const BOOKING_BUCKET = {
	Cheap: {
		min: 0,
		max: 100,
		backgroundColor: 'rgba(255, 99, 132, 0.5)',
	},
	Normal: {
		min: 100,
		max: 200,
		backgroundColor: 'rgba(151,187,205,0.5)',
	},
	Expensive: {
		min: 200,
		max: 100000000,
		backgroundColor: 'rgba(53, 162, 235, 0.5)',
	},
}

const BookingsChart = ({ bookings }) => {
	const bookingBucket = () => {
		const chartData = { labels: [], datasets: [] }
		let values = []
		for (const bucket in BOOKING_BUCKET) {
			const filteredBookingsCount = bookings.reduce((prev, current) => {
				if (current.event.price >= BOOKING_BUCKET[bucket].min && current.event.price < BOOKING_BUCKET[bucket].max) {
					return prev + 1
				} else {
					return prev
				}
			}, 0)
			values.push(filteredBookingsCount)
			chartData.labels.push(bucket)
			chartData.datasets.push({
				label: bucket,
				backgroundColor: BOOKING_BUCKET[bucket].backgroundColor,
				data: values,
			})
			values = [...values]
			values[values.length - 1] = 0
		}

		return chartData
	}

	return (
		<div className="bookings-chart">
			<p>Bookings Chart</p>
			<Bar data={bookingBucket()} options={options} />
		</div>
	)
}

BookingsChart.propTypes = {}

export default BookingsChart
