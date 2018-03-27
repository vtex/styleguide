Default

```js
const modalStyle = require("./style.css");
<div>
  <div className="mb5">
    <Modal
      title="Title"
      innerText="Inner text"
      isOpen={true}
      handleClose={() => console.log("close")}
      style={modalStyle}
    />
  </div>
</div>;
```
