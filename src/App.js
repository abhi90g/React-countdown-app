import React, { Component } from 'react'

const TimeInput = (props) => {
    return (
        <div>
            <h3>Enter Minute(s) to set countdown timer</h3>
            <input type="number" value={props.value} onChange={props.handleChange} required />
        </div>
    );
}

const StartTimer = (props) => {
    return (
        <div>
            <button disabled={!props.value} onClick={props.startCountDown}>Start</button>
        </div>

    );
}

const CountdownTimer = (props) => {
    return (
        <div>
            <h1 style={{ fontSize: 100, textAlign: "center" }}>{props.value}:{props.secondsValue}</h1>
        </div>
    );
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsValue: '00',
            value: '00',
            isClicked: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.startCountDown = this.startCountDown.bind(this);
        this.convert = this.convert.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    convert() {
        var minute = Math.floor(this.secondsRemaining / 60);
        var second = this.secondsRemaining - (minute * 60);

        this.setState({
            value: minute,
            secondsValue: second,
        })

        if (second < 10) {
            this.setState({
                secondsValue: "0" + this.state.secondsValue,
            })
        }

        if (minute < 10) {
            this.setState({
                value: "0" + minute,
            })
        }

        if (minute === 0 & second === 0) {
            clearInterval(this.intervalHandle);
        }

        this.secondsRemaining--
    }

    startCountDown() {
        this.intervalHandle = setInterval(this.convert, 1000);
        let time = this.state.value;
        this.secondsRemaining = time * 60;
        this.setState({
            isClicked: true
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div style={{ textAlign: "center" }}>
                        <TimeInput value={this.state.value} handleChange={this.handleChange} />
                        <StartTimer startCountDown={this.startCountDown} value={this.state.value} />
                    </div>
                    <div>
                        <CountdownTimer value={this.state.value} secondsValue={this.state.secondsValue} />
                    </div>
                </div>
            </div>
        );
    }
}

