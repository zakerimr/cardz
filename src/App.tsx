import "./App.css"
import Card from "./Card"

function App() {
  return (
    <>
      <h1>Cardz</h1>
      <Card 
        area="column" 
        suit='d' 
        rank={2} 
      />
      <Card 
        area="hand" 
        suit='c' 
        rank='j' 
      />
    </>
  )
}

export default App
