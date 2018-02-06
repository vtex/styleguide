#### Default with placeholder

```js
<Input htmlProps={{ placeholder: 'Type me…' }} />
```

#### Default value

```js
<Input htmlProps={{ value: '007' }} />
```

#### Disabled

```js
<Input disabled htmlProps={{ placeholder: 'Disabled text' }} />
```

#### Error

```js
<Input error errorMessage="Sorry, the code you provided does not match." />
```

#### Types

**Number, step 2**

```js
<Input htmlProps={{ type: 'number', step: '2' }} placeholder="Numbers only…" />
```

**Date**

```js
<Input htmlProps={{ type: 'date' }} />
```

**File**

```js
<Input htmlProps={{ type: 'file' }} />
```

**Month**

```js
<Input htmlProps={{ type: 'month' }} />
```

**Password**

```js
<Input htmlProps={{ type: 'password' }} />
```

**Time**

```js
<Input htmlProps={{ type: 'time' }} />
```
