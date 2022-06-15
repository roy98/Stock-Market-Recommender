import React from 'react'
import renderer from 'react-test-renderer'
import Index from './index'

describe('<Header />', () => {
	it('renders snapshot', () => {
		const tree = renderer.create(<Index />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
