Default
```
const Button = require('../Button').default

class DrawerExample extends React.Component {
  constructor() {
    this.state = {
      isOpen: false,
      loading: false,
    }
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleDrawerSubmit = this.handleDrawerSubmit.bind(this)
  }

  handleDrawerToggle() {
    this.setState(function({ isOpen }) {
      return { isOpen: !isOpen }
    })
  }

  handleDrawerSubmit() {
    this.setState({ loading: true })
    var that = this
    setTimeout(() => {
      this.setState({ loading: false, isOpen: false })
    }, 1000)
  }

  render() {
    return (
        <div>
          <Button onClick={this.handleDrawerToggle}>Open drawer</Button>

          <Drawer
            isOpen={this.state.isOpen}
            title="Create a new store"
            loading={this.state.loading}
            submit={{
              label: 'Create',
              handleClick: this.handleDrawerSubmit
            }}
            back={{
              label: 'Stores',
              handleClick: this.handleDrawerToggle
            }}
          >
            <p className="kear-black">
              Choose a face to be ignored in the facial recognition system
            </p>
          </Drawer>
        </div>
    )
  }
}

;<DrawerExample />
```
