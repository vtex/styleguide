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
  label="Colors"
  onChange={selected => setState({ selected: [...selected] })}
  onSearch={term =>
    selectableList
      .filter(tag => tag.toLowerCase().includes(term.toLowerCase()))
      .filter(tag => !state.selected.includes(tag))
  }
  selected={state.selected}
/>;
```
