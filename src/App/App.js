import { useAuthContext } from '../Context/AuthContext';
import Routing from '../Routes/Routing';

function App() {
  const { loading, error, user } = useAuthContext();
  return (
    <>
      {error && <p>{error}</p>}
      {loading ? <h2>Loadig ...</h2> : <Routing />}
    </>
  );
}

export default App;
