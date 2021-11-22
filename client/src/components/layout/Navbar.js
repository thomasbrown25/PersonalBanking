import React, { Component } from "react";
import { Container, Nav } from "./styled-components";
import UserImg from "../../img/profile_pic.jpg";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
	render() {
		return (
			<Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
				<Container className="navbar-brand h1 mb-0 text-large font-medium">
					Finance Your Money
				</Container>
				<Container className="navbar-nav ml-auto">
					<Container className="user-detail-section">
						<span className="pr-2">Hi, Thomas</span>
						<span className="img-container">
							<img
								//src={UserImg}
								className="rounded-circle"
								alt=""
							/>
						</span>
						<button
							type="button"
							className="btn btn-info"
							onClick={logoutUser()}>
							Logout
						</button>
					</Container>
				</Container>
			</Nav>
		);
	}
}

export default Navbar;
