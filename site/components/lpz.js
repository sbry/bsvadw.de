import {useState} from "react";
import React, {Component} from "react";

const computeProbability = (lpz1, lpz2) => {
    let exponent = (lpz2 - lpz1) / 150;
    return 1 / (1 + Math.pow(10, exponent))
}

const computeWinDelta = (lpz1, lpz2, base) => {
    return (1 - computeProbability(lpz1, lpz2)) * base;
}

const computeLoseDelta = (lpz1, lpz2, base) => {
    return -computeProbability(lpz1, lpz2) * base;
}

const formatDelta = (delta) => {
    return `${delta >= 0 ? "+ " : "- "}${Math.abs(Math.round(delta))}`;
}
const formatProbability = (p) => {
    return `${Math.round(p * 100)}%`;
}

const formatLpz = (lpz) => {
    return Math.round(lpz);
}

class Lpz extends Component {
    modifiers = {
        age_lt_16: 4,
        age_lt_21: 4,
        encounters_lt_30: 4,
        encounters_recent_lt_15: 4
    }
    field_labels = {
        age_lt_16: 'Jünger als 16',
        age_lt_21: 'Jünger als 21',
        encounters_lt_30: 'Weniger als 30 Begegnungen',
        encounters_recent_lt_15: 'Weniger als 15 Spiele nach einem Jahr Pause',
        initial: 'Meine LPZ',
        new: 'Meine neue LPZ',
        encounters: "Begegnungen",
        base: "Basiswert",
        probability: "Gewinnwahrscheinlichkeit",
    }

    base = 16

    constructor(props) {
        super(props);
        this.state = {
            modifiers: {},
            initial: 1429,
            encounter_count: 2,
            encounters: {0: {}, 1: {}},
            delta: 0
        };
    }

    computeBase = () => {
        return Object.keys(this.state.modifiers).reduce(
            (accumulator, currentValue) => accumulator + this.modifiers[currentValue],
            this.base
        )
    }

    computeDelta = () => {
        return Object.keys(this.state.encounters).reduce(
            (accumulator, currentValue) => {
                const encounter = this.state.encounters[currentValue]
                if (!encounter.lpz) {
                    return accumulator + 0;
                }
                if (encounter.win === 'yes') {
                    return accumulator + computeWinDelta(this.state.initial, encounter.lpz, this.computeBase())
                } else if (encounter.win === 'no') {
                    return accumulator + computeLoseDelta(this.state.initial, encounter.lpz, this.computeBase())
                } else {
                    return accumulator + 0;
                }
            }, 0
        )
    }

    setModifier = (name, value) => {
        this.setState((prevState) => {
            if (value) {
                prevState.modifiers[name] = value;
            } else {
                delete prevState.modifiers[name];
            }
            return prevState
        })
    }

    changeHandlerEncounter = (index, state) => {
        this.setState((prevState) => {
            prevState.encounters[index] = state;
            prevState['delta'] = this.computeDelta();
            return prevState
        });
    }

    changeHandlerEncounterCountIncrement = () => {
        this.setState((prevState) => {
            prevState.encounter_count = this.state.encounter_count + 1;
            return prevState
        })
    }

    changeHandlerEncounterCountDecrement = () => {
        this.setState((prevState) => {
            prevState.encounter_count = this.state.encounter_count - 1;
            return prevState
        })
    }

    render() {
        return (
            <div className={"lpz"}>
                <fieldset className={"grid grid-cols-2 md:grid-cols-2 gap-5"}>
                    <fieldset>
                        <label><span>{this.field_labels.initial}</span>
                            <input
                                name="lpz" className={"lpz-input"} min="1" max="2500" step="1"
                                onChange={(event) => {
                                    this.setState({
                                        initial: event.target.value,
                                        delta: this.computeDelta()
                                    });

                                }}
                                type="number"
                                value={this.state.initial}/>
                        </label>
                    </fieldset>

                    <fieldset>
                        <label>
                            <div>{this.field_labels.new}</div>
                            <div
                                className={"math font-bold"}>
                                {formatLpz(this.state.initial)} {formatDelta(this.state.delta)} = {formatLpz((this.state.initial + this.state.delta))}</div>
                        </label>
                    </fieldset>

                </fieldset>

                <fieldset className={"base"}>
                    <label>{this.field_labels.base} <span className={"math"}>{this.computeBase()}</span></label>
                    {Object.keys(this.modifiers).map(name => <fieldset>
                        <label><input
                            name={name}
                            onChange={(event) => {
                                this.setModifier(name, event.target.checked);
                            }}
                            value={1}
                            type="checkbox"/> <span>{this.field_labels[name]}</span></label>
                    </fieldset>)}
                </fieldset>


                <fieldset className={"encounters"}>

                    {
                        [...Array(this.state.encounter_count)].map((value, index) => {
                                return <LpzEncounter
                                    index={index}
                                    base={this.computeBase()}
                                    initial={this.state.initial}
                                    onChange={this.changeHandlerEncounter}
                                />
                            }
                        )
                    }
                    <fieldset>
                        <button
                            className={"mr-5 w-15 text-4xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"}
                            onClick={this.changeHandlerEncounterCountIncrement}
                        >+
                        </button>
                        <button
                            className={"w-15 text-4xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"}
                            onClick={this.changeHandlerEncounterCountDecrement}>-
                        </button>
                    </fieldset>
                </fieldset>

                <fieldset className={"grid grid-cols-2 md:grid-cols-2 gap-5 rounded-2xl"}>

                </fieldset>
            </div>
        )
    }
}


const LpzEncounter = ({index, onChange, initial, base}) => {
    const [lpz, setLpz] = useState(Math.round(initial / 10) * 10);
    const [win, setWin] = useState("");

    return <fieldset key={index} className={`encounter ${win ? 'active' : 'inactive'}`}>
        <fieldset>
            <label><span></span>
                <input
                    onChange={(e) => {
                        setLpz(e.target.value)
                        onChange(index, {
                            lpz: e.target.value,
                            win
                        })
                    }}
                    inputMode="decimal"
                    min="1"
                    max="2500" step="1"
                    type="number" value={lpz}
                />
            </label>
        </fieldset>

        <fieldset>
            <label
                className={"math"}>P<sub>A</sub> = {formatProbability(computeProbability(initial, lpz))}</label>
        </fieldset>


        <fieldset>
            <label>
                <input
                    name={`win[${index}]`}
                    checked={win === "yes"}
                    onChange={(e) => {
                        setWin("yes")
                        onChange(index, {
                            lpz,
                            win: "yes"
                        })
                    }}
                    value="yes"
                    type="radio"/>
                Sieg <span className={"math"}>{formatDelta(computeWinDelta(initial, lpz, base))}</span>
            </label>
        </fieldset>


        <fieldset>
            <label>
                <input
                    name={`win[${index}]`}
                    checked={win === "no"}
                    onChange={(e) => {
                        setWin("no")
                        onChange(index, {
                            lpz,
                            win: "no"
                        })
                    }}
                    value="no"
                    type="radio"/>
                Niederlage <span className={"math"}>{formatDelta(computeLoseDelta(initial, lpz, base))}</span>
            </label>
        </fieldset>

    </fieldset>
}

export default Lpz;
