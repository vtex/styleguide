import { LineProps } from 'recharts'
const colors = [
    '#EE7850',
    '#4CAABF',
    '#9F50B6',
    '#479A5E'
]

const defaultProps: LineProps = {
    type: 'monotone',
    dataKey: 'y',
    strokeWidth: 3,
    dot: false,
}

export { colors, defaultProps }