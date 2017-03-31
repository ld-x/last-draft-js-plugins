import {colors} from './colors'

const styleMap = {}
colors.map((c, i) => {
  styleMap[`color-${c.replace('#', '')}`] = { color: c }
})
export default styleMap
