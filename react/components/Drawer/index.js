import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Spinner from '../Spinner'
import ArrowBack from '../icon/ArrowBack'

const ANIMATION_DURATION = 500

class DrawerBox extends Component {
  constructor(props) {
    super(props)
    this.overlay = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }

  handleClick(e) {
    if (this.overlay.current.contains(e.target)) {
      // The click was inside the drawer element
      return
    }

    // The click was in the overlay area
    this.props.onClose()
  }

  render() {
    return (
      <div ref={this.overlay} className="flex flex-column items-stretch vh-100 animated">
        { this.props.children }
      </div>
    )
  }
}

class Drawer extends Component {
  state = {
    isMounted: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        this.setState({ isMounted: this.props.isOpen })
      } else {
        setTimeout(() => {
          this.setState({ isMounted: this.props.isOpen })
        }, ANIMATION_DURATION)
      }
    }
  }

  render() {
    const styles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 10000,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      drawer: {
        width: '32rem',
      },
    }

    const {
      title,
      isOpen,
      loading,
      submit,
      back,
    } = this.props

    return (
      this.state.isMounted && (
        <div style={styles.overlay} className={`animated faster ${isOpen ? 'fadeIn' : 'fadeOut'}`}>
          <div className={`bg-white vh-100 right-0 absolute animated faster ${isOpen ? 'fadeInRight' : 'fadeOutRight'}`} style={styles.drawer}>
            <DrawerBox onClose={back.handleClick}>
              <div className="bg-light-silver h4 flex flex-column-reverse ph6 pv3">
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

              <div className="flex-grow-1 ph6 pv7">
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
  }),
  back: PropTypes.shape({
    label: PropTypes.string,
    handleClick: PropTypes.func,
  }),
}

DrawerBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Drawer
