import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import IconGlobe from '../icon/Globe'
import IconCaretDown from '../icon/CaretDown'

const findLocale = (currentLocale, availableLocales) => {
  const localeObj = availableLocales.find(
    ({ id }) => id.split('-')[0] === currentLocale.split('-')[0]
  )
  return localeObj || availableLocales[0]
}

class LocaleSwitcher extends Component {
  static propTypes = {
    availableLocales: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.string,
    })),
    currentLocale: PropTypes.string,
    switchLocale: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      opened: false,
      selectedLocale: findLocale(props.currentLocale, props.availableLocales),
    }
  }

  handleButtonClick = () => {
    this.setState(({ opened }) => ({ opened: !opened }))
  }

  handleLocaleClick = ({ target: { id } }) => {
    const [, locale] = id.split('@')

    this.props.switchLocale(locale)
    this.setState({
      opened: false,
      selectedLocale: findLocale(locale, this.props.availableLocales),
    })
  }

  handleBlur = () => {
    this.setState({ opened: false })
  }

  handleMouseDown = e => {
    e.preventDefault()
  }

  render() {
    const { opened, selectedLocale } = this.state
    const listClasses = classnames(
      'absolute z-5 list top-2 w3 ph0 pv2 mh0 mv4 bg-white br2 shadow-02',
      { dn: !opened }
    )
    return (
      <div className="relative h-3em w3 flex items-center ml2 mr3">
        <button
          className="link pa0 mv2 bg-transparent bn flex items-center pointer mr3 near-black"
          onBlur={this.handleBlur}
          onClick={this.handleButtonClick}>
          <IconGlobe size={24} />
          <span className="f5 fw5 pl2 near-black">{selectedLocale.text}</span>
          <div className={opened ? 'rotate-180 pb2 pr2' : 'pb2 pl2'}>
            <IconCaretDown className={opened ? 'rotate-180' : null} size={8} />
          </div>
        </button>
        <ul className={listClasses}>
          {this.props.availableLocales.map(
            ({ id, text }) =>
              id !== selectedLocale.id ? (
                <li
                  key={id}
                  id={`appframe-locale@${id}`}
                  className="pointer f5 pa3 hover-bg-light-silver tc"
                  onClick={this.handleLocaleClick}
                  onMouseDown={this.handleMouseDown}>
                  {text}
                </li>
              ) : null
          )}
        </ul>
      </div>
    )
  }
}

export default LocaleSwitcher
