#### A Card like any container improves scannability of a design when well used. What sets the Card apart is that it has higher visual prominence and invites interactivity with its fancy drop shadow.

### 👍 Dos

- It works best when used as a big button.
- Do use buttons inside it if you need, but keep it simple.

### 👎 Don'ts

- Don't nest cards.
- Avoid using it to encompass the entirety of a page.

### Related components

- In doubt prefer using a simple <a href="#/Components/Containers/Box">Box</a>.

Default

```js
<div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
  <Card>
    <h3>Build for community</h3>
    <p>
      It’s all about being ready to grow and reach new levels. Have a solid
      foundation, modular thinking and flexible essence, and you’re building for
      scale. We are global but we’re audacious enough to aim for the stars.
    </p>
  </Card>
</div>
```

Full width

```js
<div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
  <Card noPadding>
    <h3 className="pl6 pr6 pt6">Our people</h3>
    <img
      width="100%"
      src="https://careers.vtex.com/assets/media/perspectives03.jpg"
    />
    <p className="ph6 pb6">
      At VTEX we believe inclusion inspires innovation. We are committed to
      implement a recruiting process that guarantees equal opportunities for
      all, regardless of ethnicity, gender, disability, sexual orientation,
      gender identity or religion.
    </p>
  </Card>
</div>
```
