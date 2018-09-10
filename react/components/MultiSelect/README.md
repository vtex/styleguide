```js
initialState = {
  searchTerm: ""
};
<MultiSelect
  label="Colors"
  selectableList={[
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
  ].filter(tag => tag.toLowerCase().includes(state.searchTerm.toLowerCase()))}
  onSearchChange={e => setState({ searchTerm: e.target.value })}
/>;
```
