ContextMenu

```js
<div>
    <ContextMenu
      align="left"
      options={[
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
