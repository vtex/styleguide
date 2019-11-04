### Default

```jsx
  const Button = require('../Button').default
  const ProgressComponent = () => {
    const [value, setValue] = React.useState(10)
    const increment = () => setValue(value + 10)
    const decrement = () => setValue(value - 10)
    return (
      <div>
        <Progress percent={value} />
        <div className="flex mt6">
          <Button onClick={increment} size="small">Increment</Button>
          <div className="ml3">
            <Button onClick={decrement} size="small">Decrement</Button>
          </div>
        </div>
      </div>
    )
  };

  <ProgressComponent />
```

### Do not show information

```jsx
  <Progress percent={25} />
```

### Completed

```jsx
  <Progress percent={100} />
```
