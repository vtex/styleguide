import PropTypes from 'prop-types'
import React, { Component } from 'react'
import LocaleSwitcher from '../LocaleSwitcher'

const locales = [
  {
    text: 'EN',
    id: 'en-US',
  },
  {
    text: 'PT',
    id: 'pt-BR',
  },
  {
    text: 'ES',
    id: 'es-AR',
  },
]

class LocaleSwitcherContainer extends Component {
  static contextTypes = {
    culture: PropTypes.object,
    emitter: PropTypes.object,
  }

  switchLocale = (locale) => {
    this.context.emitter.emit('localesChanged', locale)
  }

  render() {
    return (
      <LocaleSwitcher
        availableLocales={locales}
        currentLocale={this.context.culture.locale}
        switchLocale={this.switchLocale}
      />
    )
  }
}

export default LocaleSwitcherContainer
