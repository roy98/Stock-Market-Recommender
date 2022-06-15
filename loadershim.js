/**
 * This file is needed for Jest to work.
 *
 * See: https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
 */
import 'reflect-metadata'

global.___loader = {
	enqueue: jest.fn()
}
