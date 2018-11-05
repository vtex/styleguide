### VTEX IO apps

Add the styleguide to dependencies on `manifest.json`:

```sh noeditor static
"dependencies": {
  "vtex.styleguide": "7.x"
},
```

Importing components:

```js noeditor static
import { Button } from 'vtex.styleguide'
```

### Other projects

```sh noeditor static
yarn add @vtex/styleguide
# or
npm install @vtex/styleguide
```

Importing components:

```js noeditor static
import Button from '@vtex/styleguide/lib/Button'
```
