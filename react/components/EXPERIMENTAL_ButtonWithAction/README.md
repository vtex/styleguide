```js
const PlusLines = require('../icon/PlusLines').default

const actions = [
  {
    label: 'Open pod doors, HAL',
    onClick: () => alert('I’m sorry, Dave. I’m afraid I can’t do that.'),
  },
  {
    label: 'Have you heard about the word?',
    onClick: () => alert('sure, everybody knows that the bird is the word...'),
  },
  {
    label: 'Hey look',
    onClick: () => alert('Listen!'),
  },
  {
    label: 'Quit now and cake will be served',
    isDangerous: 'true',
    onClick: () => alert('The cake is a lie'),
  },
]

;<div className="flex">
  <div className="mr2">
    <EXPERIMENTAL_ButtonWithAction
      icon={<PlusLines />}
      onClick={() => alert('Clicked on Add!')}
      actions={actions}>
      Add
    </EXPERIMENTAL_ButtonWithAction>
  </div>
</div>
```
