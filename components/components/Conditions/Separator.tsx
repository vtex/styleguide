import React from 'react'

const SEPARATOR_LINE_OPTICAL_COMPENSATION = '32px'

type Props = {
  label?: string
}

const Separator: React.FC<Props> = ({ label }) => {
  return (
    <div
      style={{ width: `calc(100% + ${SEPARATOR_LINE_OPTICAL_COMPENSATION})` }}
      className="flex flex-row w-100 nowrap items-center mv3 nl5">
      <hr className="ma0 b--black-10 bb bb-0 w-50" />
      {label && <span className="gray ph3 dib bg-white">{label}</span>}
      <hr className="ma0 b--black-10 bb bb-0 w-50" />
    </div>
  )
}

export default Separator
