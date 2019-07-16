#### A Link is an anchor tag.

### 👍 Dos

- Use them for links. When user needs to take an action, swtich for the <a href="#/Components/Forms/Button">Button</a> component.
- Use normal and medium weights when outside a paragraph. Designers can choose which one is the best depending on the context and layout.

### 👎 Don'ts

- Use medium weigth when the link is inline, eg, within a paragraph.

### Related components

- <a href="#/Components/Forms/Button">Button</a>.

Within a paragraph:

```js
<div>
  <p>
    It is simply dummy text of the printing and typesetting industry. Lorem
    Ipsum has been the{' '}
    <Link href="https://www.vtex.com/">industry's standard</Link> dummy text
    ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
  </p>
  <p>
    <Link href="https://www.vtex.com/" target="_blank" mediumWeigth>
      External link
    </Link>
  </p>
</div>
```

Within an unordered list:

```js
<ul>
  <li>
    <Link href="#">Item 1</Link>
  </li>
  <li>
    <Link href="#" mediumWeigth>
      Item 2
    </Link>
  </li>
  <li>
    <Link href="#">Item 3</Link>
  </li>
</ul>
```
