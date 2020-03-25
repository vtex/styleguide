import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import ModalDialog from '.'

describe('ModalDialog', () => {
  it('should have a default export', () => {
    expect(typeof ModalDialog).toBe('function')
  })
})
