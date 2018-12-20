#### Conditions works like a filter

 - Conditions component is based on creating statements.

### Statements
 - Statements are composed of 3 basic atoms (subject, verb and object), here are some use cases if you are filtering user data for example:

  - Filtering a specific user by name

    - subject: User Name
    - verb: is
    - object: Jhon Doe

  - Filtering gmail users

    - subject: Email
    - verb: contains
    - object: @gmail.com

### 👍 Dos
- Use clear verbs and subjects, which should be intuitive and provide sufficient context for the user take that decision.
- Initialize it with a default value that makes sense to your needs. (example: initial render already with an active filter)

### 👎 Don'ts
- Don't use too complex components as objects for a statement. If your statement object is too complex, maybe you should break it in simpler statements options and the complex case can be contemplated by using multiple simpler statetments.

Simple

```js
const initialState = {
  statements: [],
  operator: 'all',
}

class SimpleConditionsCase extends React.Component {
  constructor() {
    super()

    this.state = initialState
    this.handleToggleOperator = this.handleToggleOperator.bind(this)
    this.simpleInputObject = this.simpleInputObject.bind(this)
  }

  handleToggleOperator(operator) {
    this.setState({ operator: this.state.operator === 'all' ? 'any' : 'all' })
  }

  simpleInputObject({ statements, values, statementIndex, error }) {
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

  render() {
    const choices = {
      name: {
        label: 'User name',
        verbs: [
          {
            label: 'is',
            value: '=',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
          },
        ],
      },
      email: {
        label: 'Email',
        verbs: [
          {
            label: 'contains',
            value: 'contains',
            object: this.simpleInputObject,
          },
          {
            label: 'is',
            value: '=',
            object: this.simpleInputObject,
          },
          {
            label: 'is not',
            value: '!=',
            object: this.simpleInputObject,
          },
        ],
      },
    };

    return (
      <Conditions
        choices={choices}
        statements={this.state.statments}
        operator="all"
        onChangeOperator={this.handleToggleOperator}
        onChangeStatements={(statements) => this.setState({ statements })}
      />
    )
  }
}
;<SimpleConditionsCase />
```
