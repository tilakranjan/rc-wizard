import objectAssign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import Locale from './locale/zh_CN';

const noop = () => {};
const PREVIOUS = 'previous';
const NEXT = 'next';
const DONE = 'done';

export default class Wizard extends Component {

  static defaultProps = {
    className: 'wizard',
    locale: Locale,
    displayKey: undefined,
    onDone: noop
  }

  static defaultState = {
    displayingKey: undefined
  }

  constructor(props) {
    super(props);
    const { children } = props;
    this.childrenKeys = [];
    if (children.length > 0) {
      this.childrenKeys = children.map((child) => { return child.key });
    }
    var displayingKey = props.displayKey;
    if (!displayingKey) {
      displayingKey = children[0].key;
    }
    this.state = {
      displayingKey: displayingKey
    }
  }

  render() {
    const { id, className, children, onDone } = this.props;
    return (
      <div id={id} className={className}>
        {
          children.map((child, index) => {
            return this.renderPage(child, index, onDone);
          })
        }
      </div>
    )
  }

  renderPage(child, index, onDone) {
    const {onPrevious, onNext} = child.props;
    const isFirst = this.childrenKeys.indexOf(child.key) === 0;
    const isLast  = this.childrenKeys.indexOf(child.key) === this.childrenKeys.length - 1;
    const newChildProps = {
      oldKey: child.key,
      displayKey: this.state.displayingKey,
      locale: this.props.locale,
      isFirst: isFirst,
      isLast: isLast,
      onPrevious: () => { this.handleSteps(PREVIOUS, onPrevious) },
      onNext: () => { this.handleSteps(NEXT, onNext) },
      onDone: onDone
    };
    return React.cloneElement(child, newChildProps);
  }

  handleSteps(action, callback) {
    const index = this.childrenKeys.indexOf(this.state.displayingKey);
    if (index < 0) {
      return console.error(`Current key ${this.state.displayingKey} seems got mistake, we have ${this.childrenKeys}`);
    }
    var nextKey;
    if (action === PREVIOUS) {
      if (index === 0) {
        return this.state.displayingKey;
      }
      nextKey = this.childrenKeys[index - 1];
    }
    if (action === NEXT) {
      if (index === this.childrenKeys.length - 1) {
        return this.state.displayingKey;
      }
      nextKey = this.childrenKeys[index + 1];
    }
    this.setState({
      displayingKey: nextKey
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
}

Component.propTypes = {
  locale: PropTypes.object.isRequired
}
