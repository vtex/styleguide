### Styleguide

https://vtex.github.io/styleguide

### Setup

```sh
yarn install
```

### Developing using Styleguidist

```sh
yarn styleguide
```

### Developing using another project

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

### Creating a new release and publishing on NPM

```sh
releasy pre
npm publish 
```

### Publishing Styleguide page

```sh
yarn deploy
```

#### Known issues
Your project has to run with webpack >= 2. Here's a [guide](https://webpack.js.org/guides/migrating/) for upgrading Webpack to v2. 