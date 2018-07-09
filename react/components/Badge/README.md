Use badges for a visual representation status. It's most powerful when used with semantic colors that have a clear and contextualized meaning in your application, such as _green_ for success and _red_ for errors. However, if your application employs a richer palette with unambiguous usage of colors don't hesitate to use your badges with them.

The component is agnostic in respect to color combinations, so be mindful of potential accessibility issues concerning color contrast. After identifying accessible contrast combinations, feel free to play with them to convey the proeminence you want the badges to have in your design: high contrast for high proeminence, and low contrast for low proeminence.

Badges should always be read-only, never interactive.


**@todo: update examples to use VTEX Tachyons colors without hardcoding them**

Default

```js
<Badge>Pending</Badge>
```

High contrast examples

```js
<div>
  <span className="mr4">
    <Badge bgColor="#FF4C4C" color="#fff">
      Error
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#FFB100" color="#fff">
      Warning
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#8BC34A" color="#fff">
      Success
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#979899" color="#fff">
      Neutral
    </Badge>
  </span>
</div>
```

Low contrast examples

```js
<div>
  <span className="mr4">
    <Badge bgColor="#FFE6E6" color="#FF4C4C">
      Error
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#FFF6E0" color="#FFB100">
      Warning
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#EAFCE3" color="#8BC34A">
      Success
    </Badge>
  </span>
  <span className="mr4">
    <Badge bgColor="#E3E4E6" color="#979899">
      Neutral
    </Badge>
  </span>
</div>
```
