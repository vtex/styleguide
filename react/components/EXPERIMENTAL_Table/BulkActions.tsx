import React, { FC } from 'react'
import csx from 'classnames'

import Button from '../../Button'
import ButtonWithIcon from '../../ButtonWithIcon'
import ActionMenu from '../../ActionMenu'
import Close from '../icon/Close'

import {
  ORDER_CLASSNAMES,
  NAMESPACES,
  BULK_ACTIONS_HEIGHT,
  BULK_ACTIONS_TRANSITION,
} from './constants'
import useTableBulkActions from './stateContainers/bulkActions'

const BulkActions: FC<BulkActionsProps> = ({
  texts,
  main,
  totalItems,
  others,
  data,
}) => {
  const {
    bulkState,
    selectAllRows,
    deselectAllRows,
    hasBulkActions,
    hasPrimaryBulkAction,
    hasSecondaryBulkActions,
  } = data
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
        height: hasRowsSelected ? BULK_ACTIONS_HEIGHT : 0,
        overflow: hasRowsSelected ? 'auto' : 'hidden',
        transition: BULK_ACTIONS_TRANSITION,
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
        {texts.selectAll && texts.allRowsSelected && (
          <span className="mr2">
            {bulkState.allLinesSelected ? (
              texts.allRowsSelected(<span className="b">{totalItems}</span>)
            ) : (
              <Button onClick={() => selectAllRows()}>
                <span className="ttu">{`${texts.selectAll} ${totalItems}`}</span>
              </Button>
            )}
          </span>
        )}

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
  data: ReturnType<typeof useTableBulkActions>
}

export default BulkActions
