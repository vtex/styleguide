Usage: <span className="c-muted-1">`import <IconName> from '@vtex/styleguide/lib/icon/<IconName>'`</span>

```js
const ICONS = {
  ArrowBack: require('./ArrowBack').default,
  ArrowDown: require('./ArrowDown').default,
  ArrowUp: require('./ArrowUp').default,
  Bars: require('./Bars').default,
  CaretDown: require('./CaretDown').default,
  CaretLeft: require('./CaretLeft').default,
  CaretRight: require('./CaretRight').default,
  CaretUp: require('./CaretUp').default,
  Check: require('./Check').default,
  Clock: require('./Clock').default,
  Close: require('./Close').default,
  Cog: require('./Cog').default,
  Columns: require('./Columns').default,
  Copy: require('./Copy').default,
  Delete: require('./Delete').default,
  Deny: require('./Deny').default,
  Density: require('./Density').default,
  Download: require('./Download').default,
  Edit: require('./Edit').default,
  ExternalLink: require('./ExternalLink').default,
  ExternalLinkMini: require('./ExternalLinkMini').default,
  Failure: require('./Failure').default,
  Filter: require('./Filter').default,
  Help: require('./Help').default,
  Link: require('./Link').default,
  Plus: require('./Plus').default,
  PlusLines: require('./PlusLines').default,
  Save: require('./Save').default,
  Search: require('./Search').default,
  ShoppingCart: require('./ShoppingCart').default,
  Success: require('./Success').default,
  Upload: require('./Upload').default,
  User: require('./User').default,
  VisibilityOff: require('./VisibilityOff').default,
  VisibilityOn: require('./VisibilityOn').default,
  Warning: require('./Warning').default,
};
const DEMO_SIZE = 20;
const DEMO_LABEL = 'pb3 code c-muted-1 f6';
const TOTAL_ICONS_PER_LINE = 6;
class IconsTable extends React.PureComponent {
  render() {
    const completeIconsArray = Object.keys(ICONS)
    const totalLines = Math.ceil(completeIconsArray.length / TOTAL_ICONS_PER_LINE)
    const chunkedIconsMatrix = []
    for (var i = 0; i < totalLines; i++) {
      const rangeStart = (TOTAL_ICONS_PER_LINE * i)
      chunkedIconsMatrix[i] = completeIconsArray.slice(rangeStart, rangeStart + TOTAL_ICONS_PER_LINE)
    }

    return (
      <table className="w-100">
        <tbody>
          {
            chunkedIconsMatrix.map((iconsLine, row) => {
              return (
                <tr key={`icon-table-row-${row}`}>
                  {
                    iconsLine.map((icon, cell) => {
                      const IconComponent = ICONS[icon]
                      return (
                        <td key={`icon-table-cell-${row}-${cell}`}>
                          <div className={DEMO_LABEL}>{icon}</div>
                          <IconComponent size={DEMO_SIZE} />
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
};<IconsTable />
```
