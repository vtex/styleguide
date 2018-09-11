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
  onSearch={e => setState({ searchTerm: e.target.value })}
  onSelect={tag =>
    setState(prevState => ({
      selected: [...prevState.selected, selectableList[tag]]
    }))
  }
  onUnselect={index =>
    setState(prevState => ({
      selected: prevState.selected.filter((tag, i) => i !== index)
    }))
  }
  options={selectableList}
  selected={state.selected}
/>;
```
