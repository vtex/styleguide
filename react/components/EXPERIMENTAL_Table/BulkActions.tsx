import React, { FC, useMemo } from 'react'
import csx from 'classnames'

import Button from '../../Button'
import ButtonWithIcon from '../../ButtonWithIcon'
import ActionMenu from '../../ActionMenu'
import Close from '../icon/Close'

import { ORDER_CLASSNAMES, NAMESPACES } from './constants'
import { MenuAction } from './Toolbar/PopoverMenu'
import { Checkboxes } from '../EXPERIMENTAL_CheckboxTree'

const BULK_ACTIONS_HEIGHT = 56
const BULK_ACTIONS_TRANSITION =
  'height 0.2s ease-in-out, padding 0.2s ease-in-out'

const BulkActions: FC<BulkActionsProps> = ({
  texts,
  main,
  totalItems,
  others,
  checkboxes,
}) => {
  const hasPrimaryBulkAction = !!main && typeof main.onClick === 'function'
  const hasSecondaryBulkActions = !!others && others.length > 0
  const selectedRowsLength = checkboxes.checkedItems.length
  const hasRowsSelected = selectedRowsLength > 0

  const bulkActionsReturnedParameters = {
    selectedRows: checkboxes.checkedItems,
  }

  return (
    <div
      id={NAMESPACES.BULK_ACTIONS}
      className={csx(
        'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
        {
          pv4: hasRowsSelected,
        },
        ORDER_CLASSNAMES.BULK_ACTIONS
      )}
      style={{
        height: hasRowsSelected ? BULK_ACTIONS_HEIGHT : 0,
        overflow: hasRowsSelected ? 'auto' : 'hidden',
        transition: BULK_ACTIONS_TRANSITION,
      }}>
      <div className="flex flex-row">
        {hasPrimaryBulkAction && (
          <div className="mr4">
            <Button
              variation="secondary"
              size="small"
              onClick={() => main.onClick(bulkActionsReturnedParameters)}>
              {main.label}
            </Button>
          </div>
        )}
        {hasSecondaryBulkActions && (
          <ActionMenu
            label={texts.secondaryActionsLabel}
            buttonProps={{ variation: 'secondary', size: 'small' }}
            options={others.map(el => ({
              label: el.label,
              onClick: () => el.onClick(bulkActionsReturnedParameters),
            }))}
          />
        )}
      </div>
      <div className="tr flex flex-row items-center">
        {!checkboxes.isChecked(checkboxes.itemTree) && (
          <span className="mr4 c-muted-4">
            {texts.rowsSelected(selectedRowsLength)}
          </span>
        )}
        {texts.selectAll && texts.allRowsSelected && (
          <span className="mr2">
            {checkboxes.isChecked(checkboxes.itemTree) ? (
              texts.allRowsSelected(<span className="b">{totalItems}</span>)
            ) : (
              <Button onClick={() => checkboxes.toggle(checkboxes.itemTree)}>
                <span className="ttu">{`${texts.selectAll} ${totalItems}`}</span>
              </Button>
            )}
          </span>
        )}

        <ButtonWithIcon
          icon={<Close />}
          onClick={() => checkboxes.toggle(checkboxes.itemTree)}
        />
      </div>
    </div>
  )
}

export type BulkActionsProps = {
  texts: {
    secondaryActionsLabel: string
    rowsSelected: (qty: number) => React.ReactNode
    selectAll: string
    allRowsSelected: (element: React.ReactElement) => React.ReactNode
  }
  totalItems: number
  onChange: Function
  main: MenuAction
  others: Array<MenuAction>
  checkboxes: Checkboxes
}

export default BulkActions
