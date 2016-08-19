import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import classNames from 'classnames';
import DefaultProps from './../../defaultProps';

/**
 * Modal element
 */
export default class SidebarElement extends React.Component {
    static propTypes = {
        ...DefaultProps.propTypes,
        /**
         * 	Should sidebar be visible
         */
        visible: React.PropTypes.bool,
        inverted: React.PropTypes.bool,
        vertical: React.PropTypes.bool,
        top: React.PropTypes.bool,
        right: React.PropTypes.bool,
        bottom: React.PropTypes.bool,
        left: React.PropTypes.bool,
        thin: React.PropTypes.bool,
        veryThin: React.PropTypes.bool,
        wide: React.PropTypes.bool,
        veryWide: React.PropTypes.bool,
        labeled: React.PropTypes.bool,
        icon: React.PropTypes.bool,
        menu: React.PropTypes.bool
    };

    static defaultProps = {
        ...DefaultProps.defaultProps,
        visible: true
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const { component, defaultClasses, children, visible, inverted, vertical,
          top, right, bottom, left, thin, veryThin, wide, veryWide, labeled, icon, menu, push, overlay, ...other } = this.props;
        let Component = component;

        other.className = classNames(other.className, this.getClasses());
        return (
            <Component {...other}>
                {children}
            </Component>
        );
    }

    getClasses() {
        let classes = {
            ui: this.props.defaultClasses,
            visible: this.props.visible,
            sidebar: this.props.defaultClasses,
            inverted: this.props.inverted,
            vertical: this.props.vertical,
            top: this.props.top,
            right: this.props.right,
            bottom: this.props.bottom,
            left: this.props.left,
            thin: this.props.thin,
            'very thin': this.props.veryThin,
            wide: this.props.wide,
            'very wide': this.props.veryWide,
            labeled: this.props.labeled,
            icon: this.props.icon,
            menu: this.props.menu,
            push: this.props.push,
            overlay: this.props.overlay
        };
        classes[this.props.size] = !!this.props.size;
        return classes;
    }
}
