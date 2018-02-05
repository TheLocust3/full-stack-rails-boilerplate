import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from '../components/containers/Index';

// Always start navigation at the top of the page
const ScrollToTop = () => {
    window.scrollTo(0, 0);

    return null;
};

class Base extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route component={ScrollToTop} />
                        <Switch>
                            <Route exact path="/" component={Index} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <Base />,
    document.getElementById('root')
);
