import React, { PropTypes, Component } from 'react'

export default class DevPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.loadComponent = this.loadComponent.bind(this)
  }

  componentDidMount () {
    this.loadComponent()
  }

  componentDidUpdate () {
    this.loadComponent()
  }

  loadComponent () {
    const {element, component} = this.props
    const {loadedComponent} = this.state
    const currentComponent = element || component
    if (loadedComponent === currentComponent) {
      return
    }

    require.ensure([], (require) => {
      try {
        let componentRequire

        if (element) {
          componentRequire = require('vtex.onda/packages/onda/src/' + element + '/example.js')
        } else if (component) {
          componentRequire = require('vtex.onda/packages/' + component + '/src/example.js')
        }
        this.setState({
          ExampleComponent: componentRequire,
          loadedComponent: element || component,
          errorLoadingComponent: null,
        })
      } catch (e) {
        this.setState({
          ExampleComponent: null,
          loadComponent: element || component,
          errorLoadingComponent: e,
        })
      }
    })
  }

  render () {
    const {ExampleComponent, errorLoadingComponent} = this.state
    if (!ExampleComponent) {
      return <span>Loading</span>
    }

    if (errorLoadingComponent) {
      return <span>JSON.stringify(errorLoadingComponent, null, 2)</span>
    }

    const Component = ExampleComponent.default

    return <Component />
  }
}

DevPage.propTypes = {
  element: PropTypes.string,
  component: PropTypes.string,
}

