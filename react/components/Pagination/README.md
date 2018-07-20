Default

```js
<Pagination
  rowsOptions={[5, 10, 15, 20]}
  currentItemFrom={1}
  currentItemTo={10}
  textOf="of"
  textShowRows="show rows"
  totalItems={32}
  onRowsChange={(event, value) => {
    console.log('event: ', event, 'value: ', value)
  }}
  onNextClick={event => {
    console.log(event)
  }}
  onPrevClick={event => {
    console.log(event)
  }}
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
  onNextClick={event => {
    console.log(event)
  }}
  onPrevClick={event => {
    console.log(event)
  }}
/>
```
