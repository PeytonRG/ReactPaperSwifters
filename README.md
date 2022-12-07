# React, Paper, Swifters
Rock, paper, scissors app implemented in both React and SwiftUI for Aspirent Lunch and Learn session. The goal is to demonstrate similarities and differences in state management between the two.

## Similarities
- For simple state, that is, state that exists only within the context of a single view, React and SwiftUI are very similar. They both manage your state variables for you, and any changes to your state will result in a redrawing of your component/view, and any of its children in the hierarchy.

## Differences
- The `@State` property wrapper allows you to define a state variable, and SwiftUI maintains the value of that state somewhere abstracted away from you, but in a way that is totally seamless. As per Apple's documentation, *"A State instance isn’t the value itself; it’s a means of reading and writing the value."* As far as you are concerned, the interaction is like any other variable. Reassign away, because under the hood, SwiftUI is taking care of it for you.
``` Swift
@State private var message = ""
...
Button("Set Message") {
    message = "New value"
}
```
- React does the heavy lifting for managing your state variables, but the difference is that you define the variable as a constant with an accompanying setter function. Modifying your state variable directly is a big no-no. In fact, because it's defined with the `const` keyword, you can't do it at all. Any updates to the value must be done via the setter function, which ensures React is in charge of the operation to protect you from yourself.
``` TypeScript
const [message, setMessage] = useState("");
...
<Button onClick={(): void => setMessage("New value")}>
    Set Message
</Button>
```
- Changes to your state variables in SwiftUI happen instantly, so if you make a change then need to reference that new value somewhere else, you can safely do it. In React, this is not a given, so your code that will act upon that updated value should be in a `useEffect` hook that depends on your state value so it always gets the latest value.
- In summary, state variables in React require special treatment, whereas SwiftUI state variables defined with the `@State` property wrapper can be treated just like any other variable as far as you are concerned.

