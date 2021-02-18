Simple slider

```jsx
<Slider
  onChange={([value]) => {}}
  min={0}
  max={99}
  step={1}
  disabled={false}
  defaultValues={[0]}
  alwaysShowCurrentValue={false}
  formatValue={a => a + 1}
/>
```

Range slider

```jsx
<Slider
  onChange={([leftValue, rightValue]) => {}}
  min={0}
  max={99}
  step={1}
  disabled={false}
  defaultValues={[0, 50]}
  alwaysShowCurrentValue={false}
  formatValue={a => a + 1}
  range
/>
```

Slider with programmatically controlled values

```jsx
<Slider
  onChange={(values: number[]) => {
    setValues({
      left: values[0],
      right: values[1],
    })
  }}
  min={0}
  max={99}
  step={1}
  disabled={false}
  alwaysShowCurrentValue={false}
  formatValue={a => a + 1}
  values={[values.left, values.right]}
  range
/>
```
