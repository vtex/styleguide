import React from 'react'

interface Props {
 label: string
}

export default function Separator<Props>({ label }) {
  return (
    <div>
      <div
        style={{ width: 'calc(100% + 34px)' }}
        className="flex flex-row w-100 nowrap items-center mv3 nl5">
        <hr className="ma0 b--black-10 bb bb-0 w-50" />
        <span className="gray ph3 dib bg-white">{label}</span>
        <hr className="ma0 b--black-10 bb bb-0 w-50" />
      </div>
    </div>
  )
}
