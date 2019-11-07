## Steps

### 👍 Dos

- The steps should be used in this order: "Completed", "In Progress" and "To Do". You are free to choose the quantity of steps.
- Steps should be grouped together by their type.

### 👎 Don'ts

- Don't put more than one "in progress" step.
- Don't put steps of a different type in between steps of the same type (e.g. ["Completed", "In Progress", "Completed"]). Remember that the component represents a linear progression.

#### Simple ProgressBar example

Second Action in Progress

```jsx
<Progress type="steps" steps={['completed', 'inProgress', 'toDo']} />
```

#### ProgressBar with all steps to do

First Action Ready to Begin

```jsx
<Progress type="steps" steps={['toDo', 'toDo', 'toDo', 'toDo']} />
```

#### Completed ProgressBar example

All completed

```jsx
<Progress type="steps" steps={['completed', 'completed']} />
```

#### Slim ProgressBar example

Second Action in Progress

```jsx
<Progress type="steps" slim steps={['completed', 'inProgress', 'toDo']} />
```

#### ProgressBar with a single step in progress example

In Progress

```jsx
<Progress type="steps" steps={['inProgress']} />
```

Simple danger ProgressBar example

```jsx
<div>
  <Progress type="steps" danger steps={['completed', 'inProgress', 'toDo']} />
  <span className="vtex-input__label mb3 w-100">
    {' '}
    Late Second Action in Progress
  </span>
</div>
```

## Line

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
      <Progress type="line" percent={value} />
      <div className="flex mt6">
        <Button onClick={increment} size="small">
          Increment
        </Button>
        <div className="ml3">
          <Button onClick={decrement} size="small">
            Decrement
          </Button>
        </div>
      </div>
    </div>
  )
}

;<ProgressComponent />
```

### Line Completed

```jsx
<Progress percent={100} type="line" />
```
