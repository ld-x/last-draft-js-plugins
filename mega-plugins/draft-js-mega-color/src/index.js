/*
 * Copyright (c) 2016, vace.nz (https://github.com/vacenz)
 *
 * License: MIT
 */

import {colors} from './colors'

const styleMap = {}
colors.map((c, i) => {
  styleMap[`color-${c.replace('#', '')}`] = { color: c }
})
export default styleMap
