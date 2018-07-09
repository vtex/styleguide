Alerts are used to inform about important changes or persistent conditions. They’re one of the most prominent ways to communicate information to the user. Banners show at the top of the page or section they apply to and should fill the full container width with some little margins.

Don't use Alerts for asynchronous notifications, such as giving user feedback about an API request's success of failure. In this case a Toast would be more appropriate (work in progress).


Default

```js
<div>
  <div className="mb5">
    <Alert
      autoClose={3000}
      onClose={() => console.log("Auto closed after 3000ms!")}
    >
      Your recovery code was printed and the app authenticator was sucessfully validated.
    </Alert>
  </div>
</div>
```

Alerts

```js
<div>
  <div className="mb5">
    <Alert type="success" onClose={() => console.log("Closed!")}>
      Your action was complete.
    </Alert>
  </div>
  
  <div className="mb5">
    <Alert type="warning" onClose={() => console.log("Closed!")}>
      This action is irreversible.
    </Alert>
  </div>
  
  <div>
    <Alert type="error" onClose={() => console.log("Closed!")}>
      You can't delete this item.
    </Alert>
  </div>
</div>
```

