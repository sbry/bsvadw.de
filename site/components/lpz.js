import {useState} from "react";
import React, {Component} from "react";


const computeLpzEncounterProbability = (lpz1, lpz2) => {
    let exponent = (lpz2 - lpz1) / 150;
    return 1 / (1 + Math.pow(10, exponent))
}

const computeLpzEncounterDelta = (initial_lpz, base, lpz_encounter) => {
    let probability = computeLpzEncounterProbability(initial_lpz, lpz_encounter.lpz);
    if (lpz_encounter.win === 'yes') {
        return (1 - probability) * base;
    }
    if (lpz_encounter.win === 'no') {
        return -probability * base;
    }
    return 0;
}

const computeAggregateDelta = (initial_lpz, base, lpz_encounters) => {
    return lpz_encounters.reduce((accumulator, lpz_encounter) => {
        return accumulator + computeLpzEncounterDelta(initial_lpz, base, lpz_encounter);
    }, 0);
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
    base_modifiers = {
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
        initial_lpz: 'LPZ',
        new: 'Neue LPZ',
        lpz_encounters: "Begegnungen",
        base: "Basis",
        probability: "Gewinnwahrscheinlichkeit",
    }

    constructor(props) {
        super(props);
        this.state = {
            base_modifiers: {},
            initial_lpz: 1429,
            lpz_encounters: [{}, {}],
        };
    }

    getBase = () => {
        return Object.keys(this.state.base_modifiers).reduce(
            (accumulator, currentValue) => accumulator + this.base_modifiers[currentValue],
            16
        )
    }

    setModifier = (name, value) => {
        this.setState((prevState) => {
            if (value) {
                prevState.base_modifiers[name] = value;
            } else {
                delete prevState.base_modifiers[name];
            }
            return prevState
        });
        console.log(this.state)
    }

    setLpzEncounter = (lpz_encounter) => {
        this.setState((prevState) => {
            prevState.lpz_encounters[lpz_encounter.index] = lpz_encounter;
            return prevState
        });
    }

    setInitialLpz = (initial_lpz) => {
        this.setState({initial_lpz: Number(initial_lpz)});
    }


    addLpzEncounter = (lpz_encounter) => {
        this.setState((prevState) => {
            prevState.lpz_encounters.push(lpz_encounter);
            return prevState
        });
    }


    removeLpzEncounter = (index) => {
        this.setState((prevState) => {
            delete prevState.lpz_encounters[index];
            return prevState
        });
    }

    render() {
        let aggregate_delta = computeAggregateDelta(this.state.initial_lpz, this.getBase(), this.state.lpz_encounters);
        return (
            <div className={"lpz"}>
                <div className={"grid grid-cols-3 md:grid-cols-3 gap-5"}>
                    <fieldset>
                        <label><span>{this.field_labels.initial_lpz}</span>
                            <input
                                name="lpz" inputMode="decimal"
                                min="1" max="2500" step="1"
                                onChange={(event) => {
                                    this.setInitialLpz(event.target.value);
                                }}
                                type="number"
                                value={this.state.initial_lpz}/>
                        </label>
                        <fieldset className={"pt-2"}>
                            <button
                                className={"text-xl w-full"}
                                onClick={() => this.addLpzEncounter({})}
                            >+
                            </button>
                        </fieldset>
                    </fieldset>
                    <fieldset>
                        <label>
                            <div>{this.field_labels.new}</div>
                            <div
                                className={"math font-bold"}>
                                {formatLpz(this.state.initial_lpz)} {formatDelta(aggregate_delta)} = {formatLpz(this.state.initial_lpz + aggregate_delta)}</div>
                        </label>
                    </fieldset>
                    <fieldset className={""}>
                        <label>{this.field_labels.base} <span
                            className={"math"}>{this.getBase()}</span></label>
                        {Object.keys(this.base_modifiers).map((name, index) => <fieldset key={index}>
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
                            this.state.lpz_encounters.map((value, index) => {
                                    return <LpzEncounter
                                        key={index}
                                        index={index}
                                        initial_lpz={this.state.initial_lpz}
                                        onChange={this.setLpzEncounter}
                                        onRemove={this.removeLpzEncounter}
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


const LpzEncounter = ({index, onChange, onRemove, initial_lpz}) => {
    const [lpz, setLpz] = useState(Math.round(initial_lpz / 10) * 10);
    const [win, setWin] = useState("");

    return <fieldset className={"p-1"}>
        <fieldset className={"relative"}>
            <button
                className={"absolute right-1 top-3 w-5"}
                onClick={() => onRemove(index)}
            >×
            </button>
        </fieldset>
        <fieldset
            className={`${win ? 'active' : 'inactive'} ${win == "yes" ? 'win' : ''} ${win == "no" ? 'loss' : ''} grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 my-2 rounded-lg p-2`}>
            <fieldset>
                <label><span></span>
                    <input
                        onChange={(e) => {
                            setLpz(e.target.value)
                            onChange({
                                index,
                                win,
                                lpz: e.target.value
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
                    className={"math "}>P<sub>A</sub> = {formatProbability(computeLpzEncounterProbability(initial_lpz, lpz))}
                </label>

            </fieldset>

            <fieldset>
                <label>
                    <input
                        name={`win[${index}]`}
                        checked={win === "yes"}
                        onChange={(e) => {
                            setWin("yes")
                            onChange({
                                index,
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
                            onChange({
                                index,
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
    </fieldset>
}

export default Lpz;
