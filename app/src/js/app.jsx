// Dependencies
import React, { Component } from 'react';
import { render } from 'react-dom';
import '../style/index.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
         return(
            <div className="app-container">
                <span className="app-container--redux">REDUX&nbsp;</span>
                <span className="app-container--world">WORLD</span>
           </div>
        );
    }
}

render(<App />, document.getElementById('app'));
