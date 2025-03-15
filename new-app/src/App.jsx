import NavBar from "./components/nav"
import Entry from "./components/entry"
import data from "./data.js"


export default function App() {
    const entryComponents = data.map(
        obj => <Entry entry={obj}/>
    )
    
    return (
        <>
            <NavBar />
            {entryComponents}
        </>
    )
}
