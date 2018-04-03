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
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>

        <Modal
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Modal>
      </div>
    );
  }
}

<ModalExample />;
```

Long content

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
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>

        <Modal
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}>
          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>

          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>

          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>

          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>

          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>

          <p>Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.</p>
        </Modal>
      </div>
    );
  }
}

<ModalExample />;
```

Wide

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
    return (
      <div>
        <Button onClick={this.handleChange}>Open modal</Button>

        <Modal
          wide
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleChange}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Modal>
      </div>
    );
  }
}

<ModalExample />;
```
