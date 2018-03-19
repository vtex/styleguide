### Styleguide

https://vtex.github.io/styleguide

1. [Usage](#Usage)
2. [Developing](#Developing)
  2.1 [Setup](#Setup)
  2.2 [Running](#Running)
  2.3 [Snapshots](#Snapshots)
3. [Developing using npm link](#Developing using npm link)
4. [Publishing](#Publishing)
5. [Docs](#Docs)

## Usage

```sh
yarn add @vtex/styleguide --exact
# or
npm install @vtex/styleguide --save-exact
```

```js
import Button from '@vtex/styleguide/lib/Button'
```

## Developing

### Setup

```sh
yarn install
```

### Running

```sh
yarn styleguide
```

### Snapshots

To save the components snapshots use:

```
yarn snap:test
```

Check the snapshots and to approve the changes use:

```
yarn snap:approve
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

```sh
releasy pre
npm publish
```

### Docs

To update the docs:

```sh
yarn deploy
```

#### Known issues

* Your project has to run with webpack >= 2. Here's a [guide](https://webpack.js.org/guides/migrating/) for upgrading Webpack to v2.
