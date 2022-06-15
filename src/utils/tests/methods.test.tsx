import { stockSymbols } from '../constants'
import { calculateStockRating, generateUniqueSocialMediaCount } from '../methods'

const fakeDateGenerator = (index: number) => {
	const date = new Date()
	date.setDate(date.getDate() - index)
	return date.toLocaleDateString()
}

describe('methods.ts', () => {
	describe('calculateStockRating', () => {
		it('should return 1 to buy', () => {
			const currentItem = { symbol: 'DFS', price: 78, date: new Date().toLocaleDateString() }
			const mockSymbol = [
				{ symbol: 'DFS', price: 100, date: fakeDateGenerator(0) },
				{ symbol: 'DFS', price: 100, date: fakeDateGenerator(1) },
				{ symbol: 'DFS', price: 100, date: fakeDateGenerator(2) }
			]
			const mockData = generateUniqueSocialMediaCount('DFS', ['Twitter'])
			mockData[mockData.length - 1].count = 200
			mockData[mockData.length - 2].count = 100

			const actual = calculateStockRating(currentItem, mockData, mockSymbol)

			expect(actual).toBeInstanceOf(Number)
		})
	})
})
