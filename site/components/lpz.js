import {useEffect, useState} from "react";
import React, {Component} from "react";


class Lpz extends Component {
    modifiers = {
        age_lt_16: 4,
        age_lt_21: 4,
        games_lt_30: 4,
        games_recent_lt_15: 4
    }
    field_labels = {
        age_lt_16: 'Jünger als 16',
        age_lt_21: 'Jünger als 21',
        games_lt_30: 'Weniger als 30 Spiele',
        games_recent_lt_15: 'Weniger als 15 Spiele nach einem Jahr Pause',
        lpz: 'LPZ',
        match_count: "Matches"
    }

    base = 16

    constructor(props) {
        super(props);
        this.state = {
            base_modifiers: [],
            this_lpz: 1429,
            match_deltas: {}
        };
        this.getBaseValue = this.getBaseValue.bind(this);
        this.incrementMatchCount = this.incrementMatchCount.bind(this);
        this.decrementMatchCount = this.decrementMatchCount.bind(this);
        this.addOtherLpz = this.addOtherLpz.bind(this)
    }

    getBaseValue() {
        return self.state.modifiers.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            this.base
        )
    }

    setMatchDelta(index, delta) {
        this.setState((prevState) => {
            return prevState.match_deltas[number] = delta;
        })
    }

    render() {
        return (
            <div>
                <label><span>{this.field_labels.lpz}</span>
                    <input
                        name="lpz" min="1" max="2300" step="1"
                        type="number"
                        value={this.state.lpz}/>
                </label>

                {Object.keys(this.modifiers).map(name => <fieldset>
                    <label><input
                        name={name}
                        value={this.modifiers[name]}
                        type="checkbox"/> <span>{this.field_labels[name]}</span></label>
                </fieldset>)}

                <fieldset>
                    <button
                        onClick={() => this.setMatchDelta(self.state.match_deltas.count())})
                    >+
                    </button>
                </fieldset>

                <fieldset>
                    <button
                        onClick={this.decrementMatchCount}
                    >-
                    </button>
                </fieldset>

                <fieldset>

                    {
                        [...Array(10).keys()].map(index => <Match
                            number={index + 1}
                            {...this.state}
                            setDelta={setDelta}/>)
                    }

                </fieldset>

                <fieldset>
                    <label>{this.field_labels.new_lpz}: {0}</label>
                </fieldset>
            </div>
        )
    }
}


const Match = ({number, this_lpz, other_lpz, base, setDelta}) => {
    const [lpz, setLpz] = useState(0);
    return <fieldset>
        <legend>Gegner {number}</legend>
        <fieldset>
            <label><span></span>
                <input
                    onChange={(e) => setLpz(e.target.value)}
                    inputMode="decimal"
                    min="1"
                    max="2500" step="1"
                    type="number" value={otherLpz}/>
            </label>
        </fieldset>

        <fieldset>
            <button
                onClick={() => addOtherLpz(this.state.lpz)}
            ></button>
        </fieldset>
    </fieldset>
}

export default Lpz;