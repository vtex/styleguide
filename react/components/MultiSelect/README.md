Simple Use

```js
initialState = {
  selected: ["Green", "Red"]
};
options = [
  "White",
  "Black",
  "Grey",
  "Yellow",
  "Red",
  "Blue",
  "Green",
  "Brown",
  "Pink",
  "Orange",
  "Purple",
  "Dark-blue",
  "Dark-red",
  "Light-blue"
];
<MultiSelect
  label="Colors"
  options={options}
  onChange={selected => setState({ selected })}
  selected={state.selected}
/>;
```

Simulating API

```js
initialState = {
  selected: ["Green", "Red"]
};
options = [
  "White",
  "Black",
  "Grey",
  "Yellow",
  "Red",
  "Blue",
  "Green",
  "Brown",
  "Pink",
  "Orange",
  "Purple",
  "Dark-blue",
  "Dark-red",
  "Light-blue"
];
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
async function filter(term) {
  await sleep(1000);
  return options
    .filter(tag => tag.toLowerCase().includes(term.toLowerCase()))
    .filter(tag => !state.selected.includes(tag));
}
<MultiSelect
  emptyState={term => {
    return `Your search for "${term}" did not find any results. Did you mean: "<span class="fw5">pink</span>"?`;
  }}
  filter={filter}
  label="Colors"
  onChange={selected => setState({ selected })}
  selected={state.selected}
/>;
```
