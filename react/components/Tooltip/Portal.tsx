/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  PropsWithChildren,
  ReactNode,
  forwardRef,
  Ref,
  ReactElement,
} from 'react'
import ReactDOM from 'react-dom'

import { setRef } from '../utils/react'

function getContainer(container: any) {
  container = typeof container === 'function' ? container() : container
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container)
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

type Props = PropsWithChildren<{
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: ReactNode
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered?: () => void
}>

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
function Portal(props: Props, ref: Ref<HTMLElement>) {
  const { children, container, onRendered } = props
  const [mountNode, setMountNode] = React.useState<ReactElement | null>(null)

  useEnhancedEffect(() => {
    // @ts-ignore
    setMountNode(getContainer(container) ?? document.body)
  }, [container])

  useEnhancedEffect(() => {
    if (mountNode) {
      setRef(ref, mountNode)
      return () => {
        setRef(ref, null)
      }
    }

    return undefined
  }, [ref, mountNode])

  useEnhancedEffect(() => {
    if (onRendered && mountNode) {
      onRendered()
    }
  }, [onRendered, mountNode])

  return mountNode && mountNode instanceof HTMLElement
    ? ReactDOM.createPortal(children, mountNode)
    : mountNode
}

export default forwardRef<HTMLElement, Props>(Portal)
