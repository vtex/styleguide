#### A modal is an overlay that demands the attention and action from the user, preventing her from interacting with the rest of the page. It might be used from displaying messages to providing a simple form to edit a record.

### 👍 Dos
- Keep it simple. The content of a modal should represent one, clear action from the user - even if it takes multiple steps to be completed.
- Always use a modal to confirm any destructive actions.

### 👎 Don'ts
- Avoid stacking modals on top of other modals.

### Related components
- For more complex actions and forms where you want to maintain the user context use the Drawer (work in progress).


Default

```js
const Button = require('../Button').default

class ModalExample extends React.Component {
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
      <React.Fragment>
        <Button onClick={this.handleModalToggle}>Open modal</Button>

        <Modal
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalToggle}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

;<ModalExample />
```

Long content

```js
const Button = require('../Button').default

class ModalExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpenModal}>Open modal</Button>

        <Modal isOpen={this.state.isModalOpen} onClose={this.handleCloseModal}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            semper eget magna sit amet maximus. In rutrum, justo sodales euismod
            dignissim, justo orci venenatis lectus, vel semper turpis nunc a
            justo. Pellentesque tempor sodales ante, a dignissim metus posuere
            sed. Aenean dapibus nisl non finibus ultrices. Sed in urna nisi.
            Fusce malesuada, diam eget accumsan pharetra, diam nisl cursus
            mauris, facilisis pretium risus elit in diam. Duis tincidunt
            interdum purus sit amet interdum. Phasellus non elit id lacus
            euismod vehicula nec at velit. Ut ullamcorper pharetra vulputate.
            Praesent volutpat sem et dolor facilisis molestie in et velit.
            Quisque suscipit augue vitae nunc euismod, lacinia volutpat lacus
            porta. Curabitur eget enim urna. Sed neque lectus, pulvinar eget
            vulputate ut, tristique nec leo.
          </p>
          <p>
            Duis pulvinar sagittis lacinia. Cras vitae nibh quis tortor finibus
            luctus. Phasellus et lacus vestibulum, hendrerit sapien ac, vehicula
            dui. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Nulla pellentesque placerat nisi,
            sit amet facilisis dui. Nam maximus ex at iaculis commodo. In sit
            amet nisl vestibulum, mollis ligula vitae, accumsan tortor. Ut
            molestie bibendum velit nec maximus. Suspendisse tincidunt posuere
            urna quis hendrerit. Duis a molestie diam. Pellentesque vitae
            tristique tellus, luctus imperdiet est. Vestibulum vitae pretium
            felis.
          </p>
          <p>
            Vivamus vel purus aliquam, gravida magna eget, iaculis ipsum. Cras
            dapibus nisl ut odio molestie, mollis tempus mi hendrerit. Etiam in
            purus iaculis, interdum dui at, semper sapien. Praesent porta nulla
            justo, non eleifend odio semper ac. Nunc facilisis at mi ac pretium.
            Integer mattis consectetur faucibus. Nam nec elit nec augue
            fringilla efficitur quis eget metus. Morbi at magna quam. Proin nec
            lobortis ante. Ut ut orci quis sem eleifend imperdiet. Proin mauris
            mi, ornare tincidunt placerat nec, eleifend eget velit. Donec
            volutpat urna nibh, et elementum eros interdum eu. Nulla malesuada
            bibendum semper. Donec bibendum ultrices sapien, sit amet fermentum
            nisl semper vel. Aenean ut dapibus est. Aenean quis orci sit amet
            sapien suscipit lobortis.
          </p>
          <p>
            Phasellus eu magna ut arcu dignissim finibus ut ut sapien. Sed vitae
            diam non est congue lacinia vel id elit. Praesent convallis
            convallis justo, elementum laoreet magna congue sed. Cras sodales,
            augue nec tincidunt facilisis, nunc nisi gravida metus, ac fringilla
            metus tellus in ligula. Nulla arcu ipsum, placerat pellentesque
            gravida a, dictum at urna. Proin quis orci nec quam tempor venenatis
            sit amet vitae justo. Nam imperdiet mattis nulla id malesuada. Donec
            condimentum sem vel lorem vulputate, quis tristique lectus semper.
            In maximus sodales sapien vitae porttitor. Duis sodales metus a
            pellentesque laoreet. Donec placerat massa turpis, quis consectetur
            nisl consequat at. Donec sed purus efficitur, fringilla diam et,
            rutrum turpis. Proin tincidunt augue id ligula cursus sollicitudin.
            Suspendisse semper fermentum pulvinar.
          </p>
          <p>
            Quisque tempor vel nunc iaculis ullamcorper. Vestibulum convallis
            purus id rhoncus eleifend. Etiam a elementum diam, eget congue urna.
            Cras pretium justo leo, rutrum ornare arcu pellentesque gravida.
            Aliquam lobortis mauris quis mi vestibulum dignissim. Nam et felis
            in arcu condimentum consequat. Phasellus lectus nibh, suscipit et
            risus quis, eleifend lacinia ligula.
          </p>
          <p>
            Phasellus eu magna ut arcu dignissim finibus ut ut sapien. Sed vitae
            diam non est congue lacinia vel id elit. Praesent convallis
            convallis justo, elementum laoreet magna congue sed. Cras sodales,
            augue nec tincidunt facilisis, nunc nisi gravida metus, ac fringilla
            metus tellus in ligula. Nulla arcu ipsum, placerat pellentesque
            gravida a, dictum at urna. Proin quis orci nec quam tempor venenatis
            sit amet vitae justo. Nam imperdiet mattis nulla id malesuada. Donec
            condimentum sem vel lorem vulputate, quis tristique lectus semper.
            In maximus sodales sapien vitae porttitor. Duis sodales metus a
            pellentesque laoreet. Donec placerat massa turpis, quis consectetur
            nisl consequat at. Donec sed purus efficitur, fringilla diam et,
            rutrum turpis. Proin tincidunt augue id ligula cursus sollicitudin.
            Suspendisse semper fermentum pulvinar.
          </p>
          <p>
            Quisque tempor vel nunc iaculis ullamcorper. Vestibulum convallis
            purus id rhoncus eleifend. Etiam a elementum diam, eget congue urna.
            Cras pretium justo leo, rutrum ornare arcu pellentesque gravida.
            Aliquam lobortis mauris quis mi vestibulum dignissim. Nam et felis
            in arcu condimentum consequat. Phasellus lectus nibh, suscipit et
            risus quis, eleifend lacinia ligula.
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

;<ModalExample />
```

With title and BottomBar

```js
const Button = require('../Button').default

class ModalExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpenModal}>Open modal</Button>

        <Modal
         isOpen={this.state.isModalOpen}
         title="Modal title"
         bottomBar={
            <div className="nowrap">
                <span className="mr4">
                    <Button variation="tertiary" onClick={this.handleCloseModal}>Action 1</Button>
                </span>
                <span>
                    <Button variation="secondary" onClick={this.handleCloseModal}>Action 2</Button>
                </span>
            </div>
          }
        onClose={this.handleCloseModal}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            semper eget magna sit amet maximus. In rutrum, justo sodales euismod
            dignissim, justo orci venenatis lectus, vel semper turpis nunc a
            justo. Pellentesque tempor sodales ante, a dignissim metus posuere
            sed. Aenean dapibus nisl non finibus ultrices. Sed in urna nisi.
            Fusce malesuada, diam eget accumsan pharetra, diam nisl cursus
            mauris, facilisis pretium risus elit in diam. Duis tincidunt
            interdum purus sit amet interdum. Phasellus non elit id lacus
            euismod vehicula nec at velit. Ut ullamcorper pharetra vulputate.
            Praesent volutpat sem et dolor facilisis molestie in et velit.
            Quisque suscipit augue vitae nunc euismod, lacinia volutpat lacus
            porta. Curabitur eget enim urna. Sed neque lectus, pulvinar eget
            vulputate ut, tristique nec leo.
          </p>
          <p>
            Duis pulvinar sagittis lacinia. Cras vitae nibh quis tortor finibus
            luctus. Phasellus et lacus vestibulum, hendrerit sapien ac, vehicula
            dui. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Nulla pellentesque placerat nisi,
            sit amet facilisis dui. Nam maximus ex at iaculis commodo. In sit
            amet nisl vestibulum, mollis ligula vitae, accumsan tortor. Ut
            molestie bibendum velit nec maximus. Suspendisse tincidunt posuere
            urna quis hendrerit. Duis a molestie diam. Pellentesque vitae
            tristique tellus, luctus imperdiet est. Vestibulum vitae pretium
            felis.
          </p>
          <p>
            Vivamus vel purus aliquam, gravida magna eget, iaculis ipsum. Cras
            dapibus nisl ut odio molestie, mollis tempus mi hendrerit. Etiam in
            purus iaculis, interdum dui at, semper sapien. Praesent porta nulla
            justo, non eleifend odio semper ac. Nunc facilisis at mi ac pretium.
            Integer mattis consectetur faucibus. Nam nec elit nec augue
            fringilla efficitur quis eget metus. Morbi at magna quam. Proin nec
            lobortis ante. Ut ut orci quis sem eleifend imperdiet. Proin mauris
            mi, ornare tincidunt placerat nec, eleifend eget velit. Donec
            volutpat urna nibh, et elementum eros interdum eu. Nulla malesuada
            bibendum semper. Donec bibendum ultrices sapien, sit amet fermentum
            nisl semper vel. Aenean ut dapibus est. Aenean quis orci sit amet
            sapien suscipit lobortis.
          </p>
          <p>
            Phasellus eu magna ut arcu dignissim finibus ut ut sapien. Sed vitae
            diam non est congue lacinia vel id elit. Praesent convallis
            convallis justo, elementum laoreet magna congue sed. Cras sodales,
            augue nec tincidunt facilisis, nunc nisi gravida metus, ac fringilla
            metus tellus in ligula. Nulla arcu ipsum, placerat pellentesque
            gravida a, dictum at urna. Proin quis orci nec quam tempor venenatis
            sit amet vitae justo. Nam imperdiet mattis nulla id malesuada. Donec
            condimentum sem vel lorem vulputate, quis tristique lectus semper.
            In maximus sodales sapien vitae porttitor. Duis sodales metus a
            pellentesque laoreet. Donec placerat massa turpis, quis consectetur
            nisl consequat at. Donec sed purus efficitur, fringilla diam et,
            rutrum turpis. Proin tincidunt augue id ligula cursus sollicitudin.
            Suspendisse semper fermentum pulvinar.
          </p>
          <p>
            Quisque tempor vel nunc iaculis ullamcorper. Vestibulum convallis
            purus id rhoncus eleifend. Etiam a elementum diam, eget congue urna.
            Cras pretium justo leo, rutrum ornare arcu pellentesque gravida.
            Aliquam lobortis mauris quis mi vestibulum dignissim. Nam et felis
            in arcu condimentum consequat. Phasellus lectus nibh, suscipit et
            risus quis, eleifend lacinia ligula.
          </p>
          <p>
            Phasellus eu magna ut arcu dignissim finibus ut ut sapien. Sed vitae
            diam non est congue lacinia vel id elit. Praesent convallis
            convallis justo, elementum laoreet magna congue sed. Cras sodales,
            augue nec tincidunt facilisis, nunc nisi gravida metus, ac fringilla
            metus tellus in ligula. Nulla arcu ipsum, placerat pellentesque
            gravida a, dictum at urna. Proin quis orci nec quam tempor venenatis
            sit amet vitae justo. Nam imperdiet mattis nulla id malesuada. Donec
            condimentum sem vel lorem vulputate, quis tristique lectus semper.
            In maximus sodales sapien vitae porttitor. Duis sodales metus a
            pellentesque laoreet. Donec placerat massa turpis, quis consectetur
            nisl consequat at. Donec sed purus efficitur, fringilla diam et,
            rutrum turpis. Proin tincidunt augue id ligula cursus sollicitudin.
            Suspendisse semper fermentum pulvinar.
          </p>
          <p>
            Quisque tempor vel nunc iaculis ullamcorper. Vestibulum convallis
            purus id rhoncus eleifend. Etiam a elementum diam, eget congue urna.
            Cras pretium justo leo, rutrum ornare arcu pellentesque gravida.
            Aliquam lobortis mauris quis mi vestibulum dignissim. Nam et felis
            in arcu condimentum consequat. Phasellus lectus nibh, suscipit et
            risus quis, eleifend lacinia ligula.
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

;<ModalExample />

```
Using responsiveFullScreen

```js
const Button = require('../Button').default

class ModalExample extends React.Component {
  constructor() {
    super()
    this.state = { isModalOpen: false }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ isModalOpen: true })
  }

  handleCloseModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpenModal}>Open modal</Button>

        <Modal
         isOpen={this.state.isModalOpen}
         title="Modal title"
         responsiveFullScreen
         centered
         bottomBar={
            <div className="nowrap">
                <span className="mr4">
                    <Button variation="tertiary" onClick={this.handleCloseModal}>Action 1</Button>
                </span>
                <span>
                    <Button variation="secondary" onClick={this.handleCloseModal}>Action 2</Button>
                </span>
            </div>
          }
        onClose={this.handleCloseModal}>
          <p>
            Phasellus eu magna ut arcu dignissim finibus ut ut sapien. Sed vitae
            diam non est congue lacinia vel id elit. Praesent convallis
            convallis justo, elementum laoreet magna congue sed. Cras sodales,
            augue nec tincidunt facilisis, nunc nisi gravida metus, ac fringilla
            metus tellus in ligula. Nulla arcu ipsum, placerat pellentesque
            gravida a, dictum at urna. Proin quis orci nec quam tempor venenatis
            sit amet vitae justo. Nam imperdiet mattis nulla id malesuada. Donec
            condimentum sem vel lorem vulputate, quis tristique lectus semper.
            In maximus sodales sapien vitae porttitor. Duis sodales metus a
            pellentesque laoreet. Donec placerat massa turpis, quis consectetur
            nisl consequat at. Donec sed purus efficitur, fringilla diam et,
            rutrum turpis. Proin tincidunt augue id ligula cursus sollicitudin.
            Suspendisse semper fermentum pulvinar.
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

;<ModalExample />
```
