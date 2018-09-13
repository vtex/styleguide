```js
initialState = {
  selected: ["Green", "Red"]
};
selectableList = [
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
  emptyState={term => {
    return `Your search for "${term}" did not find any results. Did you mean: "<span class="fw5">pink</span>"?`;
  }}
  label="Colors"
  onChange={selected => setState({ selected })}
  onSearch={term =>
    selectableList
      .filter(tag => tag.toLowerCase().includes(term.toLowerCase()))
      .filter(tag => !state.selected.includes(tag))
  }
  selected={state.selected}
/>;
```
