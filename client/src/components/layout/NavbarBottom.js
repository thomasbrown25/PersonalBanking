import React, { Component } from "react";
import { Container, Nav } from "./styled-components";

class NavbarBottom extends Component {
	constructor() {
		super();
		this.state = {
			items: [],
			dropdownOptions: [],
			selectedValue: null,
			amRevenue: null,
			ebRevenue: null,
			etRevenue: null,
			totalRevenue: null,
			productViews: null,
			purchaseRate: " ",
			checkoutRate: " ",
			abandonedRate: " ",
			ordersTrendStore: []
		};
	}

	render() {
		return (
			<Nav className="navbar fixed-top nav-secondary black is-light-text" style={{ padding: "0px 0px 0px 15px" }}>
				<Container className="text-medium">Dashboard</Container>
				<Container className="navbar-nav ml-auto">
					{/* <Dropdown
						className="pr-2 custom-dropdown"
						options={this.state.dropdownOptions}
						onChange={this.updateDashboard}
						value={this.state.selectedValue}
						placeholder="Select an option"
					/> */}
				</Container>
			</Nav>
		);
	}
}

export default NavbarBottom;
