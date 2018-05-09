Default

```js
<div>
  <div className="mb5">
    <Alert
      autoClose={3000}
      onClose={() => console.log("Auto closed after 3000ms!")}
    >
      Congrats! Your recovery code was printed and the app authenticator was
      sucessfully validated.
    </Alert>
  </div>
</div>
```

Alerts

```js
<div>
  <div className="mb5">
    <Alert type="success" onClose={() => console.log("Closed!")}>
      Your action was complete!
    </Alert>
  </div>
  
  <div className="mb5">
    <Alert type="warning" onClose={() => console.log("Closed!")}>
      This action is irreversible!
    </Alert>
  </div>
  
  <div>
    <Alert type="error" onClose={() => console.log("Closed!")}>
      You can't delete this item.
    </Alert>
  </div>
</div>
```

