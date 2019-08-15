Usage:

- VTEX IO: <span className="c-muted-1">`import <IconName> from 'vtex.styleguide'`</span>
- npm: <span className="c-muted-1">`import <IconName> from '@vtex/styleguide/lib/icon/<IconName>'`</span>

```js
/*
  The following code is just for the table above to be rendered.
  To use the Icon components one need only to import and instanciate it.

  Usage:
    * VTEX IO: import <IconName> from 'vtex.styleguide'
    * npm: import <IconName> from '@vtex/styleguide/lib/icon/<IconName>'

  !!!!!! DO NOT IMPORT LIKE BELOW !!!!!!
*/

const ICONS = {
  ArrowBack: require('./ArrowBack').default,
  ArrowDown: require('./ArrowDown').default,
  ArrowUp: require('./ArrowUp').default,
  Bars: require('./Bars').default,
  Calendar: require('./Calendar').default,
  CaretDown: require('./CaretDown').default,
  CaretLeft: require('./CaretLeft').default,
  CaretRight: require('./CaretRight').default,
  CaretUp: require('./CaretUp').default,
  Check: require('./Check').default,
  Clear: require('./Clear').default,
  Clock: require('./Clock').default,
  Close: require('./Close').default,
  Cog: require('./Cog').default,
  Columns: require('./Columns').default,
  Copy: require('./Copy').default,
  Delete: require('./Delete').default,
  Deny: require('./Deny').default,
  Minus: require('./Minus').default,
  Density: require('./Density').default,
  Download: require('./Download').default,
  Edit: require('./Edit').default,
  ExternalLink: require('./ExternalLink').default,
  ExternalLinkMini: require('./ExternalLinkMini').default,
  Failure: require('./Failure').default,
  Filter: require('./Filter').default,
  Grid: require('./Grid').default,
  Help: require('./Help').default,
  InlineGrid: require('./InlineGrid').default,
  Link: require('./Link').default,
  OptionsDots: require('./OptionsDots').default,
  Plus: require('./Plus').default,
  PlusLines: require('./PlusLines').default,
  Printer: require('./Printer').default,
  Save: require('./Save').default,
  Search: require('./Search').default,
  ShoppingCart: require('./ShoppingCart').default,
  Success: require('./Success').default,
  TableFilter: require('./TableFilter').default,
  Upload: require('./Upload').default,
  User: require('./User').default,
  VisibilityOff: require('./VisibilityOff').default,
  VisibilityOn: require('./VisibilityOn').default,
  Warning: require('./Warning').default,
  Info: require('./Info').default,
}
const DEMO_SIZE = 20
const DEMO_LABEL = 'pb3 code c-muted-1 f6'
const TOTAL_ICONS_PER_LINE = 6
class IconsTable extends React.PureComponent {
  render() {
    const completeIconsArray = Object.keys(ICONS).sort((a, b) =>
      a < b ? -1 : a > b ? 1 : 0
    )
    const totalLines = Math.ceil(
      completeIconsArray.length / TOTAL_ICONS_PER_LINE
    )
    const chunkedIconsMatrix = []
    for (var i = 0; i < totalLines; i++) {
      const rangeStart = TOTAL_ICONS_PER_LINE * i
      chunkedIconsMatrix[i] = completeIconsArray.slice(
        rangeStart,
        rangeStart + TOTAL_ICONS_PER_LINE
      )
    }

    return (
      <table className="w-100">
        <tbody>
          {chunkedIconsMatrix.map((iconsLine, row) => (
            <tr key={`icon-table-row-${row}`}>
              {iconsLine.map((icon, cell) => {
                const IconComponent = ICONS[icon]
                return (
                  <td key={`icon-table-cell-${row}-${cell}`}>
                    <div className={DEMO_LABEL}>{icon}</div>
                    <IconComponent size={DEMO_SIZE} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
;<IconsTable />
```
