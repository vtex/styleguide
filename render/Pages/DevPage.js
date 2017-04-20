import React, { PropTypes, Component } from 'react'
import Template from '../Template'

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
      return (
        <Template>
          Loading
        </Template>
      )
    }

    if (errorLoadingComponent) {
      return (
        <Template>
          {JSON.stringify(errorLoadingComponent, null, 2)}
        </Template>
      )
    }

    const Component = ExampleComponent.default

    return (
      <Template className="ph4 pv2 mt6-ns">
        <Component />
      </Template>
    )
  }
}

DevPage.propTypes = {
  element: PropTypes.string,
  component: PropTypes.string,
}

