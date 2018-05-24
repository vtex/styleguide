Default

```js
class TabsExample extends React.Component {
  constructor() {
    super()

    this.state = {
      checkedRadioValue: 'option-1',
    }

    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(e, value) {
  //   this.setState({
  //     checkedRadioValue: value,
  //   })
  // }

  render() {
    return (
      <div>
        <Tabs>
          <Tab label="tab1" value="v1">
            <p>Some content</p>
          </Tab>
          <Tab label="tab2" value="v2">
            <p>Some content</p>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
;<TabsExample />
```
