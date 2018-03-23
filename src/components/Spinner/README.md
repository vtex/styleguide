#### Default

```js
const spinnerStyle = require('./style.css');
<table style={{ height: '40px', width: '40px' }}>
  <tbody>
    <tr>
      <td>
        <Spinner style={spinnerStyle}/>
      </td>
    </tr>
  </tbody>
</table>
```

#### Secondary

```js
const spinnerStyle = require('./style.css');
<table style={{ height: '40px', width: '40px', background: '#368df7' }}>
  <tbody>
    <tr>
      <td>
        <Spinner secondary style={spinnerStyle}/>
      </td>
    </tr>
  </tbody>
</table>
```

_Notes:_

* The `table` are only used to contain the svg for the demo.
* The spinner has no width, meaning its parent will have to deal with it.
