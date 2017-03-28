import React from 'react';

import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';

import {
  AddImageButton,
  AddEmbedButton,
  AddGifButton
} from '../../../../draft-js-mega-buttons/src/'

import BlockTypeSelect from '../BlockTypeSelect';

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState, theme, store, openModal, closeModal }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    theme={theme}
    store={store}
    openModal={openModal}
    closeModal={closeModal}
    structure={[
      HeadlineOneButton,
      HeadlineTwoButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      AddImageButton,
      AddEmbedButton,
      AddGifButton
    ]}
  />
);

export default DefaultBlockTypeSelect;
