### Overview
A Badge represents a status or a tag.

### Dos
- Do use semantic colors that have a clear and contextualized meaning in your application, such as _green_ for success and _red_ for errors. However, if your application employs a richer palette with unambiguous usage of colors don't hesitate to use your Badges with them.
- Do play with contrast to convey the visual prominence more suited to your application. Use high contrast for high proeminence, and low contrast for low proeminence.

### Don'ts
- Don't do make the Badge other than the optional close button, otherwise they should always be read-only.
- Don't use color contrast combinations that don't pass Accessibility tests.


**@todo: update examples to use VTEX Tachyons colors without hardcoding them**

Default

```js
<Badge>Pending</Badge>
```

Types 

```js
<span className="mr4">
  <Badge type="error">
    Error
  </Badge>
</span>
<span className="mr4">
  <Badge type="warning">
    Warning
  </Badge>
</span>
<span className="mr4">
  <Badge type="success">
    Success
  </Badge>
</span>
```

Low prominence 

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

Custom colors 

```js
<span className="mr4">
  <Badge bgColor="#F71963" color="#FFFFFF">
    Label
  </Badge>
</span>
<span className="mr4">
  <Badge bgColor="#142032" color="#D6D8E0">
    Label
  </Badge>
</span>
<span className="mr4">
  <Badge bgColor="#00BBD4" color="#FFFFFF">
    Label
  </Badge>
</span>
```