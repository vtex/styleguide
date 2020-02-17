# Styleguide

> VTEX Styleguide React components ([Docs](https://vtex.github.io/styleguide))

- [Usage](#usage)
- [Developing](#developing)
  - [Setup](#setup)
  - [Running](#running)
- [Developing using npm link](#developing-using-npm-link)
- [Publishing](#publishing)
- [Docs](#docs)

## Usage

For instructions on how to use the Styleguide in your project refer to the page itself: https://vtex.github.io/styleguide/.

## Developing

### Setup

```shell
yarn install
```

### Running

```shell
yarn styleguide
```

## Developing using `npm link`

Run this in this repo:

```shell
yarn develop
```

In your project run:

```
npm link @vtex/styleguide
```

Import (case a `<Button>` component in lib):

```js
import Button from '@vtex/styleguide/lib/Button'
```

## Testing

### Developing new tests

To add tests to a component, just add a test file with the `.test.js` extension next to the component implementation.

Example:

```shell
react/components/Alert/
├── README.md
├── index.js
└── index.test.js
```

We use [react-testing-library](https://github.com/kentcdodds/react-testing-library) to test our components.

### Running tests

To run the test use:

```shell
yarn test
```

You can also pass the `--watch` flag:

```shell
yarn test --watch
```

### Publishing

---

To post the changelog on Github Release Notes, is required to configure a Personal Token. [See more here](https://www.npmjs.com/package/releasy#settings)

We use [releasy](https://www.npmjs.com/package/releasy) to publish our styleguide. To publish on both npm and render(VTEX IO) with Github Release Notes, execute the command below:

```shell
releasy --stable
```

### Docs

To update the docs:

```shell
yarn deploy
```

#### Known issues

- Your project has to run with webpack >= 2. Here's a [guide](https://webpack.js.org/migrate/3/) for upgrading Webpack to v2.

- `VTEX Styleguide` is a project built to run on top of either `npm` or `VTEX IO`. To
  make this viable, we currently use two `package.json` files, one in the top repository
  folder for `npm`, and one inside the `react` folder for `VTEX IO`. We are
  looking into how we can improve this architecture, but for now we have to live
  with duplicated dependencies in these `package.json` files.

  For more info, please refer to https://github.com/vtex/styleguide/issues/483

- We currently have two majors of the Styleguide, `8.x` and `9.x` (master branch).
  Each major supports a specific VTEX's Render version.
  This means that we develop new features only on the `master` branch (9.x major) and do bug fixes on both `master` and `8.x` branches.

#### Custom icons

The `icon` components supports customization through the `<use>` element available in SVG. [Read more](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)
*How to use:* In the same page that has a icon, load in any place inside the `<html>` a SVG with the following structure:
```svg
<svg class="dn" height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <g id="icon-columns">
      <path d="M10.8 4.4L9.4 3L5.4 7L3.4 5L2 6.4L5.4 9.8L10.8 4.4Z" fill="currentColor" />
    </g>
    <g id="OTHER-ICON-ID">
      <path d="M11.7 0.3C11.5 0.1 11.3 0 11 0H10V3C10 3.6 9.6 4 9 4H4C3.4 4 3 3.6 3 3V0H1C0.4 0 0 0.4 0 1V15C0 15.6 0.4 16 1 16H15C15.6 16 16 15.6 16 15V5C16 4.7 15.9 4.5 15.7 4.3L11.7 0.3ZM13 14H3V11C3 10.4 3.4 10 4 10H12C12.6 10 13 10.4 13 11V14Z" fill="currentColor"/>
      <path d="M9 0H7V3H9V0Z" fill="currentColor"/>
    </g>
  </defs>
</svg>
```
- The ID must match the ID of the icon you want to replace. To see all available options, [view icons folder](https://github.com/vtex/styleguide/tree/master/react/components/icon).
- Inside one SVG you can have more than one `<g id="">`, one for each icon you want to update.
