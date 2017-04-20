import React, { PropTypes, Component } from 'react'
import jsx from 'react-jsx'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { arduinoLight } from 'react-syntax-highlighter/dist/styles'

class CodeEmbed extends Component {
  constructor (props) {
    super(props)
    this.state = this.getComponentFromProps(props)

    this.handleShowCode = this.handleShowCode.bind(this);
  }

  componentDidMount () {
    this.setState(this.getComponentFromProps(this.props))
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.getComponentFromProps(nextProps))
  }

  handleShowCode (e) {
    e.preventDefault()
    this.setState(prevState => ({
      showCode: !prevState.showCode
    }));
  }

  getComponentFromProps (props) {
    const regex = /\import\s+(.+)?(?:\s+from\s+)[\'"]([^"\']+)["\']?/gm // eslint-disable-line
    const {children} = props
    if (regex.test(children) && props.lang != 'disable-import') {
      const imports = parseImport(children)
      const {obj: objRequire, code} = imports
      return {
        code,
        components: this.callRequires(props, objRequire),
        showCode: props.showCode || false,
      }
    }
    return {
      components: null,
      code: children,
      showCode: props.showButton ? false : true
    }
  }

  callRequires (props, objRequire) {
    try {
      let requirePath = resolvePath(props)
      const components = {}

      Object.keys(objRequire).forEach((key) => {
        const modulePath = objRequire[key].file.replace(/^\.+/, '')

        let isFullPath = /(\/*.+\/){1,}/.test(modulePath)
        requirePath = isFullPath ? 'onda/src' : requirePath
        const reactRequire = require('vtex.onda/packages/' + requirePath + modulePath)
        const exportModel = objRequire[key].export
        components[key] = reactRequire[exportModel]
      })
      return components
    } catch (e) {
      return null
    }
  }

  render () {
    const {components, code} = this.state
    const client = components ? jsx.client(code, {}) : null
    if(components) components['React'] = React

    return (
      <section className="mb3">
        {components ? (
          <div className="w-100 pa4 ba b--black-10 br2">
            {client ? client(components) : null}
          </div>
        ) : null}

        {this.state.showCode ? (
        <SyntaxHighlighter
          language="html"
          style={arduinoLight}
          customStyle={{
            background: '#f7f7f7',
            borderRadiusBottomLeft: '5px',
            borderRadiusBottomRight: '5px',
            borderRadiusTopLeft: '0px',
            borderRadiusTopRight: '0px',
            margin: '0px',
            marginTop: '-3px',
            fontSize: '14px',
            lineHeight: '190%',
            padding: '1.5em',
            border: '1px solid #EDEDED',
          }}
        >
          {code}
        </SyntaxHighlighter>
         ) : null}

        {components || this.props.showButton ? (
          <div className="cf">
          <a href="#" className="link bg-black-10 gray fr pa2 dim" onClick={this.handleShowCode}>
          {this.state.showCode ? 'Close code' : 'Show code'}
          </a>
          </div>
        ) : null}
      </section>
    )
  }
}

export default CodeEmbed

const resolvePath = () => {
  const {route} = global.__RUNTIME__
  if (route === 'element') {
    const {element} = global.__RUNTIME__.placeholders.element.params
    return 'onda/src/' + element
  }

  if (route === 'component') {
    const {component} = global.__RUNTIME__.placeholders.component.params
    return `${component}/src/`
  }
}

const parseImport = (snippet) => {
  const obj = {}
  let match
  const regex = /\import\s+(.+)?(?:\s+from\s+)[\'"]([^"\']+)["\']?/gm // eslint-disable-line
  const rgxBrakes = /[\{\}]+/gm

  while ((match = regex.exec(snippet)) != null) {
    let isDefault = /[\{\}]+/gm.test(match[1])
    let callInstance = match[1].replace(/[\{\}\s]+/gm, '')
    let imports = callInstance.split(',')
    imports.forEach(function(element, index) {
      obj[element] = { file: match[2], export: !isDefault ? 'default' : element }
    })
  }

  const code = snippet.replace(regex, '').replace(/^\s*\n/gm, '')

  return { obj, code }
}

CodeEmbed.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.any.isRequired,
  showButton: PropTypes.bool,
  showCode: PropTypes.bool,
}
