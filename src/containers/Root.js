import '../App.css';
import { Menu } from '../components'
import { Campuses } from '../containers'

function Root({ children }) {
  return (
    <div className="App">
      <header className="App-header">
      <Campuses />
      </header>
    </div>
  );
}

export default Root;
