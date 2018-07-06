A simple and generic header for Admin modules and Apps.

## What problem it solves

Our new admin sidebar provides a global solution for 1st-level navigation (between modules) and 2nd-level navigation (sections inside a module), but 3rd-level navigation is left for each module team to handle.

To improve consistency in the platform this generic solution was made for handling simple 3rd-level navigation needs.

## Design decisions

In the old Admin we used to deal with this with breadcrumbs, which might end up encouraging designers to create profound information architectures.
In the spirit of the Simplicity Principle, this solution encourages modules to not going much deeper in the navigation given it doesn't provide a breadcrumb or tabs, but a simple back link in the top.

It's important that in the implementation the vertical space for the back link is left blank if the link is not available. In other words, the main heading should always have the top margin in relation to the module available viewport.


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