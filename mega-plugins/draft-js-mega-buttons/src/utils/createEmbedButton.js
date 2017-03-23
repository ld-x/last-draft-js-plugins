import React, { Component } from 'react';

export default ({ children }) => (
  class embedButton extends Component {

    onClick (e) {
      e.preventDefault()
      this.props.toggleModal()
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    render() {
      const { theme } = this.props;
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
          <button
            className={theme.button}
            onClick={::this.onClick}
            type="button"
            children={children}
          />
        </div>

      );
    }
  }
);
