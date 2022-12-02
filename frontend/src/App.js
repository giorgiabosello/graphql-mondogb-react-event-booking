import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import AuthContext from './context/auth-context'
import AuthPage from './pages/auth'
import BookingsPage from './pages/bookings'
import EventsPage from './pages/events'

const App = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)

	const login = (token, userId) => {
		setToken(token)
		setUserId(userId)
	}

	const logout = () => {
		setToken(null)
		setUserId(null)
	}

	return (
		<BrowserRouter>
			<AuthContext.Provider
				value={{
					token,
					userId,
					login,
					logout,
				}}
			>
				<Header />
				<main className="main-content">
					<Routes>
						<Route path="/" element={!token ? <AuthPage /> : <Navigate to={'/events'} replace />} />
						<Route path="/auth" element={token ? <Navigate to={'/events'} replace /> : <AuthPage />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="/bookings" element={token ? <BookingsPage /> : <Navigate to={'/auth'} replace />} />
					</Routes>
				</main>
			</AuthContext.Provider>
		</BrowserRouter>
	)
}

export default App
