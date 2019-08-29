import React, { FC, InputHTMLAttributes } from 'react'

import { NAMESPACES } from '../constants'

export type InputCustomProps = InputHTMLAttributes<HTMLInputElement> & {
  input: Element
}

const UNSAFE_InputCustom: FC<InputCustomProps> = ({ input }) => {
  return (
    <span className="order-0 w-40" id={NAMESPACES.TOOLBAR.INPUT_SEARCH}>
      {input}
    </span>
  )
}

export default UNSAFE_InputCustom
