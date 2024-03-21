import {useState} from "react";
import React, {Component} from "react";


const computeLpzEncounterProbability = (lpz1, lpz2) => {
    let exponent = (lpz2 - lpz1) / 150;
    return 1 / (1 + Math.pow(10, exponent))
}

const computeLpzEncounterDelta = (initial_lpz, base, lpz_encounter) => {
    let probability = computeLpzEncounterProbability(initial_lpz, lpz_encounter.lpz);
    if (lpz_encounter.win === 'yes') {
        return Math.round((1 - probability) * base);
    }
    if (lpz_encounter.win === 'no') {
        return -Math.round(probability * base);
    }
    return 0;
}

const computeLpzAggregateDelta = (initial_lpz, base, lpz_encounters) => {
    return lpz_encounters.reduce((accumulator, lpz_encounter) => {
        return accumulator + computeLpzEncounterDelta(initial_lpz, base, lpz_encounter);
    }, 0);
}


const formatDelta = (delta) => {
    return `${delta >= 0 ? "+ " : "- "}${Math.abs(delta)}`;
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
        base: "Basis",
    }

    constructor(props) {
        super(props);
        this.state = {
            base_modifiers: {},
            initial_lpz: 1429,
            lpz_encounters: [],
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
        let delta = computeLpzAggregateDelta(this.state.initial_lpz, this.getBase(), this.state.lpz_encounters);
        return (
            <>
                <div className={"grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-24 w-full"}>

                    <fieldset>
                        <label>Meine LPZ</label>
                        <input
                            name="lpz" inputMode="decimal"
                            min="1" max="2500" step="1"
                            onChange={(event) => {
                                this.setInitialLpz(event.target.value);
                            }}
                            type="number"
                            value={this.state.initial_lpz}/>
                    </fieldset>

                    <details className={""}>
                        <summary>{this.field_labels.base} <span
                            className={""}>{this.getBase()}</span></summary>
                        <fieldset>
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
                    </details>

                    {
                        this.state.lpz_encounters.map((value, index) => {
                                return <LpzEncounter
                                    key={index}
                                    index={index}
                                    base={this.getBase()}
                                    initial_lpz={this.state.initial_lpz}
                                    onChange={this.setLpzEncounter}
                                    onRemove={this.removeLpzEncounter}
                                />
                            }
                        )
                    }
                </div>

                <div>
                    <button
                        className={"my-3 w-full p-2 bg-gray-100 border rounded"}
                        onClick={() => this.addLpzEncounter({})}
                    >Spiel hinzufügen
                    </button>

                    <div
                        className={`${delta === 0 ? "bg-gray-200 border-gray-900" : (delta > 0 ? "bg-green-200 border-green-900" : "border-red-800 bg-red-200")} border-2 text-center px-2 py-2  rounded font-bold `}>
                        {formatLpz(this.state.initial_lpz)} {formatDelta(delta)} = {formatLpz(this.state.initial_lpz + delta)}
                    </div>

                </div>
            </>


        )
    }
}

const LpzEncounterMath = ({initial_lpz, base, lpz_encounter}) => {
    const delta = computeLpzEncounterDelta(initial_lpz, base, lpz_encounter);
    return <div
        className={`border-2 text-center px-2 py-2 rounded 
                        ${delta === 0 ? "bg-gray-200 border-gray-900" : (delta > 0 ? "bg-green-200 border-green-900" : "border-red-800 bg-red-200")}`}>
        <div className={`whitespace-nowrap font-bold`}>{formatDelta(delta)}</div>
    </div>
}
const LpzEncounter = ({index, onChange, onRemove, initial_lpz, base}) => {
    const [lpz, setLpz] = useState(Math.round(initial_lpz / 10) * 10);
    const [win, setWin] = useState("");

    return <div
        className={`p-1 rounded max-w-24 w-full relative border-2 ${win === 'yes' ? "border-green-800 bg-green-200" : ''} ${win === 'no' ? "border-red-800 bg-red-200" : ""}`}>

        <button
            className={"px-1.5 absolute right-0 top-0"}
            onClick={() => onRemove(index)}
        >×
        </button>

        <div className={'text-center'}>Spiel</div>

        <div className={""}>

            <fieldset
                className={`text-center ${win === 'yes' ? "bg-green-200" : ''} ${win === 'no' ? "bg-red-200" : ""}`}>
                <input
                    onChange={(e) => {
                        setLpz(e.target.value)
                        onChange({
                            index,
                            win,
                            lpz
                        })
                    }}
                    inputMode="decimal"
                    min="1"
                    max="2500" step="1"
                    type="number" value={lpz}
                />

            </fieldset>

            <div className={"grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-0"}>
                <label className={`text-center rounded mb-3`}>
                    <input
                        className={'hidden'}
                        name={`win[${index}]`}
                        checked={win === "yes"}
                        onChange={(e) => {
                            setWin(e.target.value)
                            onChange({
                                index,
                                lpz,
                                win: e.target.value
                            })
                        }}
                        value="yes"
                        type="radio"/>

                    <span className={""}> Gewinn  </span>
                    <div
                        className={`whitespace-nowrap italic text-xs`}>{formatProbability(computeLpzEncounterProbability(initial_lpz, lpz))}</div>


                    {win == "yes" && <LpzEncounterMath initial_lpz={initial_lpz} base={base} lpz_encounter={{
                        lpz, win
                    }}/>}

                </label>

                <label className={`text-center rounded mb-3`}>
                    <input
                        className={'hidden'}
                        name={`win[${index}]`}
                        checked={win === "no"}
                        onChange={(e) => {
                            setWin(e.target.value)
                            onChange({
                                index,
                                lpz,
                                win: e.target.value
                            })
                        }}
                        value="no"
                        type="radio"/>
                    <span> Verlust  </span>
                    <div
                        className={`whitespace-nowrap italic text-xs`}>{formatProbability(computeLpzEncounterProbability(lpz, initial_lpz))}</div>
                    {win == "no" && <LpzEncounterMath initial_lpz={initial_lpz} base={base} lpz_encounter={{
                        lpz, win
                    }}/>}

                </label>

            </div>
        </div>
    </div>


}

export default Lpz;
