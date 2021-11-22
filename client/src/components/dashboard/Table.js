import React from "react";
import RcTable from "rc-table";

export const Table = (props) => {
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			width: 100
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			width: 200
		},
		{
			title: "Category",
			dataIndex: "category",
			key: "category",
			width: 100
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			width: 100
		},
		{
			title: "Current Balance",
			dataIndex: "currentBalance",
			key: "currentBalance",
			width: 100
		}
	];

	const data = [
		{
			key: 1,
			date: "Feb 22, 2021",
			description: "Zelle Transfer",
			category: "Transfer",
			amount: "110",
			currentBalance: "102"
		}
	];

	return <RcTable columns={columns} data={data} tableLayout="auto" />;
};
