Default

```js
<Pagination
  rowsOptions={[
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { label: 20, value: 20 },
  ]}
  currentItemFrom={1}
  currentItemTo={10}
  textOf="of"
  textShowRows="show rows"
  totalItems={32}
  onRowsChange={() => {}}
  onNextClick={() => {}}
  onPrevClick={() => {}}
/>
```

Without row options

```js
<Pagination
  currentItemFrom={10}
  currentItemTo={20}
  textOf="of"
  textShowRows="show rows"
  totalItems={32}
  onNextClick={() => {}}
  onPrevClick={() => {}}
/>
```
