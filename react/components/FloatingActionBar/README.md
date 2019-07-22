#### Floating Action Bar allow users to easily find the save button while editing an instance of an entity.

### 👍 Dos

- Only use when the action affects the whole page.
- The actions on this component may be used to help user cancel or proceed a new change.
- This component can be used anywhere but it will always show at the bottom of the page.

### Usage

See the action bar at the bottom of this page.

```js
class ActionBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }
  render() {
    return (
      <FloatingActionBar
        save={{
          label: 'save',
          isLoading: this.state.loading,
          onClick: () => {
            this.setState({ loading: true })
            setTimeout(() => {
              alert('This was invoked because save was pressed')
              this.setState({ loading: false })
            }, 2000)
          },
        }}
        cancel={{
          label: 'cancel',
        }}
      />
    )
  }
}

;<ActionBar />
```
