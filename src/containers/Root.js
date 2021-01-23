import '../App.css';
import { Campuses } from '../containers'

function Root({ children }) {
  return (
    <div className="App">
      <Campuses />
    </div>
  );
}

export default Root;
