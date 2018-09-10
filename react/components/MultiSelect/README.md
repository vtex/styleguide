```js
initialState = {
  searchTerm: "",
  selectedTags: ["Green", "Red"]
};
<MultiSelect
  label="Colors"
  onSearchChange={e => setState({ searchTerm: e.target.value })}
  onSelectTag={tag =>
    setState(prevState => ({ selectedTags: [...prevState.selectedTags, tag] }))
  }
  onUnselectTag={tag =>
    setState(prevState => ({
      selectedTags: prevState.selectedTags.filter(i => i !== tag)
    }))
  }
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
  selectedTags={state.selectedTags}
/>;
```
