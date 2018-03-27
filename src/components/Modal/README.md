Default

```js
class ModalExample extends React.Component {
  constructor() {
    super();
    this.state = { isModalOpen: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const modalStyle = require("./style.css");
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>
        <Modal
          innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          handleClose={this.handleChange}
          style={modalStyle}
        />
      </div>
    );
  }
}

<ModalExample />;
```


With title

```js
class ModalExample extends React.Component {
  constructor() {
    super();
    this.state = { isModalOpen: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const modalStyle = require("./style.css");
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>
        <Modal
        title="Modal with title"
          innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          handleClose={this.handleChange}
          style={modalStyle}
        />
      </div>
    );
  }
}

<ModalExample />;
```


With primary action

```js
class ModalExample extends React.Component {
  constructor() {
    super();
    this.state = { isModalOpen: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const modalStyle = require("./style.css");
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>
        <Modal
          title="Modal with primary action"
          innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          handleClose={this.handleChange}
          style={modalStyle}
          handlePrimaryAction={this.handleChange}
          primaryActionTitle="Primary"
        />
      </div>
    );
  }
}

<ModalExample />;
```

With secondary action

```js
class ModalExample extends React.Component {
  constructor() {
    super();
    this.state = { isModalOpen: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const modalStyle = require("./style.css");
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>
        <Modal
          title="Modal with secondary action"
          innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          handleClose={this.handleChange}
          style={modalStyle}
          handleSecondaryAction={this.handleChange}
          secondaryActionTitle="Secondary"
        />
      </div>
    );
  }
}

<ModalExample />;
```

With actions

```js
class ModalExample extends React.Component {
  constructor() {
    super();
    this.state = { isModalOpen: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const modalStyle = require("./style.css");
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>
        <Modal
          title="Modal with actions"
          innerText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          handleClose={this.handleChange}
          style={modalStyle}
          handlePrimaryAction={this.handleChange}
          primaryActionTitle="Primary"
          handleSecondaryAction={this.handleChange}
          secondaryActionTitle="Secondary"
        />
      </div>
    );
  }
}

<ModalExample />;
```
