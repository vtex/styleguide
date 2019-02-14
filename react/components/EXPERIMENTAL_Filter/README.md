#### Filters are for filtering

### 👍 Dos
- Filter

### 👎 Don'ts
- Not filter

Filter users example

```js
class MyFilter extends React.Component {
  constructor() {
    super()

    this.state = {
      statements: []
    }
    this.simpleInputObject = this.simpleInputObject.bind(this)
    this.cpfInputObject = this.cpfInputObject.bind(this)
    this.ageInputObject = this.ageInputObject.bind(this)
    this.ageInputRangeObject = this.ageInputRangeObject.bind(this)
  }

  simpleInputObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <Input
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value
          this.setState({ statements })
        }}
      />
    )
  }

  cpfInputObject({ statements, values, statementIndex, error }, shouldValidate = false) {
    const errorMessage = shouldValidate ? error ? 'Invalid CPF' : 'Crazy error' : null
    return (
      <Input
        placeholder="Insert age..."
        type="number"
        errorMessage={errorMessage}
        min={0}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value.replace(/\D/g, '')
          this.setState({ statements })
        }}
      />
    )
  }

  ageInputObject({ statements, values, statementIndex, error }) {
    return (
      <Input
        placeholder="Insert age..."
        type="number"
        min={0}
        max={150}
        value={values}
        onChange={e => {
          statements[statementIndex].object = e.target.value.replace(/\D/g, '')
          this.setState({ statements })
        }}
      />
    )
  }

  ageInputRangeObject({
    statements,
    values,
    statementIndex,
    error,
    extraParams,
  }) {
    return (
      <div className="flex">
        <Input
          placeholder="Age from..."
          errorMessage={
            statements[statementIndex].object &&
            parseInt(statements[statementIndex].object.first) >=
              parseInt(statements[statementIndex].object.last)
              ? 'Must be smaller than other input'
              : ''
          }
          value={values && values.first ? values.first : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.first = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />

        <div className="mv4 mh3 c-muted-2 b">and</div>

        <Input
          placeholder="Age to..."
          value={values && values.last ? values.last : ''}
          onChange={e => {
            const currentObject = statements[statementIndex].object || {}
            currentObject.last = e.target.value.replace(/\D/g, '')

            statements[statementIndex].object = currentObject

            this.setState({ statements })
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <EXPERIMENTAL_Filter
        alwaysVisibleFilters={['name', 'email']}
        statements={this.state.statments}
        options={{
          name: {
            label: 'Name',
            verbs: [
              {
                label: 'is',
                value: '=',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is not',
                value: '!=',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
              },
            ],
          },
          email: {
            label: 'Email',
            verbs: [
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is',
                value: '=',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is not',
                value: '!=',
                object: {
                  renderFn: this.simpleInputObject,
                  extraParams: {},
                },
              },
            ],
          },
          age: {
            label: 'Age',
            verbs: [
              {
                label: 'is',
                value: '=',
                object: {
                  renderFn: this.ageInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'is between',
                value: 'between',
                object: {
                  renderFn: this.ageInputRangeObject,
                  extraParams: {},
                },
              },
            ],
          },
          cpf: {
            label: 'Document',
            verbs: [
              {
                label: 'is',
                value: '=',
                object: {
                  renderFn: this.cpfInputObject,
                  extraParams: {},
                },
              },
              {
                label: 'contains',
                value: 'contains',
                object: {
                  renderFn: obj => this.cpfInputObject(obj, true),
                  extraParams: {},
                },
              },
            ],
          },
        }}
      />
    )
  }
};<MyFilter />
```
