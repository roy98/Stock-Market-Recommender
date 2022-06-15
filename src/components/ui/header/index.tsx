import React, { FC } from 'react'
import { PageProps } from 'gatsby'
import styled from '@emotion/styled'
import './__utils.css'
import StockImage from '../../../images/nav_image.jpg'

const CustomHeader = styled.header`
	top: 0;
	height: auto;
	width: 100%;
`

const Header: FC = () => {
	return (
		<CustomHeader>
			<div className='imgContainer'>
				<img src={StockImage} alt='stock picture' />
				<div className='text-descr'>
					<h2>Stock Rating App</h2>
					<small>Get your market stock ratings here!</small>
				</div>
			</div>
		</CustomHeader>
	)
}

export default Header
