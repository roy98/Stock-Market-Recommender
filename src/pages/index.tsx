import * as React from 'react'
import LineChart from '../components/chart'
import Header from '../components/ui/header'
import { stockSymbols as mockSymbols, socialMedias as mockMedias } from '../utils/constants'
import {
	calculateStockRating,
	generateMockData,
	generateUniqueSocialMediaCount
} from '../utils/methods'
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
	const [selectedSymbol, setSelectedSymbol] = React.useState<string>('')
	const [selectedMedia, setSelectedMedia] = React.useState<string>('')
	const [stockToPreview, setStockToPreview] = React.useState<any[]>([])
	const [mediaCounts, setMediaCounts] = React.useState<any[]>([])
	const [stockSymbols, setStockSymbols] = React.useState<any[]>(mockSymbols)
	const [socialMedias, setSocialMedias] = React.useState<any[]>(mockMedias)
	const [newMediaValue, setNewMediaValue] = React.useState<string>('')

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
		const score = calculateStockRating(item, mediaCounts, stockToPreview)
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

	const handleDeleteSelectedMedia = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		if (socialMedias.length <= 1) {
			alert('You cannot delete this media now.')
			return
		}

		const filteredMediaInMock = socialMedias.filter((m: any) => m !== selectedMedia)
		const filteredMediaInData = mediaData.filter((m: any) => m.media !== selectedMedia)

		setSocialMedias(filteredMediaInMock)
		setMediaData(filteredMediaInData)
		setSelectedMedia(filteredMediaInMock[0])

		return
	}

	const handleCreateNewMedia = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		if (!newMediaValue) return

		const existingMedia = socialMedias.findIndex((el) => el === newMediaValue) !== -1

		if (existingMedia) {
			alert('This media already exist!')
			return
		}

		setSocialMedias([...socialMedias, newMediaValue])

		const res = generateUniqueSocialMediaCount(newMediaValue, stockSymbols)

		setMediaData([...mediaData, ...res])

		setTimeout(() => {
			setNewMediaValue('')
		}, 1000)
	}

	const getNewDateFormated = () => {
		const date = new Date()

		return `${date.getFullYear()}-${
			date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth()
		}-${date.getDate() < 9 ? '0' + date.getDate() : date.getDate()}`
	}

	return (
		<>
			<div>
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
								<button onClick={handleDeleteSelectedMedia} className='danger'>
									Delete Media
								</button>
							</div>
							<div className='form-group'>
								<input type='date' value={getNewDateFormated()} disabled />
							</div>
						</form>
						<div className='table-container'>
							<form>
								<div className='form-group'>
									<input
										type='text'
										value={newMediaValue}
										onChange={(event) => setNewMediaValue(event.target.value)}
										placeholder='Create a media'
									/>
									<button onClick={handleCreateNewMedia} className='success'>
										Add new media
									</button>
								</div>
							</form>
							<table id='table-stock'>
								<thead>
									<tr id='heading'>
										<th>Stock</th>
										<th>Price ($)</th>
										<th>Date</th>
										<th>Rating</th>
									</tr>
								</thead>
								<tbody>
									{stockToPreview.map((item: any, index: number) => (
										<tr key={index}>
											<td>{item.symbol}</td>
											<td>{item.price}$</td>
											<td>{item.date}</td>
											<td>
												<strong>{getRating(item)}</strong>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
							<LineChart stockData={stockToPreview} />
						</div>
					</section>
				</main>
			</div>
		</>
	)
}

export default IndexPage
