import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { Container, Nav } from "./styled-components";

//Actions
import { logoutUser } from "../../actions/authActions";


const Navbar = ({
	auth: { user }	
}) => {


		return (
			<Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
				<Container className="navbar-brand h1 mb-0 text-large font-medium">
					Finance Your Money
				</Container>
				
				<Container className="navbar-nav ml-auto">
				{user != null ? (
					<Container className="user-detail-section">
					<span className="pr-2">{`Hi, ${user.name}`}</span>
					<span className="img-container">
						<img
							//src={UserImg}
							className="rounded-circle"
							alt=""
						/>
					</span>
					<button
						type="button"
						className="btn btn-info black"
						onClick={logoutUser()}>
						Logout
					</button>
				</Container>
				) : (
					<Container className="user-detail-section">
					<button
						type="button"
						className="btn btn-info black"
						onClick={logoutUser()}>
						Login
					</button>
				</Container>
				)}
				</Container>
			</Nav>
		);
	}

	Navbar.propTypes = {
		logoutUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
	};

	const mapStateToProps = (state) => ({
		auth: state.auth,
	});

	export default connect(mapStateToProps, {
		logoutUser,
	})(Navbar);