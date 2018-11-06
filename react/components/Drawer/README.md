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
            title="Drawer Sample"
            loading={this.state.loading}
            submit={{
              label: 'Save',
              handleClick: this.handleDrawerSubmit
            }}
            secondAction={{
              label: 'Dismiss',
              handleClick: this.handleDrawerToggle
            }}
            back={{
              label: 'Styleguide',
              handleClick: this.handleDrawerToggle
            }}
          >
            <p className="c-muted-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id ipsum cursus, consequat justo et, congue justo. Ut tincidunt ac lorem id consectetur. Duis ut elit ac ex ultricies efficitur et eget lacus. Aenean commodo enim lacus, in tincidunt tellus malesuada sed. Sed pulvinar mi vitae mi laoreet, sit amet ultricies sem vulputate. Sed quis posuere metus. Suspendisse eleifend sem justo, at aliquet nisl porta sed. Integer pharetra ornare convallis. Donec vitae ante eu lectus laoreet aliquam in in urna. Donec convallis tristique leo, ac posuere leo rhoncus vitae. Donec enim mauris, placerat in hendrerit et, elementum eu sem.
            </p>
            <p className="c-muted-1">
              Curabitur id sem id odio commodo convallis. Suspendisse metus dui, efficitur sit amet sollicitudin eget, volutpat vitae libero. Phasellus venenatis tincidunt massa, et lobortis mauris aliquam sed. Vivamus ornare nisi a pharetra placerat. Vestibulum sed nulla diam. Etiam faucibus congue laoreet. Maecenas non aliquam mi. Phasellus et enim molestie, dapibus ante nec, scelerisque neque.
            </p>
            <p className="c-muted-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id ipsum cursus, consequat justo et, congue justo. Ut tincidunt ac lorem id consectetur. Duis ut elit ac ex ultricies efficitur et eget lacus. Aenean commodo enim lacus, in tincidunt tellus malesuada sed. Sed pulvinar mi vitae mi laoreet, sit amet ultricies sem vulputate. Sed quis posuere metus. Suspendisse eleifend sem justo, at aliquet nisl porta sed. Integer pharetra ornare convallis. Donec vitae ante eu lectus laoreet aliquam in in urna. Donec convallis tristique leo, ac posuere leo rhoncus vitae. Donec enim mauris, placerat in hendrerit et, elementum eu sem.
            </p>
            <p className="c-muted-1">
              Curabitur id sem id odio commodo convallis. Suspendisse metus dui, efficitur sit amet sollicitudin eget, volutpat vitae libero. Phasellus venenatis tincidunt massa, et lobortis mauris aliquam sed. Vivamus ornare nisi a pharetra placerat. Vestibulum sed nulla diam. Etiam faucibus congue laoreet. Maecenas non aliquam mi. Phasellus et enim molestie, dapibus ante nec, scelerisque neque.
            </p>
            <p className="c-muted-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id ipsum cursus, consequat justo et, congue justo. Ut tincidunt ac lorem id consectetur. Duis ut elit ac ex ultricies efficitur et eget lacus. Aenean commodo enim lacus, in tincidunt tellus malesuada sed. Sed pulvinar mi vitae mi laoreet, sit amet ultricies sem vulputate. Sed quis posuere metus. Suspendisse eleifend sem justo, at aliquet nisl porta sed. Integer pharetra ornare convallis. Donec vitae ante eu lectus laoreet aliquam in in urna. Donec convallis tristique leo, ac posuere leo rhoncus vitae. Donec enim mauris, placerat in hendrerit et, elementum eu sem.
            </p>
          </Drawer>
        </div>
    )
  }
}

;<DrawerExample />
```
