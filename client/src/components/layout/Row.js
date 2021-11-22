import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styled-components";

export const Row = (props) => {
	return <Container className="row">{props.children}</Container>;
};
