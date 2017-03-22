import React from 'react';

import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';

import {AddImageButton} from '../../../../draft-js-mega-buttons/src/'

import BlockTypeSelect from '../BlockTypeSelect';

const DefaultBlockTypeSelect = ({ getEditorState, setEditorState, theme, store }) => (
  <BlockTypeSelect
    getEditorState={getEditorState}
    setEditorState={setEditorState}
    theme={theme}
    store={store}
    structure={[
      HeadlineOneButton,
      HeadlineTwoButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      AddImageButton
    ]}
  />
);

export default DefaultBlockTypeSelect;
