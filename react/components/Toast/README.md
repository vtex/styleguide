```
const ToastProvider = require('./index').ToastProvider
const ToastConsumer = require('./index').ToastConsumer

const App = () => (
  // Wrap the entire application on a toast provider
  <ToastProvider>
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
)


;<App/>

```
