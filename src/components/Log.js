import React, {Component} from 'react';

class Log extends Component {

    render() {
        let out = this.props.pred;
        let color;

        if (out < 0.5) {
            color = "Gray";
        } else {
            color = "Yellow"
        }

        return (
            <div className="log">
                <h2>LOG</h2>
                <p><b>Coordinates : </b></p>
                <p>X1 : {this.props.randomX1}</p>
                <p>X2 : {this.props.randomX2}</p><br/>
                <p><b>Output : </b></p>
                <p>{out}</p><br/>
                <p><b>Guess : </b></p>
                <p>Likely to be {color}</p><br/>
            </div>
        );
    }
}

export default Log;