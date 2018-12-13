#### A Layout...

### 👍 Dos

- ...

### 👎 Don'ts

- ...

### Related components

- ...

Centered

```js
<Layout pageHeader={<PageHeader title="Page title centered" />}>
  <Card>
    <h3>Lorem Ipsum</h3>
    <p>
      It is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a
      type specimen book.
    </p>
  </Card>
</Layout>
```

Full width

```js
<Layout
  fullWidth
  pageHeader={
    <PageHeader
      title="Page title fullwidth"
      linkLabel="A link">
      <Button variation="primary">Primary</Button>
    </PageHeader>
  }>
  <Card>
    <h3>Lorem Ipsum</h3>
    <p>
      It has survived not only five centuries, but also the leap into electronic
      typesetting, remaining essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </p>
  </Card>
</Layout>
```
