import React, { FC } from 'react'
import classNames from 'classnames'

import Button from '../../Button'
import ButtonWithIcon from '../../ButtonWithIcon'
import ActionMenu from '../../ActionMenu'
import Close from '../../icon/Close'

import useTableContext from '../hooks/useTableContext'

const BulkActions: FC = () => {
  const {
    bulkState,
    selectAllRows,
    deselectAllRows,
    bulkActions,
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
      className={classNames(
        'flex flex-row justify-between bg-action-primary c-on-action-primary br3 br--top ph4',
        {
          pv4: hasRowsSelected,
        }
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
                onClick={() =>
                  bulkActions.main.handleCallback(bulkActionsReturnedParameters)
                }>
                {bulkActions.main.label}
              </Button>
            </div>
          )}
          {hasSecondaryBulkActions && (
            <ActionMenu
              label={bulkActions.texts.secondaryActionsLabel}
              buttonProps={{ variation: 'secondary', size: 'small' }}
              options={bulkActions.others.map(el => ({
                label: el.label,
                onClick: () => el.handleCallback(bulkActionsReturnedParameters),
              }))}
            />
          )}
        </div>
      )}
      <div className="tr flex flex-row items-center">
        {!bulkState.allLinesSelected && bulkActions && bulkActions.texts && (
          <span className="mr4 c-muted-4">
            {bulkActions.texts.rowsSelected(selectedRowsLength)}
          </span>
        )}
        <span className="mr2">
          {bulkState.allLinesSelected ? (
            bulkActions &&
            bulkActions.texts &&
            bulkActions.texts.allRowsSelected(
              <span className="b">{bulkActions.totalItems}</span>
            )
          ) : (
            <Button onClick={() => selectAllRows()}>
              <span className="ttu">
                {bulkActions &&
                  `${bulkActions.texts && bulkActions.texts.selectAll} ${
                    bulkActions.totalItems
                  }`}
              </span>
            </Button>
          )}
        </span>
        <ButtonWithIcon icon={<Close />} onClick={() => deselectAllRows()} />
      </div>
    </div>
  )
}

export default BulkActions
