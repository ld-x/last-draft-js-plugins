import {EditorState, AtomicBlockUtils} from 'draft-js'

const insertDataBlock = (editorState, data, urlType) => {
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

export default insertDataBlock
