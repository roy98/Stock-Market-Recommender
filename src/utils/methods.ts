import { stockSymbols, socialMedias } from './constants'
import { css } from '@emotion/react'

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
			const stockPrice = randomize(50, 450)
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
				const count = randomize(200, 5000)
				const resultItem = { media, symbol: stk, count, date: date.toLocaleDateString() }
				mediaCounts.push(resultItem)
			}
		}
	}

	return mediaCounts
}

const generateMockData = () => {
	const stocks = randomStock()
	const medias = randomSocialMediaCount()

	return { stocks, medias }
}

const calculateStockRating = (currentItem: any, socialMediaCounts: any[]) => {
	const currentDateMediaIndex = socialMediaCounts.findIndex((el) => el.date === currentItem.date)

	if (
		socialMediaCounts[currentDateMediaIndex].count >
		(socialMediaCounts[currentDateMediaIndex + 1]?.count || 0)
	) {
		return 1
	} else if (
		socialMediaCounts[currentDateMediaIndex].count >
		(socialMediaCounts[currentDateMediaIndex - 1]?.count || 0)
	) {
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

export { generateMockData, makeClasses, joinClasses, calculateStockRating }
