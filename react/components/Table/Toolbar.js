import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import InputSearch from '../InputSearch'
import Button from '../Button'
import ButtonWithIcon from '../ButtonWithIcon'
import Toggle from '../Toggle'
import IconCaretDown from '../icon/CaretDown'
import IconColumns from '../icon/Columns'
import IconDensity from '../icon/Density'
import IconDownload from '../icon/Download'
import IconPlus from '../icon/Plus'
import IconUpload from '../icon/Upload'
const MAX_FIELDS_BOX_HEIGHT = 192
const FIELDS_BOX_ITEM_HEIGHT = 36
const FIELDS_BOX_WIDTH = 292
const EXTRA_ACTIONS_BOX_WIDTH = 199
const BOX_SHADOW_STYLE = { boxShadow: '0px 1px 18px rgba(0, 0, 0, 0.14)' }
const DENSITY_OPTIONS = ['low', 'medium', 'high']
const ICON_OPTICAL_COMPENSATION = { marginTop: '1.5px' }
const LIGHT_ICON_SIZE = 16
const MEDIUM_ICON_SIZE = 14
const HEAVY_ICON_SIZE = 13

class Toolbar extends PureComponent {
  constructor(props) {
    super(props)
    this.fieldsBtnRef = React.createRef()
    this.extraActionsBtnRef = React.createRef()
    this.densityBtnRef = React.createRef()
    this.state = {
      isFieldsBoxVisible: false,
      isExtraActionsBoxVisible: false,
      isDensityBoxVisible: false,
    }
  }

  handleToggleBox = boxKey => {
    const isBoxVisible = this.state[boxKey]
    if (isBoxVisible) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else {
      document.addEventListener('mousedown', this.handleClickOutside)
    }
    this.setState({ [`${boxKey}`]: !isBoxVisible })
  }

  handleClickOutside = e => {
    if (
      // handle clicks outside the show/hide fields btn or box
      this.fieldsBtnRef &&
      this.fieldsBtnRef.current &&
      !this.fieldsBtnRef.current.contains(e.target) &&
      this.state.isFieldsBoxVisible
    ) {
      // closes the box if it's open
      this.handleToggleBox('isFieldsBoxVisible')
    }
    if (
      this.extraActionsBtnRef &&
      this.extraActionsBtnRef.current &&
      !this.extraActionsBtnRef.current.contains(e.target) &&
      this.state.isExtraActionsBoxVisible
    ) {
      this.handleToggleBox('isExtraActionsBoxVisible')
    }
    if (
      this.densityBtnRef &&
      this.densityBtnRef.current &&
      !this.densityBtnRef.current.contains(e.target) &&
      this.state.isDensityBoxVisible
    ) {
      this.handleToggleBox('isDensityBoxVisible')
    }
  }

  calculateFieldsBoxHeight = () => {
    const { schema } = this.props
    const estimate =
      Object.keys(schema.properties).length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  calculateExtraActionsBoxHeight = () => {
    const {
      actions: { extraActions },
    } = this.props
    const estimate = extraActions.actions.length * FIELDS_BOX_ITEM_HEIGHT
    return estimate > MAX_FIELDS_BOX_HEIGHT ? MAX_FIELDS_BOX_HEIGHT : estimate
  }

  handleInputSearchSubmit = e => {
    this.props.actions.inputSearch.onSubmit &&
      this.props.actions.inputSearch.onSubmit(e)
  }

  render() {
    const {
      actions: {
        inputSearch,
        download,
        upload,
        fields,
        extraActions,
        newLine,
        density,
      },
      hiddenFields,
      schema,
      handleHideAllColumns,
      handleShowAllColumns,
      toggleColumn,
      handleToggleDensity,
      selectedDensity,
      loading,
    } = this.props
    const {
      isFieldsBoxVisible,
      isExtraActionsBoxVisible,
      isDensityBoxVisible,
    } = this.state
    const isDownloadVisible = download && download.label
    const isUploadVisible = upload && upload.label
    const isFieldsVisible = fields && fields.label
    const isExtraActionsVisible =
      extraActions && extraActions.label && extraActions.actions.length > 0
    const isNewLineVisible = newLine && newLine.label
    const isDensityVisible =
      density &&
      density.buttonLabel &&
      density.lowOptionLabel &&
      density.mediumOptionLabel &&
      density.highOptionLabel

    return (
      <div id="toolbar" className="mb5 flex flex-row justify-between w-100">
        {inputSearch && (
          <form className="w-30" onSubmit={this.handleInputSearchSubmit}>
            <InputSearch disabled={loading} {...inputSearch} />
          </form>
        )}
        <div className="flex flex-row">
          {isDensityVisible && (
            <div
              id="toggleDensity"
              ref={this.densityBtnRef}
              className="relative">
              <ButtonWithIcon
                icon={
                  <span className="c-on-base" style={ICON_OPTICAL_COMPENSATION}>
                    <IconDensity size={MEDIUM_ICON_SIZE} />
                  </span>
                }
                fullHeight
                disabled={loading}
                variation="tertiary"
                size="small"
                onClick={() => this.handleToggleBox('isDensityBoxVisible')}>
                <span className="c-on-base">{density.buttonLabel}</span>
              </ButtonWithIcon>
              {isDensityBoxVisible && (
                <div
                  className={`absolute ${
                    density.alignMenu === 'right' ? 'right-0' : 'left-0'
                  } z-999 ba b--muted-4 br2 mt2`}
                  style={BOX_SHADOW_STYLE}>
                  <div className="w-100 b2 br2 bg-base">
                    <div
                      style={{ height: 3 * FIELDS_BOX_ITEM_HEIGHT }}
                      className="overflow-scroll">
                      {DENSITY_OPTIONS.map((key, index) => {
                        const isKeySelected = selectedDensity === key
                        return (
                          <div
                            key={index}
                            className={`flex justify-between ph6 pv3 ${
                              isKeySelected ? 'b--emphasis' : 'b--transparent'
                            } pointer hover-bg-muted-5 bl bw1`}
                            onClick={() => {
                              handleToggleDensity(key)
                              this.handleToggleBox('isDensityBoxVisible')
                            }}>
                            <span
                              className={`w-100 ${isKeySelected ? 'fw5' : ''}`}>
                              {density[`${key}OptionLabel`]}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isFieldsVisible && (
            <div
              id="toggleFieldsBtn"
              ref={this.fieldsBtnRef}
              className="relative">
              <ButtonWithIcon
                icon={
                  <span className="c-on-base" style={ICON_OPTICAL_COMPENSATION}>
                    <IconColumns size={MEDIUM_ICON_SIZE} />
                  </span>
                }
                fullHeight
                disabled={loading}
                variation="tertiary"
                size="small"
                onClick={() => this.handleToggleBox('isFieldsBoxVisible')}>
                <span className="c-on-base">{fields.label}</span>
              </ButtonWithIcon>
              {isFieldsBoxVisible && (
                <div
                  className={`absolute ${
                    fields.alignMenu === 'right' ? 'right-0' : 'left-0'
                  } z-999 ba b--muted-4 br2 mt2`}>
                  <div
                    className="w-100 b2 br2 bg-base"
                    style={{
                      ...BOX_SHADOW_STYLE,
                      width: FIELDS_BOX_WIDTH,
                    }}>
                    <div className="flex inline-flex bb b--muted-4 w-100 pl6 pv4">
                      <Button
                        variation="secondary"
                        size="small"
                        onClick={handleShowAllColumns}>
                        {fields.showAllLabel}
                      </Button>
                      <div className="mh4">
                        <Button
                          variation="secondary"
                          size="small"
                          onClick={handleHideAllColumns}>
                          {fields.hideAllLabel}
                        </Button>
                      </div>
                    </div>
                    <div
                      style={{ height: this.calculateFieldsBoxHeight() }}
                      className="overflow-scroll">
                      {Object.keys(schema.properties).map((field, index) => (
                        <div
                          key={index}
                          className="flex justify-between ph6 pv3 pointer hover-bg-muted-5"
                          onClick={() => toggleColumn(field)}>
                          <span className="w-70 truncate">
                            {schema.properties[field].title || field}
                          </span>
                          <Toggle
                            size="small"
                            checked={!hiddenFields.includes(field)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isDownloadVisible && (
            <ButtonWithIcon
              icon={
                <span className="c-on-base">
                  <IconDownload size={MEDIUM_ICON_SIZE} />
                </span>
              }
              disabled={loading}
              variation="tertiary"
              size="small"
              onClick={download.handleCallback}>
              <span className="c-on-base">{download.label}</span>
            </ButtonWithIcon>
          )}
          {isUploadVisible && (
            <ButtonWithIcon
              icon={
                <span className="c-on-base" style={ICON_OPTICAL_COMPENSATION}>
                  <IconUpload size={HEAVY_ICON_SIZE} />
                </span>
              }
              disabled={loading}
              variation="tertiary"
              size="small"
              onClick={upload.handleCallback}>
              <span className="c-on-base">{upload.label}</span>
            </ButtonWithIcon>
          )}
          {isExtraActionsVisible && (
            <div
              id="toggleExtraActionsBtn"
              ref={this.extraActionsBtnRef}
              className="relative">
              <ButtonWithIcon
                icon={
                  <span className="c-on-base">
                    <IconCaretDown height={HEAVY_ICON_SIZE} />
                  </span>
                }
                iconPosition="right"
                disabled={loading}
                variation="tertiary"
                fullHeight
                size="small"
                onClick={() =>
                  this.handleToggleBox('isExtraActionsBoxVisible')
                }>
                <span className="c-on-base">{extraActions.label}</span>
              </ButtonWithIcon>
              {isExtraActionsBoxVisible && (
                <div
                  className={`absolute ${
                    extraActions.alignMenu === 'left' ? 'left-0' : 'right-0'
                  } z-999 ba b--muted-4 br2`}
                  style={BOX_SHADOW_STYLE}>
                  <div
                    className="w-100 b2 br2 bg-base"
                    style={{ width: EXTRA_ACTIONS_BOX_WIDTH }}>
                    <div
                      style={{ height: this.calculateExtraActionsBoxHeight() }}
                      className="overflow-scroll">
                      {extraActions.actions.map((action, index) => (
                        <div
                          key={index}
                          className="flex justify-between ph6 pv3 pointer hover-bg-muted-5"
                          onClick={action.handleCallback}>
                          <span className="w-70 truncate">{action.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {isNewLineVisible && (
            <ButtonWithIcon
              icon={<IconPlus solid size={LIGHT_ICON_SIZE} />}
              disabled={loading}
              variation="primary"
              size="small"
              onClick={newLine.handleCallback}>
              {newLine.label}
            </ButtonWithIcon>
          )}
        </div>
      </div>
    )
  }
}

Toolbar.defaultProps = {
  actions: {
    extraActions: {
      actions: [],
    },
  },
}

Toolbar.propTypes = {
  actions: PropTypes.shape({
    inputSearch: PropTypes.shape({
      onSubmit: PropTypes.func,
    }),
    density: PropTypes.shape({
      buttonLabel: PropTypes.string,
      lowOptionLabel: PropTypes.string,
      mediumOptionLabel: PropTypes.string,
      highOptionLabel: PropTypes.string,
      alignMenu: PropTypes.oneOf(['right', 'left']),
    }),
    fields: PropTypes.shape({
      label: PropTypes.string,
      showAllLabel: PropTypes.string,
      hideAllLabel: PropTypes.string,
      alignMenu: PropTypes.oneOf(['right', 'left']),
    }),
    download: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    upload: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    extraActions: PropTypes.shape({
      label: PropTypes.string,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          handleCallback: PropTypes.func,
        })
      ),
      alignMenu: PropTypes.oneOf(['right', 'left']),
    }),
  }),
  schema: PropTypes.object.isRequired,
  hiddenFields: PropTypes.array,
  toggleColumn: PropTypes.func,
  handleHideAllColumns: PropTypes.func,
  handleShowAllColumns: PropTypes.func,
  handleToggleDensity: PropTypes.func,
  selectedDensity: PropTypes.string,
  loading: PropTypes.bool,
}

export default Toolbar
