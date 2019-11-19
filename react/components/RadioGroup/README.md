#### A Radio Group represents a need for the user to make a choice among a few offered options.

### 👍 Dos

- Keep the list of options short. More than 6 options might start looking weird.
- Labels should be clear and if possible short.
- Mind the order of the options. Some good rule of thumbs for ordering are: most to least frequently used, simplest to most complex, least to most risk.
- Use a "None" option if you need an unselected state.
- Consider adding an "Other" option if needed, maybe in conjunction with a Text Input to capture the user need.

### 👎 Don'ts

- Don't offer overlapping options, they should be clearly mutually exclusive.

### Related components

- Consider using a <a href="#/Components/Forms/Checkbox">Checkbox</a> if you need the user to select more than one option.
- Consider using a <a href="#/Components/Forms/Dropdown">Dropdown</a> if you have several options and they don't need much explanation.
- Consider using a <a href="#/Components/Forms/SelectableCard">Selectable Card</a> if you prefer your options to be displayed horizontally or more detailed.

Default

```js
initialState = { value: 'cyan' }
;<RadioGroup
  hideBorder
  name="colors"
  options={[
    { value: 'cyan', label: 'Cyan' },
    { value: 'magenta', label: 'Magenta' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'key', label: 'Black' },
  ]}
  value={state.value}
  onChange={e => setState({ value: e.currentTarget.value })}
/>
```

One option disabled

```js
<RadioGroup
  hideBorder
  name="radioGroupExample2"
  options={[
    {
      value: 'value1',
      label: (
        <div>
          <div className="b">L</div>
          <div className="c-muted-1">Lightness</div>
        </div>
      ),
    },
    {
      value: 'value2',
      label: (
        <div>
          <div className="b">a*</div>
          <div className="c-muted-1">Green–Red</div>
        </div>
      ),
      disabled: true,
    },
    {
      value: 'value3',
      label: (
        <div>
          <div className="b">b*</div>
          <div className="c-muted-1">Blue–Yellow</div>
        </div>
      ),
    },
  ]}
  value="value1"
  onChange={() => {}}
/>
```

Entire group disabled

```js
<RadioGroup
  hideBorder
  name="radioGroupExample3"
  disabled
  options={[
    { value: 'value1', label: 'Hue' },
    { value: 'value2', label: 'Saturation' },
    { value: 'value3', label: 'Value' },
  ]}
  value="value1"
  onChange={() => {}}
/>
```

With optional border

```js
<RadioGroup
  name="radioGroupExample3"
  options={[
    { value: 'value1', label: 'Hue' },
    { value: 'value2', label: 'Saturation' },
    { value: 'value3', label: 'Value' },
  ]}
  value="value1"
  onChange={() => {}}
/>
```
