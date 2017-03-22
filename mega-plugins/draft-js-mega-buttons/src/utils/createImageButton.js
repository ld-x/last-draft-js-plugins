import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import {genKey, EditorState, ContentBlock, Modifier, BlockMapBuilder, AtomicBlockUtils} from 'draft-js'
const { List, Map } = Immutable

const insertDataBlock = (editorState, data) => {
  const urlType = 'image';
  console.log(data)
  let url = data.src
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', data);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );
};


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
      this.props.setEditorState(insertDataBlock(this.props.getEditorState(), imageData))
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
