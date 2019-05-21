The VTEX team welcomes and thanks you for developing with us. We are committed in provide the best developer experience through consistency and quality of our guidelines. We are open and appreciate all the feedbacks, tips and ideas to keep this experience the best as possible. Bellow we describe the way we work and the best practices.

Before start, we must distinguish between our two type of developers who use our styleguide:

- **Those who develop in the VTEX IO**: They need understand how the use our components through our platform. If you are curious and want to know more about our web platform, [see here](https://help.vtex.com/tracks/vtex-io-getting-started--2qYWraccosS2ayg2kusaUo/1LSy4Gkvo4saEQa2OMqC4q)
- **Other developers**: Those who thoughts that our components incredible and want to use them in their own projects.

#### VTEX IO apps

Add the styleguide to dependencies on `manifest.json`:

```sh noeditor static
"dependencies": {
  "vtex.styleguide": "8.x"
},
```

Importing components:

```js noeditor static
import { Button } from 'vtex.styleguide'
```

#### Other projects

```sh noeditor static
yarn add @vtex/styleguide
# or
npm install @vtex/styleguide
```

Importing components:

```js noeditor static
import Button from '@vtex/styleguide/lib/Button'
```

#### Running the project locally

```jsx noeditor
<Tag type="warning">WIP</Tag>
```

#### PRs and Code Review

:loudspeaker: **Disclaimer:** In the course of this document we assume that you know how to use the basics of git as well like do a commit, rebase and merge. Before open a PR, read the [designing section](./designing.md) and take some minutes thinking if your change is appropriate to our styleguide.

As we know, a Pull Request let you tell to others about changes you have pushed to a branch in a GitHub Repo. So, to avoid confusion when we discuss with you your changes, it's convenient to talk how we create our branches and make our commits. We strongly recommend that you follow our standard.

##### Branch

```jsx noeditor
<Tag type="warning">WIP</Tag>
```

#### Releases and changelog

```jsx noeditor
<Tag type="warning">WIP</Tag>
```
