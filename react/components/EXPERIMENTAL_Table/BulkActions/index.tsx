import React, { FC } from 'react'
import csx from 'classnames'

import Button from '../../Button'
import ButtonWithIcon from '../../ButtonWithIcon'
import ActionMenu from '../../ActionMenu'
import Close from '../../icon/Close'

import useTableContext from '../hooks/useTableContext'
import { ORDER_CLASSNAMES, NAMESPACES } from '../constants'

const BulkActions: FC<BulkActionsProps> = ({
  texts,
  main,
  totalItems,
  others,
}) => {
  const {
    bulkState,
    selectAllRows,
    deselectAllRows,
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,
  } = useTableContext()

  const selectedRowsLength = bulkState.selectedRows.length
  const hasRowsSelected = selectedRowsLength > 0

  const bulkActionsReturnedParameters = bulkState.allLinesSelected
    ? { allLinesSelected: true }
    : { selectedRows: bulkState.selectedRows }

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
        height: hasRowsSelected ? '56px' : 0,
        overflow: hasRowsSelected ? 'auto' : 'hidden',
        transition: 'height 0.2s ease-in-out, padding 0.2s ease-in-out',
      }}>
      {hasBulkActions && (
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
      )}
      <div className="tr flex flex-row items-center">
        {!bulkState.allLinesSelected && (
          <span className="mr4 c-muted-4">
            {texts.rowsSelected(selectedRowsLength)}
          </span>
        )}
        <span className="mr2">
          {bulkState.allLinesSelected ? (
            texts.allRowsSelected(<span className="b">{totalItems}</span>)
          ) : (
            <Button onClick={() => selectAllRows()}>
              <span className="ttu">{`${texts.selectAll} ${totalItems}`}</span>
            </Button>
          )}
        </span>
        <ButtonWithIcon icon={<Close />} onClick={() => deselectAllRows()} />
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
}

export default BulkActions
