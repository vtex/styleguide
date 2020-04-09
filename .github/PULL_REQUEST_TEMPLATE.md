#### What is the purpose of this pull request?

<!--- Describe your changes in detail. -->

#### What problem is this solving?
[Running workspace](http://link)


<!--- What is the motivation and context for this change? -->

#### How should this be manually tested?

<!-- Add the code that is necessary to test your change in the Playground-->


<details>
<summary>Add this code in <code>react/playground/Playground.tsx</code>:</summary>

```jsx
import React from 'react'

import PageHeader from '../PageHeader'
import Layout from '../Layout'

const Playground = () => (
  <Layout fullWidth pageHeader={<PageHeader title="Playground" />}>
    {/* Add your code here, don't forget to delete after */}
  </Layout>
)

export default Playground

```

</details>

#### Screenshots or example usage

#### Types of changes

- [ ] Bug fix (a non-breaking change which fixes an issue)
- [ ] New feature (a non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Requires change to documentation, which has been updated accordingly.
