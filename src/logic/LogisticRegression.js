class LogisticRegression {

    _dataSet = [];
    _theta = [0, 0, 0];
    _accuracy = [];

    constructor(epochs, learningRate, totalData) {
        this._dataSet = LogisticRegression.generateData(totalData);
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
    crossEntropy(d, predictedLabel) {
        let m = this._dataSet.length;
        return (1 / m) * (-d[2] * Math.log(predictedLabel) - (1 - d[2]) * -d[2] * Math.log(1 - predictedLabel));
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

    //returns theta after "epoch" optimizations & accuracy
    gradientDescent(learningRate, epochs, data) {

        //theta weights
        let w0 = 0,
            w1 = 0,
            w2 = 0;

        //overtime error
        let error;

        for (let i = 0; i < epochs; i++) {
            data.map(d => {

                let z = w0 + d[0] * w1 + d[1] * w2;

                //sigmoid activation
                let predictedLabel = LogisticRegression.sigmoidFunction(z);
                error = predictedLabel - d[2];

                //calculating cost
                let cost = this.crossEntropy(d, predictedLabel);

                //C′=x(s(z)−y) => cost's gradient
                w0 = w0 - learningRate * ((error));
                w1 = w1 - learningRate * ((error) * d[0]);
                w2 = w2 - learningRate * ((error) * d[1]);
            });
            this._accuracy.push(error)
        }
        this._theta = [w0, w1, w2];
    }

    //prediction on random data using optimized theta
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
}

export default LogisticRegression;
