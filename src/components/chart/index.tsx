import React, { Component, FC, useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

const LineChart = ({ stockData }: any) => {
	const [transformedData, setTransfromedData] = useState<any>({})

	const getX = (x: any) => {
		console.log(x)
	}

	const handleTransformStockData = () => {
		if (!stockData) return

		const extractedDate = []
		const extractedPrice = []

		for (let index = 0; index < stockData.length; index++) {
			const element = stockData[index]
			extractedDate.push(element.date)
			extractedPrice.push(element.price)
		}

		setTransfromedData({ extractedDate, extractedPrice })
	}

	useEffect(() => {
		handleTransformStockData()
	}, [stockData])

	return (
		<Plot
			data={[
				{
					x: transformedData.extractedDate,
					y: transformedData.extractedPrice,
					type: 'scatter',
					hovertemplate: `%{y} $`
				}
			]}
			layout={{ height: 500, title: 'Stock market graph' }}
		/>
	)
}

export default LineChart
