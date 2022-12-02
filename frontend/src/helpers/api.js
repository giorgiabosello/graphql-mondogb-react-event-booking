import { API_URL } from './constants'

export const postApiCall = ({ headers, body, onSuccess, onError = null, onEnd = null }) => {
	fetch(API_URL, {
		method: 'POST',
		headers,
		body,
	})
		.then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!')
			}
			return res.json()
		})
		.then((resData) => {
			console.log('[postApiCall] success')
			onSuccess(resData)
		})
		.catch((err) => {
			console.log(err)
			if (onError) {
				onError(err)
			}
		})
		.finally(() => {
			if (onEnd) {
				onEnd()
			}
		})
}
