import jwt from 'jsonwebtoken'

const isAuth = (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader) {
		req.isAuth = false
		return next()
	}
	const token = authHeader.split(' ')[1]
	if (!token || token === '') {
		req.isAuth = false
		return next()
	}
	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_KEY_SECRET)
	} catch (err) {
		req.isAuth = false
		return next()
	}
	if (!decodedToken) {
		req.isAuth = false
		return next()
	}
	req.isAuth = true
	req.userId = decodedToken.userId
	next()
}

export default isAuth
