#### Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success.

### 👍 Dos
- Toasts are always self-dismissing, but users should be allowed to dismiss by themselves as well.
- Keep messages in a low to mild priority spectrum. Toasts are intended to be either neutral or positive.

### 👎 Don'ts
- Do not present critical or high priority actions on a Toast. If that's the case, you might consider using [Alerts](#alert) instead.
- Due to its low to mild priority usage and dismissability, warning and error semantic styles do not apply to Toasts.


```js
const Button = require('../Button').default
const ToastConsumer = require('./index').ToastConsumer

const App = () => (
  // Wrap the entire application on a toast provider
  <ToastProvider
    positioning="window"
  >
    <Content/>
  </ToastProvider>
)

const Content = () => (
  // Wrap the components that are going to display toasts
  // on a ToastConsumer, with a function as a child, as
  // the example below:
  <div>
    <div className="mb5">
      Click on a button to show the corresponding toast
    </div>
    <div className="mb8">
      <ToastConsumer>
        { ({ showToast }) => (
          <div className="flex">
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={() => showToast('Your toast is ready')}>
                Short text
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'The bread has been inserted into the toaster',
                    action: {
                      label:'Undo',
                      onClick: () =>
                        alert('Bread removed from toaster'),
                    },
                  })
                }
              >
                With action
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'The toast is done, with a layer of butter on top, along with a nice cup of coffee.',
                    action: {
                      label: 'Thanks',
                      onClick: () => {},
                    }
                  })
                }
              >
                Long text
              </Button>
            </div>
          </div>
        )}
      </ToastConsumer>
    </div>

    <div className="mb5">
      Toast duration and control
    </div>
    <div className="mb8">
      <ToastConsumer>
        {({showToast, hideToast}) => (
          <div className="flex">
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'This message lasts 30 seconds',
                    duration: 30000,
                  })
                }
              >
                30 seconds
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'This message stays here until closed',
                    duration: Infinity,
                  })
                }
              >
                Permanent
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'This message stays here until closed programatically',
                    dismissable: false,
                  })
                }
              >
                Undismissable
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="danger"
                onClick={hideToast}
              >
                Close all toasts
              </Button>
            </div>
          </div>
        )}
      </ToastConsumer>
    </div>

    <div className="mb5">
      Toast position
    </div>
    <div className="mb8">
      <ToastConsumer>
        {({showToast, hideToast}) => (
          <div className="flex">
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'Everything you own in the box to the left',
                    duration: 3000,
                    horizontalPosition: 'left'
                  })
                }
              >
                To the left, to the left
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={
                  () => showToast({
                    message: 'All right all right all right',
                    duration: 3000,
                    horizontalPosition: 'right'
                  })
                }
              >
                All right
              </Button>
            </div>
          </div>
        )}
      </ToastConsumer>
    </div>

    <div className="mb5">
      Link on toast action
    </div>
    <ToastConsumer>
      {({showToast, hideToast}) => (
        <div className="flex">
          <div className="mr5">
            <Button
              size="small"
              variation="secondary"
              onClick={
                () => showToast({
                  message: 'Item added to cart',
                  duration: 8000,
                  action: {
                    label: 'See cart',
                    href: 'http://vtex.com',
                    target: '_blank'
                  }
                })
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </ToastConsumer>

  </div>
)


;<App/>

```

```js
  const withToast = require('./index').withToast
  const Input = require('../Input').default
  const debounce = require('lodash/debounce')

  class App extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        value: '',
      }

      this.handleInputChange = this.handleInputChange.bind(this)
      this.showToast = debounce(this.showToast.bind(this), 300)
    }

    handleInputChange(event) {
      this.setState({ value: event.currentTarget.value })
    }

    componentDidUpdate(_, prevState) {
      const { value } = this.state
      if ( prevState.value !== this.state.value ) {
        if (value === ''){
          this.showToast('The text has been erased')
        } else {
          this.showToast(`You typed: “${this.state.value}”`)
        }
      }
    }

    showToast(message) {
      this.props.showToast({ message })
    }

    render() {
      const {value} = this.state
      return (
        <React.Fragment>
          <div className="mb6">
            <h3>Higher-order component</h3>
            For use on component lifecycle methods (componentDidMount, componentDidUpdate, etc)
          </div>
          <Input
            value={value}
            label="Write something below to display a toast"
            onChange={this.handleInputChange}
            placeholder="Type here"
          />
        </React.Fragment>
      )
    }
  }

  const AppWithToast = withToast(App)


  ;<ToastProvider positioning="window">
    <AppWithToast />
  </ToastProvider>
```
