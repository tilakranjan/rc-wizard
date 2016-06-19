import objectAssign from 'object-assign';
import React, { Component, PropTypes } from 'react';
import {PreviousButton, NextButton, DoneButton} from './Buttons';
import Locale from './locale/zh_CN';

export default class Step extends Component {

  static defaultProps = {
    locale: Locale,
    displayKey: undefined
  };

  renderButtons() {
    const {
      locale,
      isFirst,
      isLast,
      onPrevious,
      onNext,
      onDone
    } = this.props;
    const previousButton = (
      <PreviousButton
        key="previous"
        locale={locale}
        onClick={onPrevious}
      />
    );

    const nextButton = (
      <NextButton
        key="next"
        locale={locale}
        onClick={onNext}
      />
    )

    const doneButton = (
      <DoneButton
        key="done"
        locale={locale}
        onClick={onDone}
      />
    )

    var buttons = [];
    if (isFirst && isLast) {
      buttons = [
        doneButton
      ]
    } else if (isFirst && !isLast) {
      buttons = [
        nextButton
      ]
    } else if (!isFirst && !isLast) {
      buttons = [
        previousButton,
        nextButton
      ]
    } else if (!isFirst && isLast) {
      buttons = [
        previousButton,
        doneButton
      ]
    }

    return (
      <div className="buttons-container">
        {buttons}
      </div>
    )
  }

  render() {
    const { displayKey, children } = this.props;
    var style = {display: 'none'};
    if (displayKey === this.props.oldKey) {
      style = {display: 'block'};
    }
    style = objectAssign(style, this.props.style);
    return (
      <div className="step" style={style}>
        {children}
        <hr />
        {
          this.renderButtons()
        }
      </div>
    )
  }
}
