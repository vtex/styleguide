Usage

```js
;<div>
  <div className="mb6">
    <Collapsible header={<span>Here goes your header</span>}>
      <span>Here goes your content</span>
    </Collapsible>
  </div>
  <div>
    <Collapsible
      header={
        <span>
          Here goes your <strong>muted</strong> header
        </span>
      }
      muted>
      <span>Here goes your content</span>
    </Collapsible>
  </div>
</div>
```

"Read-more" like section example

```js
const Input = require('../Input').default
;<div>
  <div className="mb3">
    <Input label="Name" />
  </div>
  <div className="mb5 mt5">
    <Collapsible
      header={<span className="c-action-primary">Advanced naming</span>}
      initiallyOpened>
      <div className="mb3">
        <Input label="Surname" />
      </div>
      <div className="mb3">
        <Input label="Nickname" />
      </div>
    </Collapsible>
  </div>
  <div className="mb3">
    <Input label="Email" prefix={<span>@</span>} />
  </div>
</div>
```

Align

```js
const PageBlock = require('../PageBlock').default
;<div>
  <div className="bg-muted-5 pa8">
    <PageBlock
      title="Collapsible alignment"
      subtitle="Use right alignment only in small width scenarios."
      variation="half">
      <div>
        <Collapsible header={<span>Recurrence settings</span>}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            dictum, eros nec posuere elementum, magna risus semper lorem, id
            consequat felis enim non arcu. Integer odio metus, hendrerit eget
            viverra id, pharetra vel ex. Fusce in dapibus nisl. Cras vel leo
            pharetra, vestibulum leo sed, mattis lectus. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Maecenas in velit nec sem
            efficitur tempor ac tincidunt sem. Sed convallis diam quis magna
            viverra, dignissim rutrum enim venenatis. Integer sollicitudin est
            eget erat ultricies, ut eleifend odio pretium. Sed efficitur
            pellentesque purus, ut dignissim dui congue semper. Proin id nulla
            tempus, condimentum nulla non, accumsan tortor. Aenean consectetur
            lectus sed tellus viverra, vitae finibus erat dapibus. In pretium
            orci orci, eu tempus tortor blandit ut.
          </p>
        </Collapsible>
      </div>
      <div>
        <Collapsible header={<span>Recurrence settings</span>} align="right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            dictum, eros nec posuere elementum, magna risus semper lorem, id
            consequat felis enim non arcu. Integer odio metus, hendrerit eget
            viverra id, pharetra vel ex. Fusce in dapibus nisl. Cras vel leo
            pharetra, vestibulum leo sed, mattis lectus. Interdum et malesuada
            fames ac ante ipsum primis in faucibus. Maecenas in velit nec sem
            efficitur tempor ac tincidunt sem. Sed convallis diam quis magna
            viverra, dignissim rutrum enim venenatis. Integer sollicitudin est
            eget erat ultricies, ut eleifend odio pretium. Sed efficitur
            pellentesque purus, ut dignissim dui congue semper. Proin id nulla
            tempus, condimentum nulla non, accumsan tortor. Aenean consectetur
            lectus sed tellus viverra, vitae finibus erat dapibus. In pretium
            orci orci, eu tempus tortor blandit ut.
          </p>
        </Collapsible>
      </div>
    </PageBlock>
  </div>
</div>
```
