### Overview
Alerts are notifications of mild to high priority. They may inform the user about things they should know or explain a problem and the user a solution. It may be triggered by a user action or not.

### Do
- Alerts should be shown at the top of the page or section they apply to, filling the full container width respecting some minimum little margins.
- Do provide actions for users to address when it ads value to the user's workflow. Alerts are also a helping hand.
- Do use semantic colors that have a clear and contextualized meaning in your application, but keep in mind that due to its mild to high priority, that success message may not apply here. If that's the case, you might be looking for Toasts.

### Don'ts
- Never dismiss automatically an Alert. If dismissable, a user action is required.

### Related components
For low-priority notification prefer a <a href="#toast">Toast</a>.

```js
<div>
  <div className="mb5">
    <Alert type="success" onClose={() => console.log('Closed!')}>
      Your action was complete.
    </Alert>
  </div>

  <div className="mb5">
    <Alert type="warning" onClose={() => console.log('Closed!')}>
      This action is irreversible.
    </Alert>
  </div>
  <div className="mb5">
    <Alert type="error" onClose={() => console.log('Closed!')}>
      You can't delete this item.
    </Alert>
  </div>
  <div>
    <Alert
      type="error"
      action={{ label: 'Go back', onClick: () => console.log('Went back!') }}
      onClose={() => console.log('Closed!')}
    >
      You can't delete this item.
    </Alert>
  </div>
</div>
```
