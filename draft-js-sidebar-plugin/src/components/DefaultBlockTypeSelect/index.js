import React from 'react'

import {
  AddImageButton,
  AddEmbedButton,
  AddGifButton,
  AddEmojiButton
} from 'draft-js-buttons-plugin'

import BlockTypeSelect from '../BlockTypeSelect'

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState, theme, store, openModal, closeModal }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    theme={theme}
    store={store}
    openModal={openModal}
    closeModal={closeModal}
    structure={[
      AddImageButton,
      AddEmbedButton,
      AddGifButton,
      AddEmojiButton
    ]}
  />
)

export default DefaultBlockTypeSelect
