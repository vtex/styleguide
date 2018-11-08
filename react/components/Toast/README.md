#### Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success. 

### 👍 Dos

- Toasts are always self-dismissing, but users should be allowed to dismiss by themselves as well.
- Keep messages in a low to mild priority spectrum. Toasts are intended to be either neutral or positive.

### 👎 Don'ts

- Do not present critical or high priority actions on a Toast. If that's the case, you might consider using [Alerts](#alert) instead.
- Due to its low to mild priority usage and dismissability, warning and error semantic styles do not apply to Toasts.

```js
const ToastProvider = require('./index').ToastProvider
const ToastConsumer = require('./index').ToastConsumer

const App = () => (
  // Wrap the entire application on a toast provider
  <ToastProvider positioning="window">
    <Content />
  </ToastProvider>
)

const Content = () => (
  // Wrap the components that are going to display toasts
  // on a ToastConsumer, with a function as a child, as
  // the example below:
  <div>
    <div className="mb5">Click on a button to show the corresponding toast</div>
    <div className="mb8">
      <ToastConsumer>
        {({ showToast }) => (
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
                onClick={() =>
                  showToast({
                    message: 'The bread has been inserted into the toaster',
                    action: {
                      label: 'Undo',
                      onClick: () => alert('Bread removed from toaster'),
                    },
                  })
                }>
                With action
              </Button>
            </div>
            <div className="mr5">
              <Button
                size="small"
                variation="secondary"
                onClick={() =>
                  showToast({
                    message:
                      'The toast is done, with a layer of butter on top, along with a nice cup of coffee.',
                    action: {
                      label: 'Thanks',
                      onClick: () => {},
                    },
                  })
                }>
                Long text
              </Button>
            </div>
          </div>
        )}
      </ToastConsumer>
    </div>

    <div className="mb5">Toast duration and control</div>
    <ToastConsumer>
      {({ showToast, hideToast }) => (
        <div className="flex mb5">
          <div className="mr5">
            <Button
              size="small"
              variation="secondary"
              onClick={() =>
                showToast({
                  message: 'This message lasts 30 seconds',
                  duration: 30000,
                })
              }>
              30 seconds
            </Button>
          </div>
          <div className="mr5">
            <Button
              size="small"
              variation="secondary"
              onClick={() =>
                showToast({
                  message: 'This message stays here until closed',
                  duration: Infinity,
                })
              }>
              Permanent
            </Button>
          </div>
          <div className="mr5">
            <Button size="small" variation="danger" onClick={hideToast}>
              Close all toasts
            </Button>
          </div>
        </div>
      )}
    </ToastConsumer>

    <div className="mb5">
      Using with ToastMessage component so you can call immediately on render
    </div>
    <ToastConsumer>
      {({ ToastMessage }) => <ShowToastWithReact ToastMessage={ToastMessage} />}
    </ToastConsumer>
  </div>
)

class ShowToastWithReact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.duration = 3000
  }

  handleClick() {
    const { active } = this.state
    this.setState({ active: true })
    setTimeout(() => {
      this.setState({ active: false })
    }, this.duration)
  }

  render() {
    const { active } = this.state
    const { ToastMessage } = this.props
    return (
      <div className="mr5">
        <Button size="small" variation="secondary" onClick={this.handleClick}>
          Show Toast
        </Button>
        {active ? (
          <ToastMessage key="ToastMessage" duration={this.duration}>
            {`This message stays here for ${this.duration / 1000}s`}
          </ToastMessage>
        ) : null}
      </div>
    )
  }
}

;<App />
```
