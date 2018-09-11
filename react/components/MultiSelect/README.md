```js
initialState = {
  searchTerm: "",
  selectedTags: ["Green", "Red"]
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
  .filter(tag => !state.selectedTags.includes(tag));
<MultiSelect
  label="Colors"
  onSearchChange={e => setState({ searchTerm: e.target.value })}
  onSelectTag={tag =>
    setState(prevState => ({
      selectedTags: [...prevState.selectedTags, selectableList[tag]]
    }))
  }
  onUnselectTag={index =>
    setState(prevState => ({
      selectedTags: prevState.selectedTags.filter((tag, i) => i !== index)
    }))
  }
  options={selectableList}
  selectedTags={state.selectedTags}
/>;
```
