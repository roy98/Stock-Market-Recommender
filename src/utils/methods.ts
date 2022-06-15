import { stockSymbols, socialMedias } from './constants'
import { css } from '@emotion/react'

const MEDIA_MAX_INTERVAL = 5000
const MEDIA_MIN_INTERVAL = 200

const STOCK_MAX_INTERVAL = 50
const STOCK_MIN_INTERVAL = 450

const randomize = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomStock = () => {
	const stocks = []

	for (let index = 0; index < stockSymbols.length; index++) {
		const symbol = stockSymbols[index]
		for (let dayIndex = 0; dayIndex < 10; dayIndex++) {
			const date = new Date()
			date.setDate(date.getDate() - dayIndex)
			const stockPrice = randomize(STOCK_MIN_INTERVAL, STOCK_MAX_INTERVAL)
			const resultItem = { symbol, price: stockPrice, date: date.toLocaleDateString() }
			stocks.push(resultItem)
		}
	}

	return stocks
}

const randomSocialMediaCount = () => {
	const mediaCounts = []

	for (let index = 0; index < socialMedias.length; index++) {
		const media = socialMedias[index]
		for (let stock = 0; stock < stockSymbols.length; stock++) {
			const stk = stockSymbols[stock]
			for (let dayIndex = 0; dayIndex < 10; dayIndex++) {
				const date = new Date()
				date.setDate(date.getDate() - dayIndex)
				const count = randomize(MEDIA_MIN_INTERVAL, MEDIA_MAX_INTERVAL)
				const resultItem = { media, symbol: stk, count, date: date.toLocaleDateString() }
				mediaCounts.push(resultItem)
			}
		}
	}

	return mediaCounts
}

const generateUniqueSocialMediaCount = (media: string, appStockSymbols: any) => {
	const mediaCounts = []

	for (let stock = 0; stock < appStockSymbols.length; stock++) {
		const stk = appStockSymbols[stock]
		for (let dayIndex = 0; dayIndex < 10; dayIndex++) {
			const date = new Date()
			date.setDate(date.getDate() - dayIndex)
			const count = randomize(200, 5000)
			const resultItem = { media, symbol: stk, count, date: date.toLocaleDateString() }
			mediaCounts.push(resultItem)
		}
	}

	return mediaCounts
}

const generateMockData = () => {
	const stocks = randomStock()
	const medias = randomSocialMediaCount()

	return { stocks, medias }
}

const calculateStockRating = (currentItem: any, socialMediaCounts: any[], stockResult: any[]) => {
	const currentDateMediaIndex = socialMediaCounts.findIndex((el) => el.date === currentItem.date)

	//Last Index Recommender
	if (currentDateMediaIndex === socialMediaCounts.length - 1) {
		if (
			socialMediaCounts[currentDateMediaIndex].count >
				socialMediaCounts[currentDateMediaIndex - 1]?.count &&
			currentItem.price < stockResult[currentDateMediaIndex - 1]?.price
		) {
			return 1
		} else if (
			socialMediaCounts[currentDateMediaIndex].count <
				socialMediaCounts[currentDateMediaIndex - 1]?.count &&
			currentItem.price > stockResult[currentDateMediaIndex - 1]?.price
		) {
			return -1
		} else if (
			socialMediaCounts[currentDateMediaIndex].count >
				socialMediaCounts[currentDateMediaIndex - 1]?.count &&
			currentItem.price > stockResult[currentDateMediaIndex - 1]?.price
		) {
			return 0
		} else {
			return -1
		}
	}

	// Other Index Recommender
	if (
		socialMediaCounts[currentDateMediaIndex].count >
			socialMediaCounts[currentDateMediaIndex + 1]?.count &&
		currentItem.price <= stockResult[currentDateMediaIndex - 1]?.price
	) {
		return 1
	} else if (
		socialMediaCounts[currentDateMediaIndex].count <
			socialMediaCounts[currentDateMediaIndex + 1]?.count &&
		currentItem.price > stockResult[currentDateMediaIndex + 1]?.price
	) {
		return -1
	} else if (
		socialMediaCounts[currentDateMediaIndex].count >
			socialMediaCounts[currentDateMediaIndex + 1]?.count &&
		currentItem.price > stockResult[currentDateMediaIndex + 1]?.price
	) {
		return 0
	} else {
		return -1
	}

	return 0
}

// css-in-js with emotion react
const makeClasses = (list: any) => {
	// TODO: fix Style class typing
	let classes: any = {}

	Object.entries(list).forEach(([key, value]) => {
		assign(classes, { [key]: css(value as any) })
	})

	return classes
}

const joinClasses = (classes: string[]): string => {
	return classes.join(' ')
}

function assign<T, U>(target: T, source: U): asserts target is T & U {
	Object.assign(target, source)
}

export {
	generateMockData,
	makeClasses,
	joinClasses,
	calculateStockRating,
	generateUniqueSocialMediaCount
}
