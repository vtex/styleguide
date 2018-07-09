A Card is a powerful solution for a visual container, improving the scannabiliy and overall visual organization of a design when well used. Use it to group related groups of information.

It performs best when repeated and when each instance shares a similar structure among each other. Avoid using it to encompass the entirety of a page. Prefer small to medium sizes.

Do use call-to-actions, but avoid having too many of them inside the same card.

Never nest cards inside cards.


Default

```js
<div style={{padding: '80px', color: '#585959', background: '#fafafa'}}>
  <Card>
    <h3>Lorem Ipsum</h3>
    <p>It is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </Card>
</div>
```


Full width

```js
<div style={{padding: '80px', color: '#585959', background: '#fafafa'}}>
  <Card noPadding >
    <h3 className="pl6 pr6 pt6">Spider</h3>
    <img
    width="100%"
    src="//cdn.shopify.com/s/files/1/2426/4557/collections/spider-header123_1800x_c0da37d9-6f9c-4b9e-bcaa-f984f3c869fe_1800x.png?v=1512524794" />
    <p className="pl6 pr6 pb6">It is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
  </Card>
</div>
```
