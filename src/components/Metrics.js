import React, {Component} from 'react';
import {PieChart, Pie, Legend, Cell, AreaChart, YAxis, XAxis, Area} from 'recharts'

class Metrics extends Component {

    render() {

        let data = [];
        let accuracy = this.props.accuracy;
        accuracy.map((d, index) => {
            data.push({x: index, Accuracy: d,});
        });

        const data02 = [
            {
                name: 'Likelihood of being yellow',
                value: this.props.output
            },
            {
                name: 'Likelihood of being gray',
                value: 1 - this.props.output
            }];

        return (

            <div className="prediction">
                <PieChart width={220} height={230}>
                    <Pie data={data02} innerRadius={60} outerRadius={80} stroke="none">
                        <Cell fill='yellow'/>
                    </Pie>
                    <Legend/>
                </PieChart>
                <AreaChart width={600} height={200} data={data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="x"/>
                    <YAxis dataKey="Accuracy"/>
                    <Area type='monotone' dataKey='Accuracy' stroke='yellow' fill='none'/>
                    <Legend/>
                </AreaChart>
            </div>

        );
    }

}

export default Metrics;