import React from 'react';

import {
  EmbedModal,
  GifModal,
  EmojiModal,
  LinkModal
} from '../../../../draft-js-mega-modals/src/'

const getModalByType = (type) => {
  if (type === 'gif') { return GifModal }
  if (type === 'embed') { return EmbedModal }
  if (type === 'emoji') { return EmojiModal }
  if (type === 'link') { return LinkModal }

  return undefined
};

export default getModalByType
