#### We built the page layout component in order to establish layout standards across VTEX admins. This standardization helps to create user patterns and impacts the user experience while using our platform. With these standards, our user became more aware of use and interaction. Thus we created this component with only two versions, centered and full.

### Centered
The centered version has a max width. This layout version will keep the page content centered even on large screens. The designer can use this kind of layout when it is important to guide the user through the action. For example, it can be used for, forms, setups, and CRUDs, in with a specific context.

### 👍 Dos
- Use to create layouts with direct content
- Use to guide the user through an action
- Use to draw attention to specific actions

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

### Full
The Full version will take the whole screen width. This layout version must be used when the designer wants to show a large amount of data. For this, the full design will turn possible the possibility of building dashboards and display data sets, such as tables and so on.

### 👍 Dos
- Use to show large amount of data
- Use to create dashboards
- Use to display interactions that must to be simultaneous


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
