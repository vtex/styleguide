### Styleguide

> VTEX Styleguide React components ([Docs](https://vtex.github.io/styleguide))

- [Usage](#usage)
- [Developing](#developing)
  -  [Setup](#setup)
  -  [Running](#running)
  -  [Snapshots](#snapshots)
- [Developing using npm link](#developing-using-npm-link)
- [Publishing](#publishing)
- [Docs](#docs)

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

```sh
yarn snap:test
```

Check the snapshots and to approve the changes use:

```sh
yarn snap:approve
```

You can use the option `--filter` to just test or approve a specific component. Example:

```sh
yarn snap:approve --filter "Button"
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

We use [releasy](https://www.npmjs.com/package/releasy) to publish our styleguide. To publish on both npm and render(VTEX IO), execute the command below: 

```sh
releasy --stable --npm 
```

Also, if you want to post the changelog on Github Release Notes, is required to configure a Personal Token. [See more here](https://www.npmjs.com/package/releasy#settings). When you have the environment set, add a `--notes` flag, For example: 

```sh
releasy --stable --npm --notes
```

### Docs

To update the docs:

```sh
yarn deploy
```

#### Known issues

* Your project has to run with webpack >= 2. Here's a [guide](https://webpack.js.org/migrate/3/) for upgrading Webpack to v2.
