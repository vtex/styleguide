#### Conditions works like a filter

 - Conditions component is based on creating statements.

### Statements
 - Statements are composed of 3 basic atoms (subject, verb and object), here are some use cases if you are filtering user data for example:

  - Filtering a specific user by name

    - subject: First Name
    - verb: is
    - object: Jhon Doe

  - Filtering gmail users

    - subject: Email
    - verb: contains
    - object: @gmail.com

### 👍 Dos
- Use clear verbs and subjects, which should be intuitive and provide sufficient context for the user take that decision.
- Initialize it with a default value that makes sense to your needs. (exemple: initial render already with an active filter)

### 👎 Don'ts
- Don't use too complex components as objects for a statement. If your statement object is too complex, maybe you should break it in simpler statements options and the complex case can be contemplated by using multiple simpler statetments.

Default

```js
initialState = { check1: true, check2: false };
<div>
  <Conditions
    checked={state.check1}
    id="option-0"
    label="Option 0"
    name="default-checkbox-group"
    onChange={e => setState({ check1: !state.check1 })}
    value="option-0"
  />
</div>
```

