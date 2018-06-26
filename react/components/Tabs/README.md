Default

```js
const Tab = require('./Tab').default;
<div>
  <Tabs>
    <Tab label="label 1" active onClick={() => {}} />
    <Tab label="label 2" onClick={() => {}} />
    <Tab label="label 3" onClick={() => {}} />
  </Tabs>
</div>
```

Block

```js
const Tab = require('./Tab').default;
<div>
  <Tabs>
    <Tab label="block 1" active onClick={() => {}} block />
    <Tab label="block 2" onClick={() => {}} block />
    <Tab label="block 3" onClick={() => {}} block />
  </Tabs>
</div>
```

Working example

```js
const Tab = require('./Tab').default;
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
