import React from 'react'
import { render } from '@testing-library/react'

import AutocompleteInput from './index'

describe('AutocompleteInput', () => {
  it('should render with a small size bar', () => {
    const options = {
      onSelect: () => `''`,
      loading: false,
      value: [],
      size: 'small',
    }

    const input = {
      onChange: () => `''`,
      onSearch: () => `''`,
      onClear: () => `''`,
      placeholder: '',
      value: '',
    }

    const { asFragment } = render(
      <AutocompleteInput input={input} options={options} />
    )

    const result = asFragment()

    expect(result).toMatchSnapshot()
  })

  it('should render with a regular size bar', () => {
    const options = {
      onSelect: () => `''`,
      loading: false,
      value: [],
      size: 'regular',
    }

    const input = {
      onChange: () => `''`,
      onSearch: () => `''`,
      onClear: () => `''`,
      placeholder: '',
      value: '',
    }

    const { asFragment } = render(
      <AutocompleteInput input={input} options={options} />
    )

    const result = asFragment()

    expect(result).toMatchSnapshot()
  })

  it('should render with a large size bar', () => {
    const options = {
      onSelect: () => `''`,
      loading: false,
      value: [],
      size: 'large',
    }

    const input = {
      onChange: () => `''`,
      onSearch: () => `''`,
      onClear: () => `''`,
      placeholder: '',
      value: '',
    }

    const { asFragment } = render(
      <AutocompleteInput input={input} options={options} />
    )

    const result = asFragment()

    expect(result).toMatchSnapshot()
  })

  it('should render with a regular size bar when prop is absent', () => {
    const options = {
      onSelect: () => `''`,
      loading: false,
      value: [],
    }

    const input = {
      onChange: () => `''`,
      onSearch: () => `''`,
      onClear: () => `''`,
      placeholder: '',
      value: '',
    }

    const { asFragment } = render(
      <AutocompleteInput input={input} options={options} />
    )

    const result = asFragment()

    expect(result).toMatchSnapshot()
  })

  it('should render a regular version of search bar if size prop isnt small, regular or large', () => {
    const options = {
      onSelect: () => `''`,
      loading: false,
      value: [],
      size: 'medium',
    }

    const input = {
      onChange: () => `''`,
      onSearch: () => `''`,
      onClear: () => `''`,
      placeholder: '',
      value: '',
    }

    const { asFragment } = render(
      <AutocompleteInput input={input} options={options} />
    )

    const result = asFragment()

    expect(result).toMatchSnapshot()
  })
})
