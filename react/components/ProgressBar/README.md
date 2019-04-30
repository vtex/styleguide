#### A ProgressBar should be used to represent the linear progression of some workflow by representing which steps are completed, in progress or yet to do.

### 👍 Dos
- The steps should be used in this order: "Completed", "In Progress" and "To Do". You are free to choose the quantity of steps.
- Steps should be grouped together by their type.

### 👎 Don'ts
- Don't put more than one "in progress" step.
- Don't put steps of a different type in between steps of the same type (e.g. ["Completed", "In Progress", "Completed"]). Remember that the component represents a linear progression.

Simple ProgressBar example
```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar steps={["completed", "inProgress", "toDo"]}/>
  <span className="vtex-input__label mb3 w-100"> Second Action in Progress</span>
</div>
```

ProgressBar with all steps to do

```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar steps={["toDo", "toDo", "toDo", "toDo"]}/>
  <span className="vtex-input__label mb3 w-100"> First Action Ready to Begin</span>
</div>
```

Completed ProgressBar example

```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar steps={["completed", "completed"]}/>
  <span className="vtex-input__label mb3 w-100"> All completed</span>
</div>
```

Slim ProgressBar example

```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar slim steps={["completed", "inProgress", "toDo"]}/>
  <span className="vtex-input__label mb3 w-100"> Second Action in Progress</span>
</div>
```

ProgressBar with a single step in progress example

```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar steps={["inProgress"]}/>
  <span className="vtex-input__label mb3 w-100"> In Progress</span>
</div>
```
Simple danger ProgressBar example

```jsx
<div style={{width: "300px", height: "40px"}}>
  <ProgressBar danger steps={["completed", "inProgress", "toDo"]}/>
  <span className="vtex-input__label mb3 w-100"> Late Second Action in Progress</span>
</div>
```
