import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Table from '../Table'
import Pagination from '../Pagination'
import InputSearch from '../InputSearch'
import Button from '../Button'
import IconDownload from '../icon/Download'
import IconUpload from '../icon/Upload'

class ResourceList extends PureComponent {
  handleInputSearchSubmit = e => {
    this.props.inputSearch.onSubmit && this.props.inputSearch.onSubmit(e)
  }

  render() {
    const {
      table,
      actions: { download, upload },
      pagination,
      inputSearch,
    } = this.props
    const showdownload = download && download.label
    const showupload = upload && upload.label

    return (
      <div className="vtex-resourceList__container">
        <div className="mb5 flex flex-row justify-between w-100">
          <div id="toolbar">
            {showdownload && (
              // eslint-disable-next-line react/jsx-handler-names
              <Button
                variation="tertiary"
                size="small"
                onClick={download.handleCallback}
              >
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconDownload color="currentColor" />
                  </span>
                  {download.label}
                </span>
              </Button>
            )}
            {showupload && (
              // eslint-disable-next-line react/jsx-handler-names
              <Button
                variation="tertiary"
                size="small"
                onClick={upload.handleCallback}
              >
                <span className="flex align-baseline">
                  <span className="mr3">
                    <IconUpload color="currentColor" />
                  </span>
                  {upload.label}
                </span>
              </Button>
            )}
          </div>
          {inputSearch && (
            <form className="w-30" onSubmit={this.handleInputSearchSubmit}>
              <InputSearch {...inputSearch} />
            </form>
          )}
        </div>

        <Table
          {...table}
          containerClass="vh-100"
          containerHeight={36 + 64 * table.items.length}
        />

        {pagination && <Pagination {...pagination} />}
      </div>
    )
  }
}

ResourceList.defaultProps = {
  actions: {},
}

ResourceList.propTypes = {
  table: PropTypes.shape({
    items: PropTypes.array,
    schema: PropTypes.object,
  }),
  actions: PropTypes.shape({
    download: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
    upload: PropTypes.shape({
      label: PropTypes.string,
      handleCallback: PropTypes.func,
    }),
  }),
  pagination: PropTypes.shape({
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    currentItemFrom: PropTypes.number,
    currentItemTo: PropTypes.number,
    textOf: PropTypes.string,
    totalItems: PropTypes.number,
  }),
  inputSearch: PropTypes.shape({
    onSubmit: PropTypes.func,
  }),
}

export default ResourceList
