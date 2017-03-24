import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import insertDataBlock from './insertDataBlock'

export default ({ children }) => (
  class imageButton extends Component {

    onClick (e) {
      e.preventDefault()
      ReactDOM.findDOMNode(this.refs.fileInput).click()
    }

    inputChange (e) {
      const file = e.target.files[0]
      const src = window.URL.createObjectURL(file)
      const imageData = {src: src, type: 'placeholder'}
      /* TODO make this generic for drag and drop, add async */
      //this.props.uploadFile(file)
      this.props.setEditorState(insertDataBlock(this.props.getEditorState(), imageData, 'image'))
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

          <div className={theme.addImage}>
            <input
              type='file'
              ref='fileInput'
              onChange={::this.inputChange}
              style={{ display: 'none' }} />
          </div>
        </div>

      );
    }
  }
);
