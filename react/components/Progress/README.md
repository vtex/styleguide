### Default

```jsx
  const Button = require('../Button').default
  const ProgressComponent = () => {
    const [value, setValue] = React.useState(10)
    const increment = () => setValue(value + 10)
    const decrement = () => setValue(value - 10)
    return (
      <div>
        <Progress value={value} max={100} />
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
  <Progress value={25} max={100} showInfo={false} />
```

### Completed

```jsx
  <Progress value={100} max={100} />
```
