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

- Consider using a <a href="#/Components/Display/Table">Table</a> if the information on totalizer is followed by a list of data.

#### Default

```js
<Totalizer
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
  ]}
/>
```

#### Horizontal layout

```js
const ShoppingCart = require('../icon/ShoppingCart').default
;<Totalizer
  horizontalLayout
  items={[
    {
      label: 'Orders',
      value: '566',
      inverted: true,
    },
    {
      label: 'Average Ticket',
      value: 'R$55.47',
      inverted: true,
    },
    {
      label: 'Gross',
      value: 'R$554.70',
      inverted: true,
    },
  ]}
/>
```

#### Horizontal layout with icons

```js
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default
const ShoppingCart = require('../icon/ShoppingCart').default
;<Totalizer
  horizontalLayout
  items={[
    {
      label: 'Orders',
      value: '566',
      inverted: true,
      iconBackgroundColor: '#eafce3',
      icon: <ArrowUp color="#79B03A" size={14} />,
    },
    {
      label: 'Average Ticket',
      value: 'R$55.47',
      inverted: true,
      iconBackgroundColor: '#cce8ff',
      icon: <ShoppingCart color="#368df7" size={14} />,
    },
    {
      label: 'Gross',
      value: 'R$554.70',
      inverted: true,
      iconBackgroundColor: '#fda4a4',
      icon: <ArrowDown color="#dd1616" size={14} />,
    },
  ]}
/>
```

#### With inverted first item

```js
<Totalizer
  items={[
    {
      inverted: true,
      value: 'Total Orders',
      label: 'Until 10h10',
    },
    {
      label: 'Today',
      value: 12364,
    },
    {
      label: 'Yesterday',
      value: 11980,
    },

    {
      label: 'Last Week',
      value: 10776,
    },
    {
      label: 'Last Year',
      value: 9802,
    },
  ]}
/>
```

#### With Icons

```js
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default
const ShoppingCart = require('../icon/ShoppingCart').default
;<Totalizer
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
  ]}
/>
```

#### Mobile scroll

```js
<Totalizer
  mobileScroll
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
  ]}
/>
```

#### Icons & mobile scroll

```js
const ArrowDown = require('../icon/ArrowDown').default
const ArrowUp = require('../icon/ArrowUp').default
const ShoppingCart = require('../icon/ShoppingCart').default
;<Totalizer
  mobileScroll
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
  ]}
/>
```
