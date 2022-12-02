import { createContext } from 'react'

const AuthContext = createContext({
	token: null,
	userId: null,
	// eslint-disable-next-line no-unused-vars
	login: (token, userId, tokenExpiration) => {},
	logout: () => {},
})

export default AuthContext
