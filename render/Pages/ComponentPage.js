import React, { PropTypes, Component } from 'react'
import MarkdownRender from '../Component/MarkdownRender'
import CodeEmbed from '../Component/CodeEmbed'

export default class ComponentPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
    this.loadComponent = this.loadComponent.bind(this)
  }

  componentDidMount () {
    this.loadComponent(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadComponent(nextProps)
  }

  loadComponent (props, state) {
    const { params: { element, component } } = props
    const {loadedComponent, errorLoadingComponent} = this.state
    const currentComponent = element || component
    if ((loadedComponent === currentComponent) || (errorLoadingComponent && errorLoadingComponent.component === currentComponent)) {
      return
    }

    try {
      let componentRequire, markdown, markup, infos, loadPath

      if (element) {
        loadPath = 'vtex.onda/packages/onda/src/' + element
        componentRequire = require('vtex.onda/packages/onda/src/' + element + '/example.js')
        markdown = require('vtex.onda/packages/onda/src/' + element + '/README.md')
        markup = require('!raw-loader!vtex.onda/packages/onda/src/' + element + '/example.js')
        infos = require('vtex.onda/packages/onda/package.json')
      }
      if (component) {
        loadPath = 'vtex.onda/packages/' + component + '/src/'
        componentRequire = require('vtex.onda/packages/' + component + '/src/example.js')
        markdown = require('vtex.onda/packages/' + component + '/src/README.md')
        markup = require('!raw-loader!vtex.onda/packages/' + component + '/src/example.js')
        infos = require('vtex.onda/packages/' + component + '/package.json')
      }

      this.setState({
        path: loadPath,
        title: element || component,
        markup,
        markdown,
        ExampleComponent: componentRequire,
        infos: infos,
        loadedComponent: element || component,
        errorLoadingComponent: null,
      })
    } catch (e) {
      console.error(e)

      this.setState({
        path: null,
        title: null,
        markup: null,
        markdown: null,
        ExampleComponent: null,
        infos: null,
        loadedComponent: element || component,
        errorLoadingComponent: {
          error: e,
          component: element || component,
        },
      })
    }
  }

  render () {
    const {errorLoadingComponent, ExampleComponent, markup: markupFromState, markdown, title, infos} = this.state
    const version = infos ? infos.version : null
    if (errorLoadingComponent) {
      return (
        <div>
          {JSON.stringify(errorLoadingComponent.e, null, 2)}
        </div>
      )
    }

    if (!ExampleComponent) {
      return (
        <div>
          Loading
        </div>
      )
    }

    const Component = ExampleComponent.default
    const markupRegex = /(<div>)([\s\S]*?)(<\/div>)/.exec(markupFromState)
    let lines = markupRegex[2].split('\n')
    lines.splice(0,1)
    lines.splice(-1,1)
    let cutLines = lines.join('\n')
    const markup = cutLines.replace(/^\s{1,8}/gm, '')
    const status = 'Stable'

    return (
      <div>
        <section className="w-100 pa4 pa5-l bg-dark-gray white">
          <h1 className="mb0 pb0">{title}</h1>
          <p className="ma0 pa0 mt1">v{version} <span>{status}</span></p>
        </section>

        <section className="pl4 pr4 pl5-l pr5-l">
          <h4 className="tracked ttu bb pb2 b--black-50 pt4">Example</h4>
          <div className="w-100 pa4 ba b--black-10 br2">
            <Component />
          </div>
          <CodeEmbed showButton={true}>
            {markup}
          </CodeEmbed>
        </section>

        <section className="pl4 pr4 pl5-l pr5-l">
          <MarkdownRender {...this.props} markdown={markdown} />
        </section>
      </div>
    )
  }
}

ComponentPage.propTypes = {
  element: PropTypes.string,
  component: PropTypes.string,
}
