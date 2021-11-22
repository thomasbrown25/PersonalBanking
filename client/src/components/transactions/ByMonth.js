import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { Container } from "../layout/styled-components";

//Moment
import moment from "moment";

//isEmpty
import isEmpty from "is-empty";

//Fusion Charts
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
//import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ByMonth = ({
	auth: { user },
	link: { linkToken, accessToken, accessTokenLoaded },
	expense
}) => {
	// useEffect(() => {
	// 	buildExpensesChart();
	// }, [buildExpensesChart]);

	let expenseData = [];
	let chartData = [];
	let month = moment().month();
	month = moment()
		.month(month)
		.format("MM");

	const pushChartData = () => {
		//build chart data
		if (
			expense.response != null &&
			Array.isArray(expense.response.transactions)
		) {
			expense.response.transactions.forEach((tran) => {
				let obj = {
					label: tran.category[0],
					value: tran.amount
				};
				expenseData.push(obj);
			});
			console.log(expense.response);
		}
	};

	//Call method to build chart data
	if (
		expense.response != null &&
		Array.isArray(expense.response.transactions)
	) {
		pushChartData();
	} else {
		console.log("response is null");
	}

	//Merge similar categories in expenseData
	const mergeKeyData = (data) => {
		let output = data;

		data.forEach(function(dataItem) {
			let i = 0;
			if (dataItem.label === output[i]) {
			}
		});
	};

	chartData = mergeKeyData(expenseData);
	console.table(chartData);

	// Create a JSON object to store the chart configurations
	const chartConfigs = {
		type: "column2d", // The chart type
		width: "100%", // Width of the chart
		height: "100%", // Height of the chart
		dataFormat: "json", // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				caption: `Spending Categories for the Month of ${moment()
					.month(month)
					.subtract(1, "month")
					.format("MMMM")}`,
				//subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
				xAxisName: "Categories", //Set the x-axis name
				yAxisName: "Amount $", //Set the y-axis name
				numberSuffix: "$",
				theme: "candy" //Set the theme for your chart
			},
			// Chart Data - from step 2
			data: chartData
		}
	};

	return (
		<Container className="col-md-12 mb-4">
			<Container className="card is-card-dark chart-card">
				<Container className="chart-container large full-height">
					<ReactFC {...chartConfigs} />
				</Container>
			</Container>
		</Container>
	);
};

ByMonth.propTypes = {
	auth: PropTypes.object.isRequired,
	link: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	link: state.link
});

export default connect(mapStateToProps, null)(ByMonth);
