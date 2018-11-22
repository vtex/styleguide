#### A ContextMenu lets a user to perform actions accordingly to the context she is in.

### 👍 Dos
- Use `isDangerous` prop for options that perform damaging actions as deleting something.
- Use `shouldCloseOnClick` prop for auto closing menu after clicking an option.

### Related components
- Consider using a <a href="#/Components/Forms?id=dropdownmenu">DropdownMenu</a> if you want to give a title that names the group of actions you are providing to the user.

Close on click
```js
<div>
  <ContextMenu
    shouldCloseOnClick
    options={[
      {
        label: 'Remove something',
        isDangerous: true,
        handleCallback: () => alert('you are removing something important')
      },
      {
        label: 'Start front engines motors',
        handleCallback: () => alert('beep!')
      },
      {
        label: 'Engage side thrusters heating',
        handleCallback: () => alert('boop!')
      },
      {
        label: 'Commence take off immediatelly',
        handleCallback: () => alert('meerp!')
      },
      {
        label: 'Prepare for Adama maneuver',
        handleCallback: () => alert('Do a barrel roll!')
      },
    ]}
  />
</div>
```
