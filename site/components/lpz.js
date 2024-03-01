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
        age_lt_16: '< 16',
        age_lt_21: '< 21',
        encounters_lt_30: '< 30 Spiele',
        encounters_recent_lt_15: '< 15 Spiele nach einem Jahr Pause',
        initial: 'LPZ',
        new: 'Neue LPZ',
        encounters: "Begegnungen",
        base: "Basis",
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
            delta: 0,
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
                    return accumulator;
                }
                if (encounter.win === 'yes') {
                    return accumulator + computeWinDelta(this.state.initial, encounter.lpz, this.computeBase())
                } else if (encounter.win === 'no') {
                    return accumulator + computeLoseDelta(this.state.initial, encounter.lpz, this.computeBase())
                } else {
                    return accumulator;
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
        this.setState({delta: this.computeDelta()})
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
                <div className={"grid grid-cols-3 md:grid-cols-3 gap-5"}>
                    <fieldset>
                        <label><span>{this.field_labels.initial}</span>
                            <input
                                name="lpz" min="1" max="2500" step="1"
                                onChange={(event) => {
                                    this.setState({
                                        initial: event.target.value,
                                        delta: this.computeDelta()
                                    });

                                }}
                                type="number"
                                value={this.state.initial}/>
                        </label>
                        <fieldset className={"pt-2"}>
                            <button
                                className={"p-4"}
                                onClick={this.changeHandlerEncounterCountIncrement}
                            >+
                            </button>
                            <button
                                className={"p-4"}
                                onClick={this.changeHandlerEncounterCountDecrement}>-
                            </button>

                        </fieldset>

                    </fieldset>

                    <fieldset>
                        <label>
                            <div>{this.field_labels.new}</div>
                            <div
                                className={"math font-bold"}>
                                {formatLpz(this.state.initial)} {formatDelta(this.state.delta)} = {formatLpz((Number(this.state.initial) + Number(this.state.delta)))}</div>
                        </label>

                    </fieldset>


                    <fieldset className={""}>
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
                </div>

                <div>

                    <fieldset className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-5"}>

                        {
                            [...Array(this.state.encounter_count)].map((value, index) => {
                                    return <LpzEncounter
                                        index={index}
                                        initial={this.state.initial}
                                        onChange={this.changeHandlerEncounter}
                                    />
                                }
                            )
                        }

                    </fieldset>

                </div>
            </div>
        )
    }
}


const LpzEncounter = ({index, onChange, initial}) => {
    const [lpz, setLpz] = useState(Math.round(initial / 10) * 10);
    const [win, setWin] = useState("");

    return <fieldset key={index}
                     className={`${win ? 'active' : 'inactive'} ${win == "yes" ? 'win' : ''} ${win == "no" ? 'loss' : ''} grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 my-2 rounded-lg p-2`}>
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

        <fieldset className={"mt-2"}>
            <label
                className={"math "}>P<sub>A</sub> = {formatProbability(computeProbability(initial, lpz))}</label>
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
                Sieg
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
                Niederlage
            </label>
        </fieldset>

    </fieldset>
}

export default Lpz;
