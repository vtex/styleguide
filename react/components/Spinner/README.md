#### A Spinner is a way of showing the user something is being loaded, either because of a user action or not. It should be used for short, indeterminate loading times.

### 👍 Dos

- Mind the color contrast with the background.
- For very long waiting times (10+ seconds) try giving some feedback about the progress that is being made in the background.
- If you're showing a spinner in a button make sure to make it disabled while loading.
- For very recurrent actions where the probability of success if very high consider using an optimistic approach. E.g.: a message being sent.

### 👎 Don'ts

- Only use spinners for loading times of more than 1 second. Less than that it'll cause more harm than good.
- Avoid showing too many spinners at a given time in the same screen, it'll look overwhelming.

### Related components

- If you can assess the progression of the task prefer a <a href="#/Components/Display/ProgressBar">Progress Bar</a>.
- For whole screen loading try using Skeleton Pages (work in progress).

#### Default

```js
<Spinner />
```

#### Custom color and size

```js
<span className="dib c-muted-1">
  <Spinner color="currentColor" size={20} />
</span>
```
