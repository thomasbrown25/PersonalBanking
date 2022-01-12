import React from "react";
import RcTable from "rc-table";

export const BalanceTable = (props) => {
	const columns = [
		{
			title: "Checking",
			dataIndex: "checking",
			key: "checking",
			width: 130
		},
		{
			title: "Balance",
			dataIndex: "balance",
			key: "balance",
			width: 100
		}
	];

	const data = [
		{
			key: 1,
			checking: "Primary Account",
			balance: "102"
		}
	];

	return <RcTable columns={columns} data={props.data} tableLayout="auto" />;
};
