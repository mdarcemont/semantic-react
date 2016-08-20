import React from 'react';
import ReactDOM from 'react-dom';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import EventListener from 'react-event-listener';
import shallowCompare from 'react-addons-shallow-compare';
import { isNodeInRoot } from '../../utilities';
import SidebarElement from './sidebarelement';
import AnimationProps from '../../animationUtils';

export default class Sidebar extends React.Component {
    static propTypes = {
        ...SidebarElement.propTypes,
        ...AnimationProps.propTypes,
        /**
         * Callback from outside sidebar click
         */
        onRequestClose: React.PropTypes.func
    };
    static defaultProps = {
        ...SidebarElement.defaultProps,
        onRequestClose: () => {}
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
            closing: false,
            width: 1
        };

        this.sidebar = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            if (nextProps.visible) {
                this.setState({ visible: true, closing: false });
            } else {
                this.setState({ visible: false, closing: true });
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

    /**
     * Return animation style
     * @param interpolatedStyle
     * @returns {{width: number}}
     */
    getAnimationStyle(interpolatedStyle) {
        return { width: interpolatedStyle.width };
    }

    /**
     * Dimensions was changed
     * @param dimensions
     */
    onMeasure = (dimensions) => {
        if (dimensions && dimensions.width && dimensions.width !== this.state.width) {
            this.setState({ width: dimensions.width });
        }
    }

    /**
     * Render sidebar element
     * @param animationStyle Animation style
     * @returns {*}
     */
    renderSidebar(animationStyle) {
        const {
            component,
            defaultClasses,
            children,
            onOutsideClick,
            style,
            onRequestClose,
            ...other
        } = this.props;

        const sidebarStyle = {
            ...style,
            ...animationStyle
        };

        return (
            <Measure
              accurate
              whitelist={['width']}
              onMeasure={this.onMeasure}
            >
                <Sidebar.Components.SidebarElement
                  visible={this.state.visible || (!this.state.visible && this.state.closing)}
                  key="sidebar"
                  ref={ref => this.sidebar = ref}
                  style={sidebarStyle}
                  {...other}
                >
                    {children}
                </Sidebar.Components.SidebarElement>
            </Measure>
        );
    }
    render() {
        const { visible } = this.props;

        let motionStyle;
        if (visible) {
            motionStyle = {
                width: spring(this.state.width)
            };
        } else {
            motionStyle = {
                width: spring(0)
            };
        }

        return (
            <div>
                <EventListener target={document} onMouseDown={this.onOutsideClick} onTouchStart={this.onOutsideClick}/>
                <Motion defaultStyle={this.initialAnimation} style={motionStyle} onRest={this.onAnimationRest}>
                    {interpolatedStyle => {
                        const animationStyle = this.getAnimationStyle(interpolatedStyle);
                        return this.renderSidebar(animationStyle);
                    }
                  }
                </Motion>
            </div>
        );
    }
}
