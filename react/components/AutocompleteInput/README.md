#### Autocomplete is something great

### Simulating server

```jsx
import { uniq } from 'lodash'
import { useState, useRef } from 'react'

import User from '../icon/User'

const allUsers = ['Ana', { value: 1, label: 'Bruno' }, 'Creuza']

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
    placeholder: 'Search user',
    value: term,
  }
  return <AutocompleteInput input={input} options={options} />
}

;<UsersAutocomplete />
```
