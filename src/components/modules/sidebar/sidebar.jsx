import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';
import Portal from 'react-portal';
import EventListener from 'react-event-listener';
import shallowCompare from 'react-addons-shallow-compare';
import { isNodeInRoot } from '../../utilities';
import SidebarElement from './sidebarelement';
import AnimationProps, { getMotionStyle } from '../../animationUtils';

export default class Sidebar extends React.Component {
    static propTypes = {
        ...SidebarElement.propTypes,
        ...AnimationProps.propTypes,
        /**
         * Callback from outside sidebar click
         */
        onRequestClose: React.PropTypes.func,
        /**
         * Callback for sidebar opening
         */
        onSidebarOpened: React.PropTypes.func,
        /**
         * Callback for sidebar closing
         */
        onSidebarClosed: React.PropTypes.func
    };
    static defaultProps = {
        ...SidebarElement.defaultProps,
        onRequestClose: () => {},
        onSidebarOpened: () => {},
        onSidebarClosed: () => {},
        initialAnimation: {
            opacity: 0.5,
            scale: 0.5
        },
        enterAnimation: {
            opacity: spring(1, { stiffness: 300, damping: 40, precision: 1 }),
            scale: spring(1, { stiffness: 300, damping: 25, precision: 1 })
        },
        leaveAnimation: {
            opacity: spring(0, { stiffness: 700, damping: 40, precision: 1 }),
            scale: spring(0.5, { stiffness: 700, damping: 40, precision: 1 })
        }
    };

    /* eslint-disable */
    static Components = {
        SidebarElement: SidebarElement
    };
    /* eslint-enable */

    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible,
            closing: false
        };

        this.sidebar = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            if (nextProps.visible) {
                this.setState({
                    visible: true,
                    closing: false
                });
            } else {
                this.setState({
                    visible: false,
                    closing: true
                });
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // since we're changing state immediately after componentDidUpdate we need to prevent re-rendering loop
        return shallowCompare(this, nextProps, nextState);
    }

    onOutsideClick = (event) => {
        if (!this.state.visible || this.state.closing) {
            return;
        }
        if (!this.sidebar) {
            return;
        }
        if (isNodeInRoot(event.target, ReactDOM.findDOMNode(this.sidebar))) {
            return;
        }
        event.stopPropagation();
        this.props.onRequestClose(event);
    }

    /**
     * Animation completed
     */
    onAnimationRest = () => {
        if (!this.state.visible && this.state.closing) {
            this.setState({ closing: false });
        }
    }

    getAnimationStyle(interpolatedStyle, dimensions) {
        const { onAnimationStyle } = this.props;
        if (onAnimationStyle && typeof onAnimationStyle === 'function') {
            return onAnimationStyle(interpolatedStyle, dimensions, this.state.visible);
        }
        return {
            transform: 'translate3d(0, 0, 0)'
        };
    }

    /**
     * Render sidebar element
     * @param interpolatedStyle Interpolated style
     * @returns {*}
     */
    renderSidebar(interpolatedStyle) {
        const {
            component, defaultClasses, initialAnimation, enterAnimation, leaveAnimation, children, dimmed, onOutsideClick, style, zIndex,
            onSidebarOpened, onSidebarClosed, onRequestClose, onAnimationStyle, ...other
        } = this.props;

        return (
        <Sidebar.Components.SidebarElement {...other}
          visible={this.state.visible || (!this.state.visible && this.state.closing)}
          key="sidebar"
          ref={ref => this.sidebar = ref}
        >
          {children}
        </Sidebar.Components.SidebarElement>
        );
    }
    render() {
        const {
        initialAnimation, enterAnimation, leaveAnimation, zIndex, onSidebarOpened, onSidebarClosed
      } = this.props;

        // Apply layer to portal to prevent clicking outside
        const portalStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: zIndex
        };

        const springAnimationStyle = getMotionStyle(initialAnimation, enterAnimation, leaveAnimation, this.state.visible);
        return (
            <Portal isOpened={this.state.visible || (!this.state.visible && this.state.closing)}
                style={portalStyle}
                onOpen={onSidebarOpened}
                onClose={onSidebarClosed}
            >
              <div>
                <EventListener target={document}
                    onMouseDown={this.onOutsideClick}
                    onTouchStart={this.onOutsideClick}/>
                <Motion defaultStyle={initialAnimation}
                    style={springAnimationStyle}
                    onRest={this.onAnimationRest}
                >
                    {interpolatedStyle => this.renderSidebar(interpolatedStyle)}
                </Motion>
              </div>
            </Portal>
        );
    }
}
