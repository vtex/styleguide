Default

```js
class ModalDialogExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleModalToggle = this.handleModalToggle.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
  }

  handleModalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  handleConfirmation() {
    this.handleModalToggle()
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleModalToggle}>Open modal</Button>

        <ModalDialog
          centered
          handleConfirmation={this.handleConfirmation}
          confirmationLabel="Ok"
          handleCancelation={this.handleModalToggle}
          cancelationLabel="Cancel"
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalToggle}
        >
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
