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
