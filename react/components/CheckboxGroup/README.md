#### A CheckboxGroup represents a group of related binary choices in the format of checkboxes.

### 👍 Dos

- Initialize it with a default value that makes sense to your needs.
- Use a text label for the checkbox groups, which should clearly inform that this checkbox checks or uncheks all the other checkboxes.
- Use a text label for each of the inner checkboxes, which should be intuitive and provide sufficient context for the user take that decision.

### 👎 Don'ts

- Don't use negative labels because they are harder to interpret.
- Don't implement an "autosave" behavior: checkboxes should always require the use of a button (like "SAVE" or "OK") to commit the choice.

### Related components

- If the inner checkboxes have no relation between them consider using single <a href="#/Components/Forms/Checkbox">Checkboxes</a>.

Simple Group

```js
initialState = { checkedMap: {
    check1: {label: "Filter 1", checked: true}, 
    check2: {label: "Filter 2", checked: false}, 
    check3: {label: "Filter 3", checked: false}
   }
}
;<div>
  <CheckboxGroup
    name="simpleCheckboxGroup"
    label="All Filters"
    id="simple"
    value="simple"
    checkedMap={state.checkedMap}
    onGroupChange={newCheckedMap => {
      setState({ checkedMap: newCheckedMap })
    }}
  />
</div>
```

Disabled Group

```js
initialState = { checkedMap: {
    check1: {label: "Filter 1", checked: true}, 
    check2: {label: "Filter 2", checked: false}, 
    check3: {label: "Filter 3", checked: false}
   }
}
;<div>
  <CheckboxGroup
    name="disabledCheckboxGroup"
    disabled
    label="All Filters"
    id="disabled"
    value="disabled"
    checkedMap={state.checkedMap}
    onGroupChange={newCheckedMap => {
      setState({ checkedMap: newCheckedMap })
    }}
  />
</div>

```

Without Padding

```js
initialState = { checkedMap: {
    check1: {label: "Filter 1", checked: true}, 
    check2: {label: "Filter 2", checked: false}, 
    check3: {label: "Filter 3", checked: false}
   }
}
;<div>
  <CheckboxGroup
    padded={false}
    name="withoutPaddingCheckboxGroup"
    label="All Filters"
    id="withoutPadding"
    value="withoutPadding"
    checkedMap={state.checkedMap}
    onGroupChange={newCheckedMap => {
      setState({ checkedMap: newCheckedMap })
    }}
  />
</div>
```
