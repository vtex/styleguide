Designing in VTEX is very similar to designing for Styleguide, but not they're not the same.


#### Should my component go to Styleguide?
If there's a high chance your component will be reused by other teams, then yes. Now, the thing is that it's not always easy to find this out, since you'll be having to _talk with people_. Our weekly rituals are designed in a way so that it should be easy to discuss these questions with the rest of Styleguide users. And if you attend often you'll start to see that everyone is in the same boat! :)

Now, not every component and pattern that you need in a specific product needs to be turned into a Styleguide component. Some special snowflakes are sometimes needed for some special projects. However be mindful that this comes with the cost of special design and development time, so choose your battles!


#### What is a Component
These are the elements that are expected to be designed for a component before it's merged into the Design System:

* **Visual specs**: how does it look like? What are the colors, sizes and margins? Everything should be detailed to the pixel level.
* **Interactions**: what are all possible interactions with this component? Every click, hover and focus state should be intentional.
* **Variations and states**: which alternative states this component may reach? What are possible configurations one can do to change a little bit how it looks and behaves to better fit specific scenarios?
* **Props design**: in the React jargon, props are parameters you pass to 
* **Documentation**: write a quick summary of what the component does, a lista of Do's and Don'ts, and optionally a list of related existing components.
* **Implementations**: the actual code that implements all of that. In our case it's all React, but in the future there might be other platforms to support.


#### Benchmarking
Studying other awesome Design Systems is a great way of projecting ourselves to what we could be in the future — and choose to either go there or not. Seeing how other big companies have approached specific components can give us ideas of how to generalize and scale our own design decisions.

```jsx noeditor
<div className="w-two-thirds mv7 hover-card center">
    <a
      href="https://docs.google.com/document/d/1-L3xllgWx1nF6mhOryHMw4o8d1_3-AKtC9pGO2VywBg/edit#"
      className="link c-on-base">
      <Card>
        <div className="flex flex-row items-center">
            <div className="w-20 tc">
                <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'> <g className='nc-icon-wrapper' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' fill='none' stroke='#f71963' strokeMiterlimit='10'> <line data-color='color-2' x1='10' y1='16' x2='20' y2='16' /> <line data-color='color-2' x1='40' y1='8' x2='40' y2='24' /> <line data-color='color-2' x1='20' y1='32' x2='30' y2='32' /> <line data-color='color-2' x1='50' y1='24' x2='50' y2='40' /> <line data-color='color-2' x1='10' y1='48' x2='20' y2='48' /> <line data-color='color-2' x1='40' y1='40' x2='40' y2='56' /> <line data-color='color-2' x1='26' y1='16' x2='29' y2='16' /> <line data-color='color-2' x1='36' y1='32' x2='39' y2='32' /> <line data-color='color-2' x1='26' y1='48' x2='29' y2='48' /> <rect x='2' y='8' stroke='#1c1c1c' width='50' height='16' /> <rect x='12' y='24' stroke='#1c1c1c' width='50' height='16' /> <rect x='2' y='40' stroke='#1c1c1c' width='50' height='16' /> </g> </svg>
            </div>
            <div className="w-80">
                <p className="f5">
                  Check out our Benchmarking Guide for our own curated list of awesome Design Systems to draw inspiration from.
                </p>
            </div>
        </div>
      </Card>
    </a>
  </div>
```


#### Design tokens
Tokens are like code variables, but for design. Making sure you understand the system will enable you to create components that are automatically themable and can be used in the most diverse applications.

<div className="center pv6">
  ![](./tokens.png)
</div>

Tokenizing sometimes can be tricky, especially if your customizing on top of a third-party solution. Although it's imperative for Storefront components, Admin-only ones are not that obligatory. We hope to define these boundaries better in the future.

Keep tuned for a coming documentation on how our Token system works.


#### Figma Design Kit
Since early 2018 Figma has been the Design tool we chose to use in VTEX. It's a vector-based tool focused in UI, just like Sketch. Although much more recent than its main competitor, it's already the second most used tool by the UX community in the world. It's main advantages are being totally web-based, which means you can access it via any browser. It's also natively multiplayer, enabling new ways of working in collaboration with other people and maintaining complex, collaborative projects.

Part of the native features of the tool is the support for reusable components and styles, which made it the perfect tool for us to create our Design System.

```jsx noeditor
<div className="w-two-thirds mv7 hover-card center">
    <a
      href="https://www.figma.com/file/a94lX91ZmYGIDBxvb8shwLn8/VTEX-Styleguide"
      className="link c-on-base">
      <Card>
        <div className="flex flex-row items-center">
            <div className="w-20 tc">
                <img className="h3" src="https://cdn.freebiesupply.com/logos/large/2x/figma-1-logo-png-transparent.png" />
            </div>
            <div className="w-80">
                <p className="f5">
                  Check out reusable Styles and Components in our Figma Design Kit.
                </p>
            </div>
        </div>
      </Card>
    </a>
  </div>
```

If you're new to Figma we highly suggest the [Youtube Figma Channel](https://youtu.be/T0kRCTOX0zY) for hands-on tutorials on how to get started.