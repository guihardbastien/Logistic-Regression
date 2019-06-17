import React, {Fragment} from 'react';
import Header from './containers/Header';
import './assets/style/style.css';
import Charts from "./containers/Charts";
import LogisticRegression from './logic/LogisticRegression'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logReg: null,
            dataSet: [],
            epochs: 400,
            learningRate: 0.01,
            totalData: 50,
            accuracy: [],
            theta: []
        };
    }

    componentWillMount() {
        let logReg = new LogisticRegression(this.state.epochs, this.state.learningRate, this.state.totalData);
        this.setState({
            logReg: logReg,
            dataSet: logReg.dataSet,
            accuracy: logReg.accuracy,
            theta: logReg.theta
        });
    }

    prediction(){
        return this.state.logReg.randomPrediction()
    }

    render() {
        return (
            <Fragment>
                <div className='wrapper'>
                    <Header/>
                    <Charts callback={this.prediction.bind(this)}
                            dataSet={this.state.dataSet}
                            theta={this.state.theta}
                            accuracy={this.state.accuracy}/>
                </div>
            </Fragment>
        );
    }
}

export default App;

