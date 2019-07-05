#### Totalizers are used to consolidate important numeric data. It usually displays numbers that the user what to access fastly.

### 👍 Dos

- Use icons to support the user scanning the information
- Create clear clues with titles
- Display the most important, and needed, numbers

### 👎 Don'ts

- Never replace the number with text
- Avoid using seccondary information
- Avoid using on the bottom of the page

### Related components

- Consider using a <a href="#/Components/Display/Table">Table</a> if the information on totalizers is followed of a list of data.

#### Default

```js
const Totalizers = require('./index.js').default
;<Totalizers 
  items={[
          {
            label: 'Saldo em conta',
            value: 23837,
          },
          {
            label: 'Entradas',
            value: 'R$ 36239,05',
          },

          {
            label: 'Saídas',
            value: '- R$ 13.485,26',
          },
          {
            label: 'Vendas',
            value: 23837,
            isLoading: true,
          },
        ]}/>
```

#### Totalizer Icon

```js
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default
const ShoppingCart = require('../icon/ShoppingCart').default

const Totalizers = require('./index.js').default

;<Totalizers 
  items={[
          {
            label: 'Pedidos',
            value: 23837,
            iconBackgroundColor: '#cce8ff',
            icon: <ShoppingCart color="#368df7" size={14} />,
          },
          {
            label: 'Entradas',
            value: 'R$ 36239,05',
            iconBackgroundColor: '#eafce3',
            icon: <ArrowUp color="#79B03A" size={14} />,
          },

          {
            label: 'Saídas',
            value: '- R$ 13.485,26',
            iconBackgroundColor: '#fda4a4',
            icon: <ArrowDown color="#dd1616" size={14} />,
          },

        ]}/>
```