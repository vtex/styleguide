Alerts are notifications of **mild to high priority**. They may inform the user about things they should know or explain a problem and the user a solution. It may be triggered by a user action or not.

### Do

- Alerts should be shown at the top of the page or section they apply to, filling the full container width respecting some minimum little margins.
- Do provide actions for users to address when it ads value to the user's workflow. Alerts are also a helping hand.
- Do use semantic colors that have a clear and contextualized meaning in your application, but keep in mind that due to its mild to high priority, that success message may not apply here. If that's the case, you might be looking for Toasts.

### 👎 Don'ts

- Never dismiss automatically an Alert. If dismissible, a user action is required.

### Related components

For low-priority notification prefer a <a href="#/Components/Notification/ToastProvider">Toast</a>.

<br />
<hr>
<br />
 

The **Alert** component can be used in **Success**, **Warning** and **Error** scenarios. 

### Success
Use this when the user's action had a successful outcome.

```js
  <Alert type="success" onClose={() => console.log('Closed!')}>
    Your new product was created with success.
  </Alert>
```

### Warning
Use this when user needs to know about some important info before taking any decision.

```js
  <Alert type="warning" onClose={() => console.log('Closed!')}>
    Proceed with caution. Deleting this promotion is irreversible.
  </Alert>
```

### Error
Use this when something went wrong after performing an action. 

```js
  <Alert type="error" onClose={() => console.log('Closed!')}>
    You can't delete this product.
  </Alert>
```

### Large texts
You can insert large amounts of text in an Alert. However, try to be as concise and clear as possible, as you are helping your user to understand what happened.

```js
  <Alert type="warning" onClose={() => console.log('Closed!')}>
    Changes you make in your product info can take at least two hours to be updated in all of your channels. Please take this into consideration before making any changes.
  </Alert>
```

### Actions
You can associate an action to an Alert.

```js
  <Alert
    type="error"
    action={{ label: 'Go back', onClick: () => console.log('Went back!') }}
    onClose={() => console.log('Closed!')}>
    You don't have permission to change this Payment Method.
  </Alert>
```

### Using ref

```js
const Button = require('../Button').default
const alertRef = React.createRef()

;<div>
  <Alert ref={alertRef} type="warning" onClose={() => console.log('Closed!')}>
    Click on the button below to focus on (scroll to) the alert
  </Alert>
  <div className="pt4">
    <Button
      onClick={() =>
        alertRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }>
      Focus
    </Button>
  </div>
</div>
```
