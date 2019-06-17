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
        let callbackData = this.props.callback();
        this.setState({predictionData: [callbackData.x1,callbackData.x2]});
        this.setState({predictionOutput: callbackData.prediction});
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