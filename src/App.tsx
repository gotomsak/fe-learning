import React from 'react';
import logo from './logo.svg';
import './App.css';
import TestContainer from '../src/containers/testContainer'
import { Switch, Route } from 'react-router';
import LearningPage from './pages/LearningPage'
// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <React.Fragment>
//           <Switch>
//             <Route exact path="/" component={LearningPage} />
//           </Switch>
//         </React.Fragment>
//       </div>
//       // <div className="App">
//       //   <TestContainer />
//       // </div>
//     );
//   }
// }

const App=()=>{
  return (
    <div className="App">
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={LearningPage} />
        </Switch>
      </React.Fragment>
    </div>
  )
}


export default App;
