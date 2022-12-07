# React, Paper, Swifters
Rock, paper, scissors app implemented in both React and SwiftUI for Aspirent Lunch and Learn session. The goal is to demonstrate similarities and differences in state management between the two.

### For simple state, that is, state that exists only within the context of a single view, React and SwiftUI are very similar. They both manage your state variables for you, and any changes to your state will result in a redrawing of your component/view, and any of its children in the hierarchy, but the implementation does vary between the two in the following ways:

- The `@State` property wrapper allows you to define a state variable, and SwiftUI abstracts away the value in memory elsewhere, but in a way that is totally seamless. As per Apple's documentation, "A State instance isn’t the value itself; it’s a means of reading and writing the value." As far as you are concerned, the interaction is like any other variable. Reassign away, because under the hood, SwiftUI is taking care of it for you.
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

### As you introduce new components/views into your hierarchy, React and SwiftUI diverge greatly:
- In React, state of a parent component can be passed down to a child component in the form of `props`. In TypeScript, you define an interface for the props your child component needs from its parent's state, and assign those values from the parent. The values passed from parent to child as props are to be treated as immutable. A child component shouldn't be updating its parent's state. To do that, a callback is required. Pass the parent's setter function to the child as a prop, then call that function from the child when updating the state is needed.
``` TypeScript
// Parent
const Child: React.FC = (): => {
    const [message, setMessage] = useState("");
    ...
    <Child
        message={message}
    />
};

// Child
interface ChildProperties {
    message: string;
}

const Child: React.FC<ChildProperties> = (): => {
...
}
```
- In SwiftUI, an entirely different state mechanism is used. `@State` data is meant to be local to a view, and if it is passed to a child view, changes made in the child will not be reflected in the parent. This is because SwiftUI views are structs, which are value types in Swift. Classes, on the other hand, are reference types. Per the docs, they "are *not* copied when they’re assigned to a variable or constant, or when they’re passed to a function. Rather than a copy, a reference to the same existing instance is used." So instead, we move our state properties onto a class that conforms to the `ObservableObject` protocol. More of the management is up to you than before, but the gist is to make SwiftUI aware of changes to the properies via the `@Published` property wrapper. In the parent view, store your class in state with the `@StateObject` property wrapper. This wrapper declares that the parent view owns this data. Any child view that uses it will not instantiate its own instance of the class, but rather take it as an argument and define with the `@ObservedObject` property wrapper
``` Swift
// Class
class Book: ObservableObject {
    @Published var title = ""
    @Published var author = ""
}

// Parent
struct ParentView: View {
    @StateObject var book = Book()
    ...
    var body: some View {
        ChildView(book: book)
    }
}

struct ChildView: View {
    @ObservableObject var book = Book()
    ...
    var body: some View {
        VStack {
            Text(book.title)
            Text(book.author)
        }
    }
}
```

