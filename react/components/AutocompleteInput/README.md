#### Autocomplete is something great

### Basic

```jsx
import { useState } from 'react'

import User from '../icon/User'

const allUsers = ['Ana', { value: 1, label: 'Bruno' }, 'Creuza']

const UsersAutocomplete = () => {
  const [term, setTerm] = useState('')

  const options = {
    onSelect: console.log,
    icon: <User size={14} />,
    value: allUsers.filter(user =>
      typeof user === 'string'
        ? user.toLowerCase().includes(term.toLowerCase())
        : user.label.toLowerCase().includes(term.toLowerCase())
    ),
  }

  const input = {
    onChange: setTerm,
    onSearch: console.log,
    onClear: () => setTerm(''),
    placeholder: 'Search user',
    value: term,
  }
  return <AutocompleteInput input={input} options={options} />
}

;<UsersAutocomplete />
```
