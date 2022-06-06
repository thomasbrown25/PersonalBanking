import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//CSS
import "../../table.css";
import "../../assets/css/dashboard.css";

//Actions
import { logoutUser } from "../../actions/authActions";
import { getAccounts, addAccount } from "../../actions/accountActions";
import { getExpensesByMonth } from "../../actions/expenseActions";
import { createToken } from "../../actions/linkActions";

//Components
import LinkToken from "./LinkToken";
import Accounts from "./Accounts";
import Spinner from "./Spinner";
import { Container } from "../layout/styled-components";
import { Row } from "../layout/Row";
import { Card } from "../layout/Card";
import ByMonth from "../transactions/ByMonth";
import { BalanceTable } from "../accounts/BalanceTable";

//Moment
import moment from "moment";

//isEmpty
import isEmpty from "is-empty";

//Fusion
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import "../layout/charts-theme";

//CanvasJS
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

ReactFC.fcRoot(FusionCharts, Charts);

const Dashboard = ({
	getAccounts,
	addAccount,
	createToken,
	logoutUser,
	getExpensesByMonth,
	auth: { user },
	plaid: { accounts, account, transactions },
	link: { linkToken, accessToken, accessTokenLoaded },
	expenses: { expense },
	accountData
}) => {
	useEffect(() => {
		createToken();
	}, [createToken]);
	useEffect(() => {
		buildExpensesChart();
	}, [buildExpensesChart]);
	useEffect(() => {
		buildAccountData();
	}, [buildAccountData]);

	//set to help development mode and skip linking bank account
	const skipLink = false;

	//make call to get expenses by month
	const buildExpensesChart = () => {
		let month = moment().month();
		month = moment()
			.month(month)
			.format("MM");
		const year = moment().year();

		const monthAndYear = {
			month,
			year,
			accessToken
		};

		if (!isEmpty(month) && !isEmpty(year) && !isEmpty(accessToken)) {
			console.log("building expense chart..");
			console.log(month + year + accessToken);
			getExpensesByMonth(monthAndYear);
		}
	};

	const buildAccountData = () => {
		const token = { token: accessToken }

		if (!token)
		return;
		
		getAccounts(accessToken);

		let data = [];
		let key = 1
		accounts.forEach(account => {
			data.push({key: key,
				checking: account.name,
				balance: account.balances.current})
				key++;
		});
		accountData = data
	}



	return (
		<Fragment>
			{!accessToken && !skipLink ? (
				<LinkToken token={linkToken} accessToken={accessToken} />
			) : accessToken && !accessTokenLoaded ? (
				<Spinner />
			) : (
				<Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
					{/* row 1 - revenue */}
					<Row>
						<BalanceTable data={accountData} />
					</Row>
					{/* row 2 - conversion */}
					<Row>
						<Card value={45}>Total Spent for the Month</Card>
						<Card value={45}>Revenue from Amazon</Card>
						<Card value={45}>Revenue from Ebay</Card>
						<Card value={45}>Revenue from Etsy</Card>
					</Row>
					{/* row 3 - conversion */}
					<Row>
						<Card value={45}>Total Revenue</Card>
						<Card value={45}>Revenue from Amazon</Card>
						<Card value={45}>Revenue from Ebay</Card>
						<Card value={45}>Revenue from Etsy</Card>
					</Row>
					{/* row r - conversion */}
					<Row>
						<ByMonth expense={expense} />
					</Row>
				</Container>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	getAccounts: PropTypes.func.isRequired,
	addAccount: PropTypes.func.isRequired,
	createToken: PropTypes.func.isRequired,
	getExpensesByMonth: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	plaid: PropTypes.object.isRequired,
	link: PropTypes.object.isRequired,
	expenses: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	plaid: state.plaid,
	link: state.link,
	expenses: state.expenses
});

export default connect(mapStateToProps, {
	logoutUser,
	getAccounts,
	addAccount,
	createToken,
	getExpensesByMonth
})(Dashboard);
