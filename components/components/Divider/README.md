# Horizontal

```jsx
const Card = require('../Card').default
;<div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
  <Card>
    <h2 className="mt0 mb6">Tolerance</h2>
    <p className="f6 gray ma0">
      Allows orders to be placed even if they pass X% of the account's credit
      limit. Tolerance is set per account.
    </p>
    <div className="mv6">
      <Divider orientation="horizontal" />
    </div>
    <h2 className="mt0 mb6">Automatic account creation</h2>
    <p className="f6 gray ma0">
      Allows users who have not been previously credited to close a purchase.
    </p>
  </Card>
</div>
```

# Vertical

```jsx
const Card = require('../Card').default
;<div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
  <Card>
    <div className="flex">
      <div className="w-40">
        <h2 className="mt0 mb6">Cards</h2>
        <p className="f6 gray ma0">
          In Cards, your customer is given autonomy to manage credit cards
          related to his account, and can add, remove or edit credit card data.
        </p>
      </div>
      <div
        style={{ flexGrow: 1 }}
        className="flex items-stretch w-20 justify-center">
        <Divider orientation="vertical" />
      </div>
      <div className="w-40">
        <h2 className="mt0 mb6">Personal data</h2>
        <p className="f6 gray ma0">
          In this section, the user can manage their personal data registered on
          the store site.
        </p>
      </div>
    </div>
  </Card>
</div>
```
