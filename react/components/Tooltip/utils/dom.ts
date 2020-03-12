// From @reach-ui
const props = ['width', 'height', 'top', 'right', 'bottom', 'left']

const rectChanged = (a: any = {}, b: any = {}) =>
  props.some(prop => a[prop] !== b[prop])

const observedNodes = new Map()
let rafId: any = null

const run = () => {
  observedNodes.forEach(state => {
    if (state.hasRectChanged) {
      state.callbacks.forEach((cb: any) => cb(state.rect))
      state.hasRectChanged = false
    }

    return null
  })

  setTimeout(() => {
    observedNodes.forEach((state, node) => {
      if (node) {
        const newRect = node.getBoundingClientRect()
        if (rectChanged(newRect, state.rect)) {
          state.hasRectChanged = true
          state.rect = newRect
        }
      }
      return null
    })
  }, 0)

  rafId = requestAnimationFrame(run)
}

export default (node: any, cb: any) => ({
  observe() {
    const wasEmpty = observedNodes.size === 0
    if (observedNodes.has(node)) {
      observedNodes.get(node).callbacks.push(cb)
    } else {
      observedNodes.set(node, {
        rect: undefined,
        hasRectChanged: true,
        callbacks: [cb],
      })
    }
    if (wasEmpty) run()
  },

  unobserve() {
    const state = observedNodes.get(node)
    if (state) {
      // Remove the callback
      const index = state.callbacks.indexOf(cb)
      if (index >= 0) state.callbacks.splice(index, 1)

      // Remove the node reference
      if (!state.callbacks.length) observedNodes.delete(node)

      // Stop the loop
      if (!observedNodes.size) cancelAnimationFrame(rafId)
    }

    return null
  },
})
