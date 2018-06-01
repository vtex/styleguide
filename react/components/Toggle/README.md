A toggle is a special case of a checkbox. Like its counterpart it conveys a _binary choice_, but with a particular ON/OFF interpretation of that choice. Toggles are often independent from each other, differently than checkboxes that might be grouped.

Use a toggle whenever you're dealing with a feature that can be activated or deactivated.

## Default

```js
initialState = {
  checked: true,
  checked2: false,
  checkedSmall1: true,
  checkedSmall2: false,
}
;<div>
  <div className="dib">
    <Toggle
      label="Label"
      checked={state.checked}
      onChange={e => setState(prevState => ({ checked: !prevState.checked }))}
    />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Label"
      checked={state.checked2}
      onChange={e => setState(prevState => ({ checked2: !prevState.checked2 }))}
    />
  </div>
  <br />
  <div className="mt6 dib">
    <Toggle
      label="Label (small)"
      size="small"
      checked={state.checkedSmall1}
      onChange={e =>
        setState(prevState => ({ checkedSmall1: !prevState.checkedSmall1 }))
      }
    />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Label (small)"
      size="small"
      checked={state.checkedSmall2}
      onChange={e =>
        setState(prevState => ({ checkedSmall2: !prevState.checkedSmall2 }))
      }
    />
  </div>
</div>
```

## Semantic

The field this toggle controls has more meaning than just on/off: it carries an inherent right/wrong judgement of its controlled value.

Use this toggle if turning it ON is highly recommended from your application standpoint. In doubt, use the Default one.

Example: when configuring Security settings, you might want to signal to the user that turning ON double-authentication feature is highly recommended.

**To do:** make this more visual with an actual interface example that demonstrates this.

```js
initialState = {
  checked: true,
  checked2: false,
  checkedSmall1: true,
  checkedSmall2: false,
}
;<div>
  <div className="dib">
    <Toggle
      label="Label"
      semantic
      checked={state.checked}
      onChange={e => setState(prevState => ({ checked: !prevState.checked }))}
    />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Label"
      semantic
      checked={state.checked2}
      onChange={e => setState(prevState => ({ checked2: !prevState.checked2 }))}
    />
  </div>
  <br />
  <div className="mt6 dib">
    <Toggle
      label="Label (small)"
      size="small"
      semantic
      checked={state.checkedSmall1}
      onChange={e =>
        setState(prevState => ({ checkedSmall1: !prevState.checkedSmall1 }))
      }
    />
  </div>
  <br />
  <div className="mt2 dib">
    <Toggle
      label="Label (small)"
      size="small"
      semantic
      checked={state.checkedSmall2}
      onChange={e =>
        setState(prevState => ({ checkedSmall2: !prevState.checkedSmall2 }))
      }
    />
  </div>
</div>
```

## Disabled

```js
<div>
  <div className="dib">
    <Toggle disabled checked label="Label" />
  </div>
  <br />
  <div className="dib">
    <Toggle disabled label="Label" />
  </div>
</div>
```
