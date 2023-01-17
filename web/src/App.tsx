import './styles/global.css'
import { Habit } from './components/Habit'

function App() {
  return (
    <div>
      <Habit completed={1}/>
      <Habit completed={5}/>
      <Habit completed={1}/>
      <Habit completed={2}/>
    </div>
  )
}

export default App
