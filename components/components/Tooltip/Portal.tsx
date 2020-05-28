import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import { setRef } from '../utils/react'

function getContainer(container) {
  container = typeof container === 'function' ? container() : container
  // eslint-disable-next-line react/no-find-dom-node
  return ReactDOM.findDOMNode(container)
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

const propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
    PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  ]),
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func,
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = (props: PropTypes.InferProps<typeof propTypes>, ref) => {
  const { children, container, onRendered } = props
  const [mountNode, setMountNode] = React.useState(null)

  useEnhancedEffect(() => {
    setMountNode(getContainer(container) || document.body)
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

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode
}

Portal.propTypes = propTypes

export default React.forwardRef<
  HTMLElement,
  PropTypes.InferProps<typeof propTypes>
>(Portal)
