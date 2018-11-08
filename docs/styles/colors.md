Color themes are used to reflect a product's style with consistency across all components used on the application. Each color has some specific function when applied to an element on screen. They can be customized to match the app's style guidelines, reflecting their function. 

<!-- Action Colors-->
<div class="f3 fw5 c-on-base pt7 pb5">Action colors</div>
This colors should be applied to interactive elements of an application.

<div class="flex mt3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Primary</div>
</div>
The action-primary color is the color used on the interactive elements of an app. It should drive the user's attention to the tasks that should be done using the app. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Call to action</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Form elements (checkbox, radio buttons)</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Toggles</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-action-primary hover-bg-action-primary active-bg-action-primary c-on-action-primary hover-c-on-action-primary active-c-on-action-primary dib mr3">Aa</div>
    <div class="pa3 br2 c-action-primary hover-c-action-primary active-c-action-primary dib mr5 mv0 ba b--action-primary hover-b-action-primary active-b-action-primary">Aa</div>
</div>

```


<!-- -->

<div class="flex mt3  items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Secondary</div>
</div>
The action-secondary color is used on the less important interactions of an app. It should be visually less prominent in comparison with the action-primary color. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Secondary buttons</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-action-secondary hover-bg-action-secondary active-bg-action-secondary c-on-action-secondary hover-c-on-action-secondary active-c-on-action-success dib mr3">Aa</div>
    <div class="pa3 br2 c-action-secondary hover-c-action-secondary active-c-action-secondary dib mr5 mv0 ba b--action-secondary hover-b-action-secondary active-b-action-secondary">Aa</div>
</div>

```

<!-- -->

<div class="flex mt3  items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Disabled</div>
</div>
Used to indicate the disabled state of an interactive element. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Disabled buttons</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Disabled form elements</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-disabled hover-bg-disabled c-on-disabled active-c-on-disabled primary dib mr3">Aa</div>
    <div class="pa3 br2 c-disabled dib mr5 mv0 ba b--disabled hover-b-disabled active-b-disabled">Aa</div>
</div>
```


<!-- -->

<div class="flex mt3  items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Link</div>
</div>
This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr">Hyper-links</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 c-link hover-c-link active-c-link visited-c-link dib mr5 mv0">Aa</div>
</div>

```


<!-- Feedback Colors-->
<div class="f3 fw5 c-on-base pt7 pb5">Feedback colors</div>
Colors used to facilitate user understanding of some information. Avoid using this colors on other elements that do not carry some feedback purpose. 

<div class="flex mv3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Success</div>
</div>
Success color is used to give the user a positive perception of an information that's being displayed. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Success alerts</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Badges</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Positive trends</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">
Success confirmations such as Order Placed</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-success hover-bg-success active-bg-success c-on-success hover-c-on-success active-c-on-success dib mr3">Aa</div>
    <div class="pa3 br2 bg-success--faded hover-bg-success-faded active-bg-success-faded c-success hover-c-success active-c-success dib mr5 mv0 ba b--success hover-b-success active-b-success">Aa</div>
</div>

```

<div class="flex mv3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Warning</div>
</div>
Warning color is used to inform users that something is not performing as it should or that they need caution before taking some action. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Warning alerts</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">badges</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-warning hover-bg-warning active-bg-warning c-on-warning hover-c-on-warning active-c-on-warning dib mr3">Aa</div>
    <div class="pa3 br2 bg-warning--faded hover-bg-warning-faded active-bg-warning-faded c-warning hover-c-warning active-c-warning dib mr5 mv0 ba b--warning hover-b-warning active-b-warning">Aa</div>
</div>

```

<div class="flex mv3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Danger</div>
</div>
Danger color is used to give users error feedbacks and inform that they need extreme caution before taking some action. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Danger alerts</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Badges</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Danger buttons</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Negative trends</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Error messages</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-danger hover-bg-danger active-bg-danger c-on-danger hover-c-on-danger active-c-on-danger dib mr3">Aa</div>
    <div class="pa3 br2 bg-danger--faded hover-bg-danger-faded active-bg-danger-faded c-danger hover-c-danger active-c-danger dib mr5 mv0 ba b--danger hover-b-danger active-b-danger">Aa</div>
</div>

```

<!-- Emphasis Color-->

<div class="flex mv3 items-center">
    <div class="f3 fw5 c-on-base pv7 mv0 mr5">Emphasis color</div>
</div>

Emphasis color should be used to call user's attention to a relevant but neutral information. It shouldn't be used on interactive elements since it's just a visual reference. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Contextual tabs</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Badges</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Promotional tags</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-emphasis hover-bg-emphasis active-bg-emphasis c-on-emphasis hover-c-on-emphasis active-c-on-emphasis dib mr3">Aa</div>
    <div class="pa3 br2 c-emphasis hover-c-emphasis active-c-emphasis dib mr5 mv0 ba b--emphasis hover-b-emphasis active-b-emphasis">Aa</div>
</div>

```

<!-- Base Color-->
<div class="f3 fw5 c-on-base pt7 pb5">Base color</div>
The colors that will receive most of the app's content. Base colors can only be applied as backgrounds of pages and elements. 

<div class="flex mv3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Base</div>
</div>

The main background color of the app. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Body background</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Modals</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Cards</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-base hover-bg-base active-bg-base c-on-base hover-c-on-base active-c-on-base dib mr3">Aa</div>
</div>

```

<div class="flex mv3 items-center">
    <div class="f5 fw5 c-on-base pv5 mv0 mr5">Base inverted</div>
</div>

The negative color of the base color. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Specific sections' background</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Specific pages' background</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Toasts</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-base--inverted hover-bg-base--inverted active-bg-base--inverted c-on-base--inverted hover-c-on-base--inverted active-c-on-base--inverted dib mr3">Aa</div>
</div>

```

<!-- Muted Color-->
<div class="flex mv3 items-center">
    <div class="f3 fw5 c-on-base pv7 mv0 mr5">Muted Color</div>
</div>

Should be applied to elements that support an app but do not need emphasis. Should have mid to low contrast with the base colors as they are not meant to call attention. Muted-1 is the most contrasting color and muted-5 is the less one. This token should be applied to:

<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Borders</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib mr5">Separators</div>
<div class="pa3 br2 bg-muted-5 c-on-muted-5 mb6 dib">Sections Backgrounds</div>

```jsx 
<div class="flex mv3 items-center">
    <div class="pa3 br2 bg-muted-1 hover-bg-muted-1 active-bg-muted-1 c-on-muted-1 hover-c-on-muted-1 active-c-on-muted-1 dib mr3">Aa</div>
    <div class="pa3 br2 c-muted-1 hover-c-muted-1 active-c-muted-1 dib mr5 mv0 ba b--muted-1 hover-b-muted-1 active-b-muted-1">Aa</div>
    <div class="pa3 br2 bg-muted-2 hover-bg-muted-2 active-bg-muted-2 c-on-muted-2 hover-c-on-muted-2 active-c-on-muted-2 dib mr3">Aa</div>
    <div class="pa3 br2 c-muted-2 hover-c-muted-2 active-c-muted-2 dib mr5 mv0 ba b--muted-2 hover-b-muted-2 active-b-muted-2">Aa</div>
    <div class="pa3 br2 bg-muted-3 hover-bg-muted-3 active-bg-muted-3 c-on-muted-3 hover-c-on-muted-3 active-c-on-muted-3 dib mr3">Aa</div>
    <div class="pa3 br2 c-muted-3 hover-c-muted-3 active-c-muted-3 dib mr5 mv0 ba b--muted-3 hover-b-muted-3 active-b-muted-3">Aa</div>
    <div class="pa3 br2 bg-muted-4 hover-bg-muted-4 active-bg-muted-4 c-on-muted-4 hover-c-on-muted-4 active-c-on-muted-4 dib mr3">Aa</div>
    <div class="pa3 br2 c-muted-4 hover-c-muted-4 active-c-muted-4 dib mr5 mv0 ba b--muted-4 hover-b-muted-4 active-b-muted-4">Aa</div>
    <div class="pa3 br2 bg-muted-5 hover-bg-muted-5 active-bg-muted-5 c-on-muted-5 hover-c-on-muted-5 active-c-on-muted-5 dib mr3">Aa</div>
    <div class="pa3 br2 c-muted-5 hover-c-muted-5 active-c-muted-5 dib mr5 mv0 ba b--muted-5 hover-b-muted-5 active-b-muted-5">Aa</div>    
</div>

```