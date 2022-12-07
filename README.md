# React, Paper, Swifters
Rock, paper, scissors app implemented in both React and SwiftUI for Aspirent Lunch and Learn session. The goal is to demonstrate similarities and differences in state management between the two.

### For simple state, that is, state that exists only within the context of a single view, React and SwiftUI are very similar. They both manage your state variables for you, and any changes to your state will result in a redrawing of your component/view, and any of its children in the hierarchy, but the implementation does vary between the two in the following ways:

- The `@State` property wrapper allows you to define a state variable, and SwiftUI abstracts away the value in memory elsewhere, but in a way that is totally seamless. As per Apple's documentation, "A State instance isn’t the value itself; it’s a means of reading and writing the value." As far as you are concerned, the interaction is like any other variable. This means you can reassign to your heart's content, and use two-way binding with views such as text fields or with modifiers like alerts.
``` Swift
@State private var message = ""
...
Button("Update Value") {
    message = "New value"
}
```
- React also does the heavy lifting for managing your state variables, but the difference is that you define the variable as a constant with an accompanying setter function. Modifying your state variable directly is a big no-no. In fact, because it's defined with the `const` keyword, you can't do it at all. Any updates to the value must be done via the setter function, which ensures React is in charge of the operation to protect you from yourself.
``` TypeScript
const [message, setMessage] = useState("");
...
<button onClick={(): void => setMessage("New value")}>
    Update Value
</button>
```
- Changes to your state variables in SwiftUI happen right away, so if you make a change then need to reference that new value somewhere else, you can safely do it. In React, this is not a given, so your code that will act upon that updated value should be wrapped in a `useEffect` hook that depends on your state value so it always gets the latest value.
``` TypeScript
const [searchTerm, setSearchTerm] = useState("");
...
// Effect to run after update
useEffect(() => {
    // do something now that data has updated
}, [searchTerm]);
...
<button onClick={(): void => setSearchTerm("New value")}>
    Update Value
</button>
```
- In summary, state variables in React require special treatment, whereas SwiftUI state variables defined with the `@State` property wrapper can be treated just like any other variable as far as you are concerned.

### As you introduce new components/views into your hierarchy, React and SwiftUI diverge greatly:
- In React, state of a parent component can be passed down to a child component in the form of `props`. In TypeScript, you define an interface for the props your child component needs from its parent's state, and assign those values from the parent. The values passed from parent to child as props are to be treated as immutable. A child component shouldn't be updating its parent's state. To do that, a callback is required. Pass the parent's setter function to the child as a prop, then call that function from the child when updating the state is needed.
``` TypeScript
// Parent
const Parent: React.FC = (): => {
    const [message, setMessage] = useState("");
    ...
    <Child
        message={message}
        setMessage={setMessage}
    />
};

// Child
interface ChildProperties {
    message: string;
    setMessage: () => void;
}

const Child: React.FC<ChildProperties> = ({ message }: ChildProperties): => {
    return (
        <div>
            <p>{message}</p>
            <button onClick=((): void => setMessage("New value")}>
                Update Value
            </button>
        </div>
    );
}
```
- In SwiftUI, an entirely different state mechanism is used. `@State` data is meant to be local to a view, and if it is passed to a child view, changes made in the child will not be reflected in the parent. This is because SwiftUI views are structs, which are value types in Swift. Classes, on the other hand, are reference types. Per the docs, they "are *not* copied when they’re assigned to a variable or constant, or when they’re passed to a function. Rather than a copy, a reference to the same existing instance is used." 
- So instead, we move our state properties onto a class that conforms to the `ObservableObject` protocol. More of the management is on you than before, but the gist is you have to make SwiftUI aware of changes to the properies via the `@Published` property wrapper. In the parent view, store your class in state with the `@StateObject` property wrapper. This wrapper declares that the parent view owns this data. Any child view that uses it will not instantiate its own instance of the class, but rather take it as an argument and define with the `@ObservedObject` property wrapper. This view does not own the data, but it can directly make changes to it that will be reflected in the parent view.
``` Swift
// Class
class Book: ObservableObject {
    @Published var title = "Title"
    @Published var author = "Author"
}

// Parent
struct ParentView: View {
    @StateObject var book = Book()
    ...
    var body: some View {
        NavigationView {
            ChildView(book: book)
                .navigationTitle(book.title)
        }
    }
}

struct ChildView: View {
    @ObservedObject var book: Book
    ...
    var body: some View {
        VStack {
            Text(book.title)
            Text(book.author)
            
            Spacer()
            
            Button("Update Title") {
                // this update will be reflected in the ParentView as well
                book.title = "New title"
            }
        }
    }
}
```
- In summary, passing data from parent to child in React requires passing it as a prop that should be treated as immutable data. If you need to update it, do so via a callback function. In SwiftUI, use a class that conforms to the `ObservableObject` protocol, manually tell SwiftUI which properties to watch for changes, and then make use of the `@StateObject` and `@ObservedObject` property wrappers. This means that in React, state "owned" by the parent should only be modified in the parent, but in SwiftUI, changes can be made from parent or child, so long as you're using the correct setup for your state.
