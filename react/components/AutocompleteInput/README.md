#### AutocompleteInput is a search input which, enhanced with a suggestions pop-up, gives the user a more complete search experience when needed.

### 👍 Dos

- Help the user avoid errors.
- Semantically similar phrases or words but grammarly different should appear once. E.g.: "Dress" and "Dresses".
- Highlight the suggestions.

### 👎 Don'ts

- Exceed 10 suggestions. 6 is a great number of suggestions.

#### Simple Autocomplete mocking server responses

```jsx
import { uniq } from 'lodash'
import { useState, useRef } from 'react'

const allUsers = [
  'Ana Clara',
  'Ana Luiza',
  { value: 1, label: 'Bruno' },
  'Carlos',
  'Daniela',
]

const UsersAutocomplete = () => {
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null)

  const options = {
    onSelect: (...args) => console.log('onSelect: ', ...args),
    loading,
    value: !term.length
      ? []
      : allUsers.filter(user =>
          typeof user === 'string'
            ? user.toLowerCase().includes(term.toLowerCase())
            : user.label.toLowerCase().includes(term.toLowerCase())
        ),
  }

  const input = {
    onChange: term => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onSearch: (...args) => console.log('onSearch:', ...args),
    onClear: () => setTerm(''),
    placeholder: 'Search user... (e.g.: Ana)',
    value: term,
  }
  return <AutocompleteInput input={input} options={options} />
}

;<UsersAutocomplete />
```

#### Show search history

```jsx
import { uniq } from 'lodash'
import { useState, useRef } from 'react'

const allUsers = [
  'Ana Clara',
  'Ana Luiza',
  { value: 1, label: 'Bruno' },
  'Carlos',
  'Daniela',
]

const UsersAutocomplete = () => {
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastSearched, setLastSearched] = useState([])
  const timeoutRef = useRef(null)

  const options = {
    onSelect: (...args) => console.log('onSelect: ', ...args),
    loading,
    value: !term.length
      ? []
      : allUsers.filter(user =>
          typeof user === 'string'
            ? user.toLowerCase().includes(term.toLowerCase())
            : user.label.toLowerCase().includes(term.toLowerCase())
        ),
    // --- This is what makes the Last Searched Terms work!
    // This can be stored anywhere the dev wants. To be persistent, for example.
    lastSearched: {
      value: lastSearched,
      label: 'Last searched users',
      onChange: option =>
        option && setLastSearched(uniq([...lastSearched, option])),
    },
  }

  const input = {
    onChange: term => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onSearch: (...args) => console.log('onSearch:', ...args),
    onClear: () => setTerm(''),
    placeholder: 'Search user... (e.g.: Ana)',
    value: term,
  }
  return <AutocompleteInput input={input} options={options} />
}

;<UsersAutocomplete />
```

#### Custom option rendering

```jsx
import { uniq } from 'lodash'
import { useState, useRef } from 'react'

import User from '../icon/User'
import Search from '../icon/Search'

const allUsers = [
  'Ana',
  { value: 1, label: 'Ana Clara' },
  { value: 2, label: 'Ana Luiza', caption: 'VTEX' },
  { value: 3, label: 'Bruno' },
]

const CustomOption = props => {
  const { roundedBottom, searchTerm, value, key, selected, onClick } = props
  const [highlightOption, setHighlightOption] = useState(false)

  const renderOptionHighlightedText = () => {
    const highlightableText = typeof value === 'string' ? value : value.label
    const index = highlightableText
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase())
    if (index === -1) {
      return highlightableText
    }
    const prefix = highlightableText.substring(0, index)
    const match = highlightableText.substr(index, searchTerm.length)
    const suffix = highlightableText.substring(index + match.length)
    return (
      <span className="truncate">
        <span className="fw7">{prefix}</span>
        {match}
        <span className="fw7">{suffix}</span>
      </span>
    )
  }

  const buttonClasses = `bn w-100 tl pointer pa4 f6 ${
    roundedBottom ? 'br2 br--bottom' : ''
  } ${highlightOption || selected ? 'bg-muted-5' : 'bg-base'}`

  const icon = typeof value === 'string' ? <Search size={14} /> : <User size={14} />

  // --- This is a good practice. Use <button />.
  return (
    <button
      key={key}
      className={buttonClasses}
      onFocus={() => setHighlightOption(true)}
      onMouseEnter={() => setHighlightOption(true)}
      onMouseLeave={() => setHighlightOption(false)}
      onClick={onClick}>
      <div className="flex items-center">
        <span className="mr3 c-muted-2 flex pt1">{icon}</span>
        <span className="pr2">{renderOptionHighlightedText()}</span>
        {typeof value !== 'string' && (
          <div className="t-mini c-muted-1">{value.caption}</div>
        )}
      </div>
    </button>
  )
}

const UsersAutocomplete = () => {
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastSearched, setLastSearched] = useState([])
  const timeoutRef = useRef(null)

  const options = {
    onSelect: (...args) => console.log('onSelect: ', ...args),
    loading,
    value: !term.length
      ? []
      : allUsers.filter(user =>
          typeof user === 'string'
            ? user.toLowerCase().includes(term.toLowerCase())
            : user.label.toLowerCase().includes(term.toLowerCase())
        ),
    lastSearched: {
      value: lastSearched,
      label: 'Last searched users',
      onChange: option =>
        option && setLastSearched(uniq([...lastSearched, option])),
    },
    // --- This is what makes the custom option work!
    renderOption: props => <CustomOption {...props} />,
  }

  const input = {
    onChange: term => {
      if (term) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(term)
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(term)
      }
    },
    onSearch: (...args) => console.log('onSearch:', ...args),
    onClear: () => setTerm(''),
    placeholder: 'Search user... (e.g.: Ana)',
    value: term,
  }
  return <AutocompleteInput input={input} options={options} />
}

;<UsersAutocomplete />
```
