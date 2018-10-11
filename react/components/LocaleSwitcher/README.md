Dropdown selector for locale selection. There's also a Container for it, the `LocaleSwitcherContainer`, which feeds the current selected locale and the callback function for locale selection from `context`, which is the standart application for this component.

Simple use

```js
initialState = { value1: '', value2: '', value3: '' }
;<div>
  <LocaleSwitcher
    availableLocales={[
      {text: 'EN', id: 'en-US'},
      {text: 'ES', id: 'es-AR'},
      {text: 'PT', id: 'pt-BR'},
    ]}
    currentLocale="pt-BR"
    switchLocale={() => {}}
  />
</div>
````
