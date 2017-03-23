import React from 'react';
import createEmbedButton from '../../utils/createEmbedButton';

export default createEmbedButton({
  children: (
    <svg width='24' height='24' className='ld-button-embed'>
      <path fill='currentColor' d='M10 9v6l5-3-5-3zm8.222-3H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6z' fillRule='evenodd' />
    </svg>
  ),
});
