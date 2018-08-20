import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import Input from '../Input'
import Button from '../Button'
import IconDownload from '../icon/Download'

class ResourceList extends PureComponent {
  render() {
    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row">
          <Input placeholder="Search..." />
          <Button variation="primary" size="small">
            <span className="flex align-baseline">
              <span className="mr3">
                <IconDownload color="currentColor" />
              </span>
              Export
            </span>
          </Button>
        </div>
        <Table
          schema={this.props.tableSchema}
          items={this.props.tableItems}
          indexColumn
        />
        <Pagination
          currentItemFrom={10}
          currentItemTo={20}
          textOf="of"
          textShowRows="show rows"
          totalItems={32}
          onNextClick={e => {
            console.log(e)
          }}
          onPrevClick={e => {
            console.log(e)
          }}
        />
      </div>
    )
  }
}

ResourceList.propTypes = {
  tableItems: PropTypes.array.isRequired,
  tableSchema: PropTypes.object.isRequired,
}

export default ResourceList
