import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import Input from '../Input'
import Button from '../Button'
import IconDownload from '../icon/Download'

class ResourceList extends PureComponent {
  handlePaginationNext = () => {
    this.props.pagination.onNextClick && this.props.pagination.onNextClick()
  }
  handlePaginationPrev = () => {
    this.props.pagination.onPrevClick && this.props.pagination.onPrevClick()
  }

  render() {
    const { table, exportBtn, pagination } = this.props
    const showExportBtn = exportBtn && exportBtn.show

    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row">
          <Input placeholder="Search..." />

          {showExportBtn && (
            <Button variation="primary" size="small">
              <span className="flex align-baseline">
                <span className="mr3">
                  <IconDownload color="currentColor" />
                </span>
                Export
              </span>
            </Button>
          )}
        </div>

        <Table schema={table && table.schema} items={table && table.items} />

        <Pagination
          currentItemFrom={pagination.currentItemFrom}
          currentItemTo={pagination.currentItemTo}
          textOf={pagination.textOf}
          textShowRows="show rows"
          totalItems={pagination.totalItems}
          onNextClick={this.handlePaginationNext}
          onPrevClick={this.handlePaginationPrev}
        />
      </div>
    )
  }
}

ResourceList.defaultProps = {
  exportBtn: { show: false },
}

ResourceList.propTypes = {
  table: PropTypes.shape({
    items: PropTypes.array,
    schema: PropTypes.object,
  }).isRequired,
  exportBtn: PropTypes.shape({
    show: PropTypes.bool,
  }),
  pagination: PropTypes.shape({
    onNextClick: PropTypes.func.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    currentItemFrom: PropTypes.number.isRequired,
    currentItemTo: PropTypes.number.isRequired,
    textOf: PropTypes.string,
    totalItems: PropTypes.number.isRequired,
  }),
}

export default ResourceList
