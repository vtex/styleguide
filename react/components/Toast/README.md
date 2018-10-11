### Overview
Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success. 

### Dos
- Toasts are always self-dismissing, but users should be allowed to dismiss by themselves as well. 
- Keep messages in a low to mild priority spectrum. Toasts are intended to be either neutral or positive. 

### Don'ts
- Do not present critical or high priority actions on a Toast. If that's the case, you might consider using [Alerts](#alert) instead.
- Due to its low to mild priority usage and dismissability, warning and error semantic styles do not apply to Toasts.


```
const ToastProvider = require('./index').ToastProvider
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
