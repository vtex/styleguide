#### A simple header for Admin modules and Apps with simple navigation needs.

### 👍 Dos

- Keep the page title short. It's a title, after all. Use the module name in the title if it's the first page.
- Use the previous page title as the label of the back link.
- Use the main action button if it's clear what would be the most import action of the entire page. Otherwise just don't.

### 👎 Don'ts

- Don't change dynamically the main page action upon action on the page. The main action should be as static as the title is.

### Related components

<a href="#/Components/Navigation/Tabs">Tabs</a> may be used in composition with the PageHeader for the main navigation.

Default

```js
<PageHeader title="Orders" />
```

With link

```js
<PageHeader
  title="Order details"
  linkLabel="Orders"
  onLinkClick={e => {
    console.log(e)
  }}
/>
```

With children

```js
const Button = require('../Button').default

;<PageHeader
  title="Order details"
  linkLabel="Orders"
  onLinkClick={e => {
    console.log(e)
  }}>
  <span className="mr4">
    <Button variation="secondary">Secondary</Button>
  </span>

  <Button variation="primary">Primary</Button>
</PageHeader>
```

With children and subtitle

```js
const Button = require('../Button').default

;<PageHeader
  title="Order details"
  subtitle="Some explanation or description for your page"
  linkLabel="Orders"
  onLinkClick={e => {
    console.log(e)
  }}>
  <span className="mr4">
    <Button variation="secondary">Secondary</Button>
  </span>

  <Button variation="primary">Primary</Button>
</PageHeader>
```
