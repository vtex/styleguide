```
const Toast = require('./index').default
const ToastContainer = require('./index').ToastContainer
const showToast = require('./index').showToast

;<div>
  <Button onClick={()=>showToast('toast')}>
    Abrir toast
  </Button>
  <Button onClick={()=>showToast('toast2', {
    label:'Undo',
    onClick:()=>alert('oi'),
  })}>
    Abrir toast 2
  </Button>

  <ToastContainer />
</div>
```
