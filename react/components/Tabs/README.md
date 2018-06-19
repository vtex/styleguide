Default

```js
const { Tab } = require('./Tab');
<div>
  <Tabs>
    <Tab label="label 1" active onClick={() => {}} />
    <Tab label="label 2" onClick={() => {}} />
    <Tab label="label 3" onClick={() => {}} />
  </Tabs>
</div>
```

Working example

```js
const { Tab } = require('./Tab');
class TabsExample extends React.Component {
  constructor() {
    super()
    this.state = {
      firstTabActive: true,
      secondTabActive: false,
      thirdTabActive: false,
    }
    this.handleFirstTabClick = this.handleFirstTabClick.bind(this)
    this.handleSecondTabClick = this.handleSecondTabClick.bind(this)
    this.handleThirdTabClick = this.handleThirdTabClick.bind(this)
  }

  handleFirstTabClick() {
    this.setState({
      firstTabActive: true,
      secondTabActive: false,
      thirdTabActive: false,
    })
  }

   handleSecondTabClick() {
    this.setState({
      firstTabActive: false,
      secondTabActive: true,
      thirdTabActive: false,
    })
  }

   handleThirdTabClick() {
    this.setState({
      firstTabActive: false,
      secondTabActive: false,
      thirdTabActive: true,
    })
  }

  render() {
    return (
      <div>
          <Tabs>
            <Tab label="label 1" active={this.state.firstTabActive} onClick={this.handleFirstTabClick}>
              <p>Content 1</p>
            </Tab>
            <Tab label="label 2" active={this.state.secondTabActive} onClick={this.handleSecondTabClick}>
              <p>Content 2</p>
            </Tab>
            <Tab label="label 3" active={this.state.thirdTabActive} onClick={this.handleThirdTabClick}>
              <p>Content 3</p>
            </Tab>
          </Tabs>
      </div>
    )
  }
}
;<TabsExample />
```
