import '../App.css';
import { Menu } from '../components'
import { Campuses } from '../containers'

function Root({ children }) {
  return (
    <div className="App">
      <Campuses />
    </div>
  );
}

export default Root;
