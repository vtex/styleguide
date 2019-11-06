import { LineProps } from 'recharts'

export const colors = [
  '#EE7850',
  '#4CAABF',
  '#9F50B6',
  '#479A5E'
]

type DefaultLineProps = Pick<LineProps, 'type' | 'strokeWidth' | 'dot'>
export const defaultProps: DefaultLineProps = {
  type: 'monotone',
  strokeWidth: 3,
  dot: false,
}

export const tooltipProps = {
  cursor: false,
  labelStyle: {color: '#828282'}
}