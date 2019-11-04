### Default

```jsx
  const Button = require('../Button').default
  const ProgressComponent = () => {
    const [value, setValue] = React.useState(10)
    const increment = () => {
      if (value < 100) {
        setValue(value + 10)
      }
    }
    const decrement = () => {
      if (value > 0) {
        setValue(value - 10)
      }
    }
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

### Completed

```jsx
  <Progress percent={100} />
```
