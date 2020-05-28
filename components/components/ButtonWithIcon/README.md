In addition to the props above, `ButtonWithIcon` accepts all the props the
[`Button`](/#/Components/Forms/Button) component does.

```js
const ArrowBack = require('../icon/ArrowBack').default
const Delete = require('../icon/Delete').default
const Edit = require('../icon/Edit').default
const PlusLines = require('../icon/PlusLines').default

const arrow = <ArrowBack />
const remove = <Delete />
const edit = <Edit />
const plus = <PlusLines />

;<div className="flex">
  <div className="mr2">
    <ButtonWithIcon icon={arrow} variation="tertiary">
      Back
    </ButtonWithIcon>
  </div>
  <div className="mr2">
    <ButtonWithIcon icon={edit} variation="secondary">
      Edit
    </ButtonWithIcon>
  </div>
  <div className="mr2">
    <ButtonWithIcon icon={plus} iconPosition="right">
      Add
    </ButtonWithIcon>
  </div>
  <div className="mr2">
    <ButtonWithIcon icon={remove} variation="danger" />
  </div>
</div>
```
