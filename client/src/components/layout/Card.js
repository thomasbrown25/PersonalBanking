import React, { Component } from "react";
import { Container, Nav } from "./styled-components";
import UserImg from "../../img/profile_pic.jpg";

export const Card = (props) => {
	return (
		<Container className="col-lg-3 col-sm-6 is-light-text mb-4">
			<Container className="card grid-card is-card-dark">
				<Container className="card-heading">
					<Container className="is-dark-text-light letter-spacing text-small">
						{props.children}
					</Container>
				</Container>

				<Container className="card-value pt-4 text-x-large">
					<span className="text-large pr-1">$</span>
					{props.value}
				</Container>
			</Container>
		</Container>
	);
};
