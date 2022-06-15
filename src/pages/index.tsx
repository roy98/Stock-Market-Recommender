import * as React from 'react'
import LineChart from '../components/chart'
import Header from '../components/ui/header'
import { stockSymbols, socialMedias } from '../utils/constants'
import { calculateStockRating, generateMockData } from '../utils/methods'
import './__utils.css'

// styles
const pageStyles = {
	color: '#232129',
	padding: 96
}

console.log()

const IndexPage = () => {
	const [stockData, setStockData] = React.useState<any>([])
	const [mediaData, setMediaData] = React.useState<any>([])
	const [selectedSymbol, setSelectedSymbol] = React.useState('')
	const [selectedMedia, setSelectedMedia] = React.useState('')
	const [stockToPreview, setStockToPreview] = React.useState<any[]>([])
	const [mediaCounts, setMediaCounts] = React.useState<any[]>([])

	const handleFormChange = (type: 'symbol' | 'media', value: string) => {
		switch (type) {
			case 'symbol':
				setSelectedSymbol(value)
				break

			case 'media':
				setSelectedMedia(value)
				break
			default:
				break
		}
	}

	const loadStockToPreview = () => {
		if (!selectedSymbol) return

		const stockResult = stockData.filter((element: any) => element.symbol === selectedSymbol)
		const mediaResult = mediaData.filter(
			(element: any) => element.media === selectedMedia && element.symbol === selectedSymbol
		)

		setStockToPreview(stockResult || [])
		setMediaCounts(mediaResult || [])
	}

	const getRating = (item: any) => {
		const score = calculateStockRating(item, mediaCounts)
		return score === 1 ? 'Buy' : score === -1 ? 'Sell' : 'Hold'
	}

	React.useEffect(() => {
		const data = generateMockData()
		setStockData(data.stocks)
		setMediaData(data.medias)
		setSelectedMedia(data.medias[0].media)
	}, [])

	React.useEffect(() => {
		loadStockToPreview()
	}, [selectedSymbol, selectedMedia])

	return (
		<>
			<title>Rating Stock</title>
			<Header />
			<main style={pageStyles}>
				<section>
					<form className='stock-form'>
						<div className='form-group'>
							<select
								onChange={(event) => {
									handleFormChange('symbol', event.target.value)
								}}
								name='symbol'
								id='symbol'
							>
								<option value=''>Choose a symbol</option>
								{stockSymbols.map((el) => (
									<option key={el} value={el}>
										{el}
									</option>
								))}
							</select>
						</div>
						<div className='form-group'>
							<select
								onChange={(event) => {
									handleFormChange('media', event.target.value)
								}}
								name='media'
								id='media'
							>
								{socialMedias.map((el) => (
									<option key={el} value={el}>
										{el}
									</option>
								))}
							</select>
						</div>
						<div className='form-group'>
							<input type='date' />
						</div>
					</form>
					<table id='table-stock'>
						<thead>
							<tr>
								<th>Stock</th>
								<th>Price</th>
								<th>Date</th>
								<th>Rating</th>
							</tr>
						</thead>
						<tbody>
							{stockToPreview.map((item: any, index: number) => (
								<tr key={index}>
									<td>{item.symbol}</td>
									<td>{item.price}</td>
									<td>{item.date}</td>
									<td>{getRating(item)}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
						<LineChart stockData={stockToPreview} />
					</div>
				</section>
			</main>
		</>
	)
}

export default IndexPage
