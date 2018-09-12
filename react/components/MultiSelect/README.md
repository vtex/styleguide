```js
initialState = {
  searchTerm: "",
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
]
  .filter(tag => tag.toLowerCase().includes(state.searchTerm.toLowerCase()))
  .filter(tag => !state.selected.includes(tag));
<MultiSelect
  label="Colors"
  onChange={selected => setState({ selected: [...selected] })}
  onSearch={e => setState({ searchTerm: e.target.value })}
  options={selectableList}
  selected={state.selected}
/>;
```
