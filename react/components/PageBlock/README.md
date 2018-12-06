#### The building blocks of our Admin pages.

Full 

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="full">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
</div>
```

Half 

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="half">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
</div>
```

Aside 

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="aside">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
    <div>
      <p className="t-body lh-copy">
        It is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
  </PageBlock>
</div>
```

Annotated 

```js
<div className="bg-muted-5 pa8">
  <PageBlock
    variation="annotated"
    title="Header"
    subtitle="Some explanation for your section. It can be used as a helper text to guide user troughout the interface. "
    >
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
</div>
```

Full-blown example

```js
<div className="bg-muted-5 pa8">
  <PageBlock
    variation="full"
    title="Section"
    subtitle="Some explanation for your section. It can be used as a helper text to guide user troughout the interface. "
    >
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
  <PageBlock variation="half">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
  
  <PageBlock
    variation="full"
    title="Another section"
    >
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
  <PageBlock variation="aside">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut eleifend ligula laoreet vel.
      </p>
    </div>
  </PageBlock>
</div>
```