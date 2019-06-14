import React, {Fragment} from 'react';
import Metrics from "../components/Metrics";
import Data from "../components/Data";
import Log from "../components/Log";

class Charts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSet: this.props.dataSet,
            theta: this.props.theta,
            predictionData: [0,0],
            predictionOutput:0,
            accuracy: this.props.accuracy
        };
    }

    handleOnClick(){
        this.updatePredictionData()
    }

    updatePredictionData() {
        let x1 = this.props.randomFunc(0, 12);
        let x2 = this.props.randomFunc(0, 12);
        let callbackData = this.props.callback(x1,x2,this.state.theta);
        this.setState({predictionData: [x1,x2]});
        this.setState({predictionOutput: callbackData});
    }

    render() {
        let x1 = this.state.predictionData[0];
        let x2 = this.state.predictionData[1];

        return (
            <Fragment>
                <button className='randomBtn' onClick={this.handleOnClick.bind(this)}>Random prediction</button>
                <Data dataSet={this.state.dataSet} randomX1={x1} randomX2={x2}/>
                <Metrics output={this.state.predictionOutput} accuracy={this.state.accuracy}/>
                <Log pred={this.state.predictionOutput} randomX1={x1} randomX2={x2}/>
            </Fragment>

        );
    }
}

export default Charts;