import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth-context'
import './header.css'

const Header = () => (
	<AuthContext.Consumer>
		{({ token, logout }) => (
			<header className="header">
				<div className="header__logo">
					<h1>EasyEvent</h1>
				</div>
				<nav className="header__items">
					<ul>
						{!token && (
							<li>
								<NavLink to="/auth">Authenticate</NavLink>
							</li>
						)}
						<li>
							<NavLink to="/events">Events</NavLink>
						</li>
						{token && (
							<>
								<li>
									<NavLink to="/bookings">Bookings</NavLink>
								</li>
								<li>
									<button onClick={logout}>Logout</button>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		)}
	</AuthContext.Consumer>
)

export default Header
