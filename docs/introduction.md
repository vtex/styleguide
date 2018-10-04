<div class="pa5 br2 bg-washed-red mb6 lh-copy">
  This styleguide is **under construction**. Everything may - and will - break. Use with caution, and avoid for now its use in Production projects if you're not very certain of what you're doing.
</div>

# Getting started

## Styles

VTEX Styleguide uses [VTEX Tachyons](https://vtex.github.io/vtex-tachyons/) as our CSS framework.

**To do:** create a better documentation for our CSS framework to live inside this Styleguide page.

## Install

```sh
yarn add @vtex/styleguide --exact
# or
npm install @vtex/styleguide --save-exact
```

## Contributing

```jsx noeditor
<div className="flex flex-row tc">
    <div className="w-50 mh4 dim">
        <a href="https://github.com/vtex/styleguide/issues" className="link c-on-base">
            <Card>
                <img className="w-20" src="https://image.flaticon.com/icons/svg/25/25231.svg"/>
                <p className="">
                    All tasks, ideas, new components requests and bug trackings are being done on Github. Feel free to bring your ideas there, or pick any issue to contribute on!
                </p>
            </Card>
        </a>
    </div>
    
    <div className="w-50 mh4 dim">
        <a href="https://vtex.slack.com/app_redirect?channel=styleguide-onda" className="link c-on-base">
            <Card>
                <img className="w-20" src="https://cdn.freebiesupply.com/logos/large/2x/slack-1-logo-png-transparent.png"/>
                <p className="">
                    If you're inside VTEX, come join us at the <b>#styleguide-onda</b> Slack channel and at our weekly meetings.
                </p>
            </Card>
        </a>
    </div>
</div>
```


# Patterns

## Component sizes and interface density
Several components in our Styleguide will have different size variations to pick from. To make this choice consider the density of information your interface is employing:

- _High density_ interfaces expose more details and offer more options and decisions, thus are suitable to more technical uses. For example, things like data tables and dashboards might be more appropriately done with high density UIs.

- _Low density_ interfaces focus in simplifying information, fewer decisions to take and are normally easier to use and oriented to less technical uses.

## Visual hierarchy

As a rule of thumb of user interfaces, the visual weight and color contrast of an interface element should be proportional to its importance. A good interface will often have an harmonious balance of weights.

<div class="center mw6 pv6">
  ![](./prominences.png)
</div>

Several of our components offer flexibility in the form of variations of prominency. Some will have predetermined variations, like Buttons, others will give you full freedom of color combinations, like Badges.

To choose the right prominence it's important to understand how important the information or action that component represents is to the context it's in, as well as the overall balance of your design.