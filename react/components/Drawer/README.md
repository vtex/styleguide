Default
```
const Button = require('../Button').default

class DrawerExample extends React.Component {
  constructor() {
    this.state = { isOpen: false }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle() {
    this.setState(function({ isOpen }) {
      return { isOpen: !isOpen }
    })
  }

  render() {
    return (
        <div>
          <Button onClick={this.handleDrawerToggle}>Open drawer</Button>

          <Drawer
            isOpen={this.state.isOpen}
            onClose={this.handleDrawerToggle}
            titleText="Create a new store"
            backLinkText="Stores"
            closeText="Create"
          >
            Hello World
          </Drawer>
        </div>
    )
  }
}

;<DrawerExample />
```
