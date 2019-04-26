Designing in VTEX is very similar to designing for Styleguide, but not they're not the same.


#### Should my component go to Styleguide?
If there's a high chance your component will be reused by other teams, then yes. Now, the thing is that it's not always easy to find this out, since you'll be having to _talk with people_. The weekly rituals however are designed in a way so that it should be easy to discuss these questions with the rest of Styleguide users. And if you attend often you'll start to see that everyone is in the same boat.

Now, not every component and pattern that you need in a specific product needs to be turned into a Styleguide component. Some special snowflakes are sometimes needed for some special projects. However be mindful that this comes with the cost of special design and development time, so choose your battles :)


#### What is a Component
In the standpoint of our Design System, a component is made up of, at least:

* **Visual specs**: how does it look like? What are the colors, sizes and margins? Everything should be detailed to the pixel level.
* **Interactions**: what are all possible interactions with this component? Every click, hover and focus state should be intentional.
* **Variations and states**: which alternative states this component may reach? What are possible configurations one can do to change a little bit how it looks and behaves to better fit specific scenarios?
* **Props design**: in the React jargon, props are parameters you pass to 
* **Documentation**: write a quick summary of what the component does, a lista of Do's and Don'ts, and optionally a list of related existing components.
* **Implementations**: the actual code that implements all of that. In our case it's all React, but in the future there might be other platforms to support.


#### Benchmarking
Looking at other awesome Design Systems is a great way of projecting ourselves to what we could be in the future—and choose to either go there or not. Seeing how big companies have approached specific components can give us ideas of how to generalize and scale design decisions from general use case scenarios to specific microinteractions decisions.

Check out [Benchmarking Guide](https://docs.google.com/document/d/1-L3xllgWx1nF6mhOryHMw4o8d1_3-AKtC9pGO2VywBg/edit#) for our own curated list of awesome Design Systems to draw inspiration from.


#### Design tokens
Tokens are like code variables, but for design. Making sure you understand the system will enable you to create components that are automatically themable and can be used in the most diverse applications.

<div className="center pv6">
  ![](./tokens.png)
</div>

Tokenizing sometimes can be tricky, especially if your customizing on top of a third-party solution. Although it's imperative for Storefront components, Admin-only ones are not that obligatory. We hope to define these boundaries better in the future.


#### Figma Design Kit
Since early 2018 Figma has been the Design tool we chose to use in VTEX. It's a vector-based tool focused in UI, just like Sketch. Although much more recent than its main competitor, it's already the second most used tool by the UX community in the world. It's main advantages are being totally web-based, which means you can access it via any browser. It's also natively multiplayer, enabling new ways of working in collaboration with other people and maintaining complex, collaborative projects.

Part of the native features of the tool is the support for reusable components and styles, which made it the perfect tool for us to create our Design System.

```jsx noeditor
<div className="w-two-thirds ma4 dim">
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
                Easily create new designs with our Styles and Components in Figma.
                </p>
            </div>
        </div>
      </Card>
    </a>
  </div>
```