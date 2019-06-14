import React from 'react';
import {ScatterChart, Scatter, ZAxis, XAxis, YAxis, CartesianGrid} from 'recharts'

class Data extends React.Component {
    render() {

        let dataSet = this.props.dataSet;
        let x1 = this.props.randomX1;
        let x2 = this.props.randomX2;

        let data_1 = [];
        let data_0 = [];
        let prediction = [{x: x1, y: x2, weight: 5}];

        dataSet.map(item => {
            if (item[2] === 1) {
                data_1.push({x: item[0], y: item[1], z: item[2], weight: 1});
            } else {
                data_0.push({x: item[0], y: item[1], z: item[2], weight: 1});
            }
        });

        return (
            <div className="data">
                <ScatterChart width={900} height={230}>
                    <CartesianGrid stroke='gray'/>
                    <XAxis dataKey={'x'} type="number" name='x1'/>
                    <YAxis dataKey={'y'} type="number" name='x2'/>
                    <ZAxis dataKey="weight" range={[15, 200]}/>
                    <Scatter name='0s' data={data_0} fill='gray'/>
                    <Scatter name='1s' data={data_1} fill='yellow'/>
                    <Scatter name='1s' data={prediction} fill='purple' shape='triangle'/>
                </ScatterChart>
            </div>
        );
    }
}

export default Data;