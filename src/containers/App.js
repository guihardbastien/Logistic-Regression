import React, {Fragment} from 'react';
import Header from './Header';
import '../style/style.css';
import Charts from "./Charts";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSet: [],
            epochs: 400,
            learningRate: 0.01,
            totalData: 50
        };
    }

    componentWillMount() {
        let data = this.generateData(this.state.totalData);
        this.setState({dataSet: data});
    }

    //returns a random float in an defined interval
    getRandomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }

    //generating some binary, linearly separable data.
    generateData(total) {
        let data = [];
        for (let i = 0; i < total; i++) {
            let x = this.getRandomFloat(0, 12);
            let y = this.getRandomFloat(x, 12);
            let label = 1;
            data.push([x, y, label]);

            x = this.getRandomFloat(0, 12);
            y = this.getRandomFloat(0, x);
            label = 0;
            data.push([x, y, label]);
        }

        return data
    }

    //returns sigmoid of z
    sigmoidFunction(z) {
        return 1 / (1 + Math.exp(-z));
    }

    //returns theta after "epoch" optimizations & accuracy
    gradientDescent(learningRate, epochs, data) {

        //theta weights
        let w0 = 0,
            w1 = 0,
            w2 = 0;

        //overtime error
        let accuracy = [];
        let error;

        for (let i = 0; i < epochs; i++) {
            data.map(d => {
                let z = w0 + d[0] * w1 + d[1] * w2;
                //sigmoid activation
                let predictedLabel = this.sigmoidFunction(z);
                error = predictedLabel - d[2];

                //convex cost function => cross enthropy
                //let cost = (1 / m) * (-d[2] * Math.log(predictedLabel) - (1 - d[2]) * -d[2] * Math.log(1 - predictedLabel));

                let bufferW0 = w0;
                let bufferW1 = w1;
                let bufferW2 = w2;

                //C′=x(s(z)−y) => cost's gradient
                //gradient descent
                w0 = bufferW0 - learningRate * ((error));
                w1 = bufferW1 - learningRate  * ((error) * d[0]);
                w2 = bufferW2 - learningRate  * ((error) * d[1]);
            });

            accuracy.push(error)
        }

        return {theta: [w0, w1, w2], accuracy: accuracy}
    }

    //prediction using optimized theta
    predict(x1, x2, trainedTheta) {
        let z = trainedTheta[0] + x1 * trainedTheta[1] + x2 * trainedTheta[2];
        return this.sigmoidFunction(z)
    }

    render() {

        let training = this.gradientDescent(this.state.learningRate, this.state.epochs, this.state.dataSet);
        let thetaVector = training.theta;
        let accuracy = training.accuracy;

        return (
            <Fragment>
                <div className='wrapper'>
                    <Header/>
                    <Charts callback={this.predict.bind(this)}
                            randomFunc={this.getRandomFloat.bind(this)}
                            dataSet={this.state.dataSet}
                            theta={thetaVector}
                            accuracy={accuracy}/>
                </div>
            </Fragment>
        );
    }
}

export default App;

