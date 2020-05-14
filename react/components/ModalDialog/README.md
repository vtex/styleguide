### Related Components

- <a href="#/Components/Overlays/Modal">Modal</a>

Default

```js
const Button = require('../Button').default
const Input = require('../Input').default
const useDisclosure = require('../../useDisclosure').default
import { useDisclosure } from '../../utilities'

const ModalDialogExample = () => {
  const { isOpen, onOpen, onClose } = useDisclousure()

  return (
    <div>
      <Button onClick={onOpen}>Open modal</Button>

      <ModalDialog
        centered
        confirmation={{
          onClick: onClose,
          label: 'Send',
        }}
        cancelation={{
          onClick: onClose,
          label: 'Cancel',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-50-ns">
            <p className="f3 f1-ns fw3 gray">
              Discover our unified commerce platform and see your business
              thrive.
            </p>
          </div>
          <div className="w-100 w-50-ns mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <Input placeholder="Name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Last name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Corporate email" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Company" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Annual revenue" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Do you have e-commerce?" size="large" />
            </div>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}

;<ModalDialogExample />
```

Loading

```js
import { useState } from 'react'

const Button = require('../Button').default
const Input = require('../Input').default
import { useDisclosure } from '../../utilities'

const ModalDialogExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState()

  const handleConfirmation = () => {
    setLoading(true)
    setTimeout(() => {
      onClose
      setLoading(false)
    }, 1500)
  }
  return (
    <div>
      <Button onClick={onOpen}>Open modal</Button>

      <ModalDialog
        centered
        loading={true}
        confirmation={{
          onClick: onClose,
          label: 'Send',
        }}
        cancelation={{
          onClick: onClose,
          label: 'Cancel',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-50-ns">
            <p className="f3 f1-ns fw3 gray">
              Discover our unified commerce platform and see your business
              thrive.
            </p>
          </div>
          <div className="w-100 w-50-ns mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <Input placeholder="Name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Last name" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Corporate email" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Company" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Annual revenue" size="large" />
            </div>
            <div className="w-100 mv6">
              <Input placeholder="Do you have e-commerce?" size="large" />
            </div>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}

;<ModalDialogExample />
```

Dangerous

```js
import { useState } from 'react'

const Button = require('../Button').default
const Input = require('../Input').default
import { useDisclosure } from '../../utilities'

const ModalDialogExample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState()

  const handleConfirmation = () => {
    setLoading(true)
    setTimeout(() => {
      onClose
      setLoading(false)
    }, 1500)
  }

  return (
    <div>
      <Button onClick={onOpen}>Open modal</Button>

      <ModalDialog
        centered
        size="small"
        loading={loading}
        confirmation={{
          onClick: handleConfirmation,
          label: 'Yes remove all data',
          isDangerous: true,
        }}
        cancelation={{
          onClick: onClose,
          label: 'Cancel',
        }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="">
          <p className="f3 f3-ns fw3 gray">
            Are you sure you want to delete your account?
          </p>
          <p>
            This action is irreversible. It will remove all your orders, cards,
            addresses and tickets.
          </p>
        </div>
      </ModalDialog>
    </div>
  )
}

;<ModalDialogExample />
```
