import React from 'react';

import {
  EmbedModal,
  GifModal
} from '../../../../draft-js-mega-modals/src/'

const getModalByType = (type) => {
  if (type === 'gif') { return GifModal }
  if (type === 'embed') { return EmbedModal }
  return undefined
};

export default getModalByType
