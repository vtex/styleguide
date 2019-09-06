```jsx noeditor
const Alert = require('../Alert').default
;<Alert type="warning">
  This component will be soon deprecated. Please prefer using the{' '}
  <a
    class="mh2 link fw7"
    href="https://styleguide.vtex.com/#/Components/%F0%9F%91%BB%20Experimental/Select">
    Select
  </a>{' '}
  component.
</Alert>
```

#### Like a simple dropdown, but users may select more than one option.

### Related components

For single selection use a <a href="#/Components/Forms/Dropdown">Dropdown</a>.

Simple Use

```js
initialState = {
  selected: [
    { label: 'Green', value: 'green' },
    { label: 'Red', value: 'red' },
  ],
}
options = [
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
  { label: 'Grey', value: 'grey' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Dark-blue', value: 'dark-blue' },
  { label: 'Dark-red', value: 'dark-red' },
  { label: 'Light-blue', value: 'light-blue' },
]
;<div>
  <MultiSelect
    label="Colors"
    options={options}
    onChange={selected => setState({ selected })}
    selected={state.selected}
  />
  <br />
  <MultiSelect
    disabled
    label="Disabled"
    onChange={() => console.log('onChange')}
    placeholder=""
    selected={[
      { label: 'Black', value: 'black' },
      { label: 'Pink', value: 'pink' },
    ]}
  />
</div>
```

Simulating API

```js
initialState = {
  selected: [
    { label: 'Green', value: 'green' },
    { label: 'Red', value: 'red' },
  ],
}
options = [
  { label: 'White', value: 'white' },
  { label: 'Black', value: 'black' },
  { label: 'Grey', value: 'grey' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Brown', value: 'brown' },
  { label: 'Pink', value: 'pink' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Dark-blue', value: 'dark-blue' },
  { label: 'Dark-red', value: 'dark-red' },
  { label: 'Light-blue', value: 'light-blue' },
]
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}
async function filter(term) {
  await sleep(1000)
  return options
    .filter(tag => tag.label.toLowerCase().includes(term.toLowerCase()))
    .filter(tag => {
      for (var i = 0; i < state.selected.length; i++) {
        if (state.selected[i].value === tag.value) {
          return false
        }
      }
      return true
    })
}
;<MultiSelect
  emptyState={term => {
    return `Your search for "${term}" did not find any results. Did you mean: "<span className="fw5">pink</span>"?`
  }}
  filter={filter}
  label="Colors"
  onChange={selected => setState({ selected })}
  selected={state.selected}
/>
```
