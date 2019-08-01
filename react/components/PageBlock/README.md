#### Page blocks are the building blocks of a page. After choosing a layout you can use the Page Blocks to design the page as you will. There are four main kinds of Page blocks, full, Half, Aside and annotated. They are off to be used to fulfill design needs and to display the page content with the due visual hierarchy.

### 👍 Dos

- Use to build a page layout
- Use to create information hierarchy

### 👎 Don'ts

- PageBlock title is not the box title, it’s the title of a whole section. Boxes titles should be inside them.
- Over complicate the header aside. It should be very concise such as a button or a dropdown.

Full

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="full">
    <div />
  </PageBlock>
</div>
```

Half

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="half">
    <div />
    <div />
  </PageBlock>
</div>
```

Aside

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="aside">
    <div />
    <div />
  </PageBlock>
</div>
```

Annotated

```js
<div className="bg-muted-5 pa8">
  <PageBlock variation="annotated" title="Section title" subtitle="Subtitle">
    <div />
  </PageBlock>
</div>
```

With Title and subtitle

```js
<div className="bg-muted-5 pa8">
  <PageBlock
    title="Section"
    subtitle="Some explanation for your section."
    variation="full">
    <div />
    <div />
  </PageBlock>
</div>
```

With Title, subtitle and aside children

```js
const Dropdown = require('../Dropdown').default

;<div className="bg-muted-5 pa8">
  <PageBlock
    title="Section"
    subtitle="Some explanation for your section."
    variation="full"
    titleAside={
      <div className="mt4 flex justify-end">
        <div className="w-60">
          <Dropdown
            options={[
              { value: 'chagall', label: 'Chagall' },
              { value: 'dali', label: 'Dali' },
            ]}
            value="dali"
            onChange={() => {}}
          />
        </div>
      </div>
    }>
    <div />
    <div />
  </PageBlock>
</div>
```

Full-blown example

```js
const Tab = require('../Tabs/Tab').default
const Tabs = require('../Tabs').default
const Dropdown = require('../Dropdown').default
const Input = require('../Input').default
const Button = require('../Button').default
const Table = require('../Table').default

;<div className="bg-muted-5 pa8">
  <PageBlock variation="full">
    <div>
      <h4 className="t-heading-4 mt0"> Fill this form </h4>

      <div className="mb5">
        <Input label="Lorem ipsum" />
      </div>

      <div className="mb5">
        <Input label="Lorem ipsum" />
      </div>

      <div className="mb5">
        <Input label="Lorem ipsum" />
      </div>

      <Button variation="primary">button</Button>
    </div>
  </PageBlock>
  <PageBlock variation="half">
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et
        neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut
        eleifend ligula laoreet vel.
      </p>

      <Button variation="tertiary" collapseLeft>
        button
      </Button>
      <Button variation="tertiary">button</Button>
    </div>
    <div>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et
        neque sit amet urna rhoncus ultrices. Praesent feugiat congue ligula, ut
        eleifend ligula laoreet vel.
      </p>

      <Button variation="tertiary" collapseLeft>
        button
      </Button>
      <Button variation="tertiary">button</Button>
    </div>
  </PageBlock>

  <PageBlock
    variation="full"
    title="Section"
    subtitle="Some explanation for your section. It can be used as a helper text to guide user troughout the interface. ">
    <div>
      <div>
        <div className="mb5">
          <h4 className="t-heading-4 mt0"> List of people </h4>

          <Table
            schema={{
              properties: {
                name: {
                  type: 'string',
                  title: 'Name',
                  width: 200,
                },
                email: {
                  type: 'string',
                  title: 'Email',
                  width: 350,
                },
              },
            }}
            toolbar={{
              inputSearch: {
                value: () => {},
                placeholder: 'Search stuff...',
                onChange: () => {},
                onClear: () => {},
                onSubmit: () => {},
              },
              newLine: {
                label: 'New',
                handleCallback: () => {},
              },
            }}
            pagination={{
              onNextClick: () => {},
              onPrevClick: () => {},
              currentItemFrom: 1,
              currentItemTo: 7,
              onRowsChange: () => {},
              textShowRows: 'Show rows',
              textOf: 'of',
              totalItems: 7,
              rowsOptions: [7],
            }}
            items={[
              {
                email: 'olen.stamm21@yahoo.com',
                name: 'Patrick Rothfuss',
              },
              {
                email: 'junius0@gmail.com',
                name: 'Hurricane Skywalker IV',
              },
              {
                email: 'judd_gulgowski22@yahoo.com',
                name: 'Tom Braddy',
              },
              {
                email: 'catharine.leuschke62@hotmail.com',
                name: 'Momochi Zabuza',
              },
              {
                email: 'candido_ryan@hotmail.com',
                name: 'Freddie Mercury',
              },
              {
                email: 'freda_ritchie26@yahoo.com',
                name: 'Dr. Lempi Mosciski',
              },
              {
                email: 'elissa28@gmail.com',
                name: 'Nikita Feeney',
              },
            ]}
          />
        </div>
      </div>
    </div>
  </PageBlock>
  <PageBlock variation="aside">
    <div>
      <Tabs>
        <Tab label="A tab" active onClick={() => {}} />
        <Tab label="Another tab" onClick={() => {}} />
      </Tabs>
      <p className="t-body lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum
        tellus in mauris aliquet, at vestibulum elit scelerisque. Fusce dapibus
        consectetur scelerisque. Nam vitae orci id metus aliquam efficitur at
        non tortor. Etiam nec tincidunt mi, sit amet ultrices ipsum. Sed mattis
        eu dui at ultrices. Pellentesque sit amet neque in nibh malesuada
        elementum. Integer condimentum, enim non vehicula ultricies, dui eros
        lobortis nunc, id convallis orci est vel nunc. Aenean iaculis vehicula
        turpis sed consequat.
      </p>
      <p className="t-body lh-copy">
        Praesent consequat ligula at auctor lobortis. Ut facilisis, odio ut
        consequat consectetur, enim nisi hendrerit lectus, nec consectetur magna
        ante id arcu. Proin id dolor id enim viverra ornare et ac mauris.
        Integer efficitur egestas magna vel iaculis. Sed faucibus congue nisi,
        cursus porta erat malesuada in. Vestibulum id sollicitudin libero.
        Vivamus eu aliquet ipsum. Proin in rutrum eros.
      </p>
    </div>
    <div>
      <h4 className="t-heading-5 mt0"> Summary </h4>
      <ul className="t-body lh-copy">
        <li> Lorem ipsum </li>
        <li> Lorem ipsum </li>
        <li> Lorem ipsum </li>
        <li> Lorem ipsum </li>
        <li> Lorem ipsum </li>
      </ul>
    </div>
  </PageBlock>
</div>
```
