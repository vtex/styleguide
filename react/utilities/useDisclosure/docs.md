#### useDisclosure is a React custom hook to help handle open, close and toogle scenarios.

### Parameters

| Name   | Type      | Default | Description             |
| ------ | --------- | ------- | ----------------------- |
| `open` | `boolean` | `false` | `isOpen` initial state. |

### Return Object

| Name       | Type      | Default | Description                                               |
| ---------- | --------- | ------- | --------------------------------------------------------- |
| `isOpen`   | `boolean` | `false` | Show or hide the component.                               |
| `onClose`  | `func`    |         | Changes `isOpen` to `false`.                              |
| `onOpen`   | `func`    |         | Changes `isOpen` to `true`.                               |
| `onToggle` | `fnuc`    |         | Function that toggles `isOpen` between `true` and `false` |

### Modal Example

```js
import useDisclosure from './index'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

const ModalWithUseDisclosure = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        Modal with useDisclosure()
      </Modal>
    </>
  )
}
;<ModalWithUseDisclosure />
```

### Toggle Example

```js
import useDisclosure from './index'
import Toggle from '../../components/Toggle'

const ToggleWithUseDisclosure = () => {
  const { isOpen, onToggle } = useDisclosure()
  return <Toggle checked={isOpen} onChange={onToggle} />
}
;<ToggleWithUseDisclosure />
```
