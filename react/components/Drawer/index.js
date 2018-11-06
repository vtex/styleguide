import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Spinner from '../Spinner'
import ArrowBack from '../icon/ArrowBack'
import config from 'vtex-tachyons/config.json'
import Close from '../icon/Close'

const ANIMATION_DURATION = 500

class DrawerBox extends Component {
  constructor(props) {
    super(props)
    this.overlay = React.createRef()
    this.handleClick = this.handleClick.bind(this)
    this.handleEscape = this.handleEscape.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
    document.addEventListener('keydown', this.handleEscape, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
    document.removeEventListener('keydown', this.handleEscape, false)
  }

  handleEscape({ keyCode }) {
    if (keyCode === 27) {
      this.handleClose()
    }
  }

  handleClick(e) {
    if (this.overlay.current.contains(e.target)) {
      // The click was inside the drawer element
      return
    }
    this.handleClose()
  }

  handleClose() {
    // The click was in the overlay area
    const { isOpen, onClose } = this.props
    if (isOpen) { onClose() }
  }

  render() {
    return (
      <div ref={this.overlay} className="flex flex-column items-stretch vh-100">
        { this.props.children }
      </div>
    )
  }
}

class Drawer extends Component {
  state = {
    isVisible: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        this.setState({ isVisible: this.props.isOpen })
      } else {
        setTimeout(() => {
          this.setState({ isVisible: this.props.isOpen })
        }, ANIMATION_DURATION)
      }
    }
  }

  render() {
    const styles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 10000,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        WebkitAnimationDuration: '300ms',
        animationDuration: '300ms',
      },
      drawer: {
        width: '32rem',
        WebkitAnimationDuration: '300ms',
        animationDuration: '300ms',
      },
    }

    const {
      title,
      isOpen,
      loading,
      submit,
      secondAction,
      back,
    } = this.props

    return (
      this.state.isVisible && (
        <div style={styles.overlay} className={`animated ${isOpen ? 'fadeIn' : 'fadeOut'}`}>
          <div className={`bg-white vh-100 right-0 fixed animated ${isOpen ? 'fadeInRight' : 'fadeOutRight'}`} style={styles.drawer}>
            <DrawerBox onClose={back.handleClick} isOpen={isOpen}>
              <div className="flex bg-light-silver">
                <div className="h4 flex flex-column-reverse ph6 pv3 flex-grow-1">
                  <p className="fw4 f4 mb4 mt0">
                    { title }
                  </p>
                  <Button
                    size="small"
                    variation="tertiary"
                    neutral
                    onClick={back.handleClick}
                  >
                    <span
                      className="flex align-baseline relative"
                      style={{ marginLeft: '-16px' }}
                    >
                      <span className="mr3">
                        <ArrowBack color="currentColor" />
                      </span>
                      {back.label}
                    </span>
                  </Button>
                </div>
                <span onClick={back.handleClick} className="mb8 mh6 flex flex-column-reverse pointer">
                  <Close color={config.colors['near-black']} size={17} />
                </span>
              </div>

              <div className="flex-grow-1 ph6 pv7 overflow-scroll">
                { this.props.children }
              </div>

              <div className="bg-light-silver flex flex-row-reverse items-center ph6 pv3">
                <div className="dib ma3">
                  <Button
                    variation="primary"
                    disabled={loading}
                    onClick={submit.handleClick}
                  >
                    {
                      loading
                        ? <Spinner size={16} />
                        : submit.label
                    }
                  </Button>
                </div>
                { secondAction &&
                  <div className="dib ma3">
                    <Button
                      variation="tertiary"
                      disabled={loading}
                      onClick={secondAction.handleClick}
                    >
                      { secondAction.label }
                    </Button>
                  </div>
                }
              </div>
            </DrawerBox>
          </div>
        </div>
      )
    )
  }
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  submit: PropTypes.shape({
    label: PropTypes.string,
    handleClick: PropTypes.func,
  }).isRequired,
  secondAction: PropTypes.shape({
    label: PropTypes.string,
    handleClick: PropTypes.func,
  }),
  back: PropTypes.shape({
    label: PropTypes.string,
    handleClick: PropTypes.func,
  }).isRequired,
}

DrawerBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Drawer
