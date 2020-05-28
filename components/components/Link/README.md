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
  <p className="lh-copy gray">
    At the moment the customer completes the purchase, the purchased items go to
    the status Reservation Authorized in inventory. Here it's indicated that
    these items will not be sold more than once, but they are not yet taken out
    of stock: this reservation will fall if payment is not approved within the
    reservation's expiration date. Understand how this deadline is defined in
    the article{' '}
    <Link href="https://help.vtex.com/tutorial/como-a-reserva-funciona">
      How Reservation Works
    </Link>
    .
  </p>
  <p>
    <Link
      href="https://help.vtex.com/tracks/orders--2xkTisx4SXOWXQel8Jg8sa/6axzVCJECyHPGHzYjWDR52"
      target="_blank"
      mediumWeigth>
      The reservation | Orders
    </Link>
  </p>
</div>
```

Within an unordered list:

```js
<div>
  <p className="t-heading-2 c-on-base pb3 fw3">Order flow</p>
  <ul className="t-body c-on-base mb7 lh-copy">
    <li>
      <Link href="#">Marketplaces and Sellers</Link>
    </li>
    <li>
      <Link href="#">Marketplace Order Flow</Link>
    </li>
    <li>
      <Link href="#">Seller Order Flow</Link>
    </li>
    <li>
      <Link href="#" mediumWeigth>
        Complete Order Flow
      </Link>
    </li>
  </ul>
</div>
```
