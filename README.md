### Styleguide

> VTEX Styleguide React components ([Docs](https://vtex.github.io/styleguide))

- [Usage](#usage)
- [Developing](#developing)
  -  [Setup](#setup)
  -  [Running](#running)
- [Developing using npm link](#developing-using-npm-link)
- [Publishing](#publishing)
- [Docs](#docs)

## Usage

For instructions on how to use the Styleguide in your project refer to the page itself: https://vtex.github.io/styleguide/.

## Developing

### Setup

```sh
yarn install
```

### Running

```sh
yarn styleguide
```

## Developing using `npm link`

Run this in this repo:

```sh
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

### Publishing

To post the changelog on Github Release Notes, is required to configure a Personal Token. [See more here](https://www.npmjs.com/package/releasy#settings)

We use [releasy](https://www.npmjs.com/package/releasy) to publish our styleguide. To publish on both npm and render(VTEX IO) with Github Release Notes, execute the command below:

```sh
releasy --stable
```

### Docs

To update the docs:

```sh
yarn deploy
```

#### Known issues

* Your project has to run with webpack >= 2. Here's a [guide](https://webpack.js.org/migrate/3/) for upgrading Webpack to v2.
