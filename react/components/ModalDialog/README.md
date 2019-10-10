Default

```js
const Button = require('../Button').default

class ModalDialogExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleModalToggle = this.handleModalToggle.bind(this)
  }

  handleModalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleModalToggle}>Open modal</Button>

        <ModalDialog
          centered
          confirmation={{
            onClick: this.handleModalToggle,
            label: 'Ok',
          }}
          cancelation={{
            onClick: this.handleModalToggle,
            label: 'Cancel',
          }}
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalToggle}>
          <h1>Confirm?</h1>
          <p>
            Some child content before the action buttons. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Praesent semper eget magna sit
            amet maximus. In rutrum, justo sodales euismod dignissim, justo orci
            venenatis lectus, vel semper turpis nunc a justo.
          </p>
        </ModalDialog>
      </div>
    )
  }
}

;<ModalDialogExample />
```

Loading

```js
const Button = require('../Button').default

class ModalDialogExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false, loading: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleCancelation = this.handleCancelation.bind(this)
  }

  handleOpen() {
    this.setState({ isModalOpen: true })
  }

  handleConfirmation() {
    this.setState({ loading: true })
    setTimeout(
      () => this.setState({ isModalOpen: false, loading: false }),
      1500
    )
  }

  handleCancelation() {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { isModalOpen, loading } = this.state
    return (
      <div>
        <Button onClick={this.handleOpen}>Open modal</Button>

        <ModalDialog
          centered
          loading={loading}
          confirmation={{
            onClick: this.handleConfirmation,
            label: 'Ok',
          }}
          cancelation={{
            onClick: this.handleCancelation,
            label: 'Cancel',
          }}
          isOpen={isModalOpen}
          onClose={this.handleCancelation}>
          <h1>Confirm?</h1>
          <p>
            Some child content before the action buttons. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Praesent semper eget magna sit
            amet maximus. In rutrum, justo sodales euismod dignissim, justo orci
            venenatis lectus, vel semper turpis nunc a justo.
          </p>
        </ModalDialog>
      </div>
    )
  }
}

;<ModalDialogExample />
```

Dangerous

```js
const Button = require('../Button').default

class ModalDialogExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false, loading: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleCancelation = this.handleCancelation.bind(this)
  }

  handleOpen() {
    this.setState({ isModalOpen: true })
  }

  handleConfirmation() {
    this.setState({ loading: true })
    setTimeout(
      () => this.setState({ isModalOpen: false, loading: false }),
      1500
    )
  }

  handleCancelation() {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { isModalOpen, loading } = this.state
    return (
      <div>
        <Button onClick={this.handleOpen}>Open modal</Button>

        <ModalDialog
          centered
          loading={loading}
          confirmation={{
            onClick: this.handleConfirmation,
            label: 'Are you sure?',
            isDangerous: true,
          }}
          cancelation={{
            onClick: this.handleCancelation,
            label: 'Cancel',
          }}
          isOpen={isModalOpen}
          onClose={this.handleCancelation}>
          <h1>Do you really, really, want to do that?</h1>
          <p>
            Some child content before the action buttons. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Praesent semper eget magna sit
            amet maximus. In rutrum, justo sodales euismod dignissim, justo orci
            venenatis lectus, vel semper turpis nunc a justo.
          </p>
        </ModalDialog>
      </div>
    )
  }
}

;<ModalDialogExample />
```
