import { useContext, useRef, useState } from 'react'
import AuthContext from '../context/auth-context'
import { postApiCall } from '../helpers/api'
import './auth.css'

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true)
	const emailRef = useRef()
	const passwordRef = useRef()

	const { login } = useContext(AuthContext)

	const submitHandler = (event) => {
		event.preventDefault()
		const email = emailRef.current.value
		const password = passwordRef.current.value

		if (email.trim().length === 0 || password.trim().length === 0) {
			return
		}

		let requestBody = {
			query: `
				query createUser($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						userId
						token
						tokenExpiration
					}
				}
			`,
			variables: {
				email,
				password,
			},
		}

		if (!isLogin) {
			requestBody = {
				query: `
					mutation createUser($email: String!, $password: String!) {
						createUser(userInput: {email: $email, password: $password}) {
							_id
							email
						}
					}
				`,
				variables: {
					email,
					password,
				},
			}
		}

		postApiCall({
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			},
			onSuccess: (resData) => {
				if (resData.data.login.token) {
					login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
				}
			},
		})
	}

	return (
		<form className="auth-form" onSubmit={submitHandler}>
			<div className="form-control">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" ref={emailRef} />
			</div>
			<div className="form-control">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" ref={passwordRef} />
			</div>
			<div className="form-actions">
				<button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
				<button type="button" onClick={() => setIsLogin(!isLogin)}>
					Switch to {isLogin ? 'Signup' : 'Login'}
				</button>
			</div>
		</form>
	)
}

export default AuthPage
