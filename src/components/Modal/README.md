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
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}
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
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}
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
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}
          style={modalStyle}
          primaryAction={{label: "Primary", onClick: this.handleChange}}
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
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}
          style={modalStyle}
          secondaryAction={{label: "Secondary", onClick: this.handleChange}}
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
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}
          style={modalStyle}
          primaryAction={{label: "Primary", onClick: this.handleChange}}
          secondaryAction={{label: "Secondary", onClick: this.handleChange}}
        />
      </div>
    );
  }
}

<ModalExample />;
```
