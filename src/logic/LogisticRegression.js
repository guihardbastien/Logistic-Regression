class LogisticRegression {

    _dataSet = [];
    _theta = [0, 0, 0];
    _accuracy = [];
    _cost = [];

    constructor(epochs, learningRate, totalData) {
        //generates dataset
        this._dataSet = LogisticRegression.generateData(totalData);
        //trains the model
        this.gradientDescent(learningRate, epochs, this.dataSet);
    }

    //returns a random float in an defined interval
    static getRandomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }

    //returns sigmoid of z
    static sigmoidFunction(z) {
        return 1 / (1 + Math.exp(-z));
    }

    //convex cost function
    crossEntropy(label, predictedLabel) {
        let m = this._dataSet.length;
        return (1 / m) * (-label * Math.log(predictedLabel) - (1 - label) * -label * Math.log(1 - predictedLabel));
    }


    //generating some binary, linearly separable data.
    static generateData(total) {
        let data = [];
        for (let i = 0; i < total; i++) {

            let x = LogisticRegression.getRandomFloat(0, 12);
            let y = LogisticRegression.getRandomFloat(x, 12);
            let label = 1;
            data.push([x, y, label]);

            x = LogisticRegression.getRandomFloat(0, 12);
            y = LogisticRegression.getRandomFloat(0, x);
            label = 0;
            data.push([x, y, label]);
        }
        return data
    }

    //returns theta after "epoch" optimizations & updates accuracy and cost
    gradientDescent(learningRate, epochs, data) {

        //theta weights
        let W = this._theta;
        let error = 0;
        let cost = 0;

        for (let i = 0; i < epochs; i++) {
            data.map(d => {

                // z = w0 + w1*x1 + w2*x2
                let z = W[0] + d[0] * W[1] + d[1] * W[2];

                //sigmoid activation
                let predictedLabel = LogisticRegression.sigmoidFunction(z);
                error = predictedLabel - d[2];

                //calculating cost
                cost = this.crossEntropy(d[2], predictedLabel);

                //Gradient descent | C′=x(s(z)−y) => cost's gradient
                W[0] = W[0] - learningRate * ((error));
                W[1] = W[1] - learningRate * ((error) * d[0]);
                W[2] = W[2] - learningRate * ((error) * d[1]);
            });

            this._accuracy.push(error);
            this._cost.push(cost);
        }

        this._theta = W;
    }

    //prediction on random data using trained theta
    randomPrediction() {
        let x1 = LogisticRegression.getRandomFloat(0, 12);
        let x2 = LogisticRegression.getRandomFloat(0, 12);
        let z = this._theta[0] + x1 * this._theta[1] + x2 * this._theta[2];
        let pred = LogisticRegression.sigmoidFunction(z);

        return {x1: x1, x2: x2, prediction: pred}
    }

    // Getters & Setters
    get dataSet() {
        return this._dataSet;
    }

    get theta() {
        return this._theta;
    }

    get accuracy() {
        return this._accuracy;
    }

    get cost() {
        return this._cost;
    }
}

export default LogisticRegression;
