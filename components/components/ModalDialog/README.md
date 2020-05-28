Default

```js
const Button = require('../Button').default
const Input = require('../Input').default

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
            label: 'Send',
          }}
          cancelation={{
            onClick: this.handleModalToggle,
            label: 'Cancel',
          }}
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalToggle}>
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-50-ns">
              <p className="f3 f1-ns fw3 gray">
                Discover our unified commerce platform and see your business
                thrive.
              </p>
            </div>
            <div className="w-100 w-50-ns mv4 pv6-ns pl6-ns">
              <div className="w-100 mv6">
                <Input placeholder="Name" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Last name" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Corporate email" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Company" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Annual revenue" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Do you have e-commerce?" size="large" />
              </div>
            </div>
          </div>
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
const Input = require('../Input').default

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
            label: 'Send',
          }}
          cancelation={{
            onClick: this.handleCancelation,
            label: 'Cancel',
          }}
          isOpen={isModalOpen}
          onClose={this.handleCancelation}>
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-50-ns">
              <p className="f3 f1-ns fw3 gray">
                Discover our unified commerce platform and see your business
                thrive.
              </p>
            </div>
            <div className="w-100 w-50-ns mv4 pv6-ns pl6-ns">
              <div className="w-100 mv6">
                <Input placeholder="Name" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Last name" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Corporate email" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Company" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Annual revenue" size="large" />
              </div>
              <div className="w-100 mv6">
                <Input placeholder="Do you have e-commerce?" size="large" />
              </div>
            </div>
          </div>
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
const Input = require('../Input').default

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
            label: 'Yes remove all data',
            isDangerous: true,
          }}
          cancelation={{
            onClick: this.handleCancelation,
            label: 'Cancel',
          }}
          isOpen={isModalOpen}
          onClose={this.handleCancelation}>
          <div className="">
            <p className="f3 f3-ns fw3 gray">
              Are you sure you want to delete your account?
            </p>
            <p>
              This action is irreversible. It will remove all your orders,
              cards, addresses and tickets.
            </p>
          </div>
        </ModalDialog>
      </div>
    )
  }
}

;<ModalDialogExample />
```
