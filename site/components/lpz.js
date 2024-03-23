import {useState} from "react";
import React, {Component} from "react";
import classNames from 'classnames';
import Cookies from 'js-cookie'


const computeLpzEncounterProbability = (lpz_a, lpz_b) => {
    let exponent = (lpz_b - lpz_a) / 150;
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
            initial_lpz: Number(Cookies.get('initial_lpz')) || 1428,
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
        Cookies.set('initial_lpz', this.state.initial_lpz + delta)
        return (
            <>
                <div className={classNames("grid grid-cols-2 gap-5 max-w-24 w-full")}>

                    <fieldset>
                        <label>Meine LPZ</label>
                        <input
                            className={classNames("p-1 w-20 text-center focus:ring-blue-500 focus:border-blue-500")}
                            name="lpz" inputMode="decimal"
                            min="1" max="2500" step="1"
                            onChange={(event) => {
                                this.setInitialLpz(event.target.value);
                            }}
                            type="number"
                            value={this.state.initial_lpz}/>
                    </fieldset>

                    <details>
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
                        className={classNames(
                            "border-2 text-center px-2 py-2 rounded font-bold", {
                                "bg-gray-200 border-gray-800": delta === 0,
                                "bg-green-200 border-green-800": delta > 0,
                                "border-red-800 bg-red-200": delta < 0
                            })}>
                        {formatLpz(this.state.initial_lpz)} {formatDelta(delta)} = {formatLpz(this.state.initial_lpz + delta)}
                    </div>

                </div>
            </>


        )
    }
}

const LpzEncounterDelta = ({delta}) => (
    <div className={`whitespace-nowrap font-bold`}>{formatDelta(delta)}</div>
)

const LpzEncounterProbability = ({lpz_a, lpz_b}) => {
    const probability = computeLpzEncounterProbability(lpz_a, lpz_b);
    return <div
        className={`whitespace-nowrap italic text-xs`}>P = {formatProbability(probability)}</div>

}

const LpzEncounter = ({index, onChange, onRemove, initial_lpz, base}) => {
    const [lpz, setLpz] = useState(Math.round(initial_lpz / 10) * 10);
    const [win, setWin] = useState("");
    const delta = computeLpzEncounterDelta(initial_lpz, base, {
        lpz, win
    });
    return <div className={classNames(
        "p-1 rounded max-w-24 w-full relative border-2", {
            "border-green-800 bg-green-200": win === 'yes',
            "border-red-800 bg-red-200": win === 'no',
        })}>

        <button
            className={"px-1.5 absolute right-0 top-0"}
            onClick={() => onRemove(index)}
        >×
        </button>

        <div>
            <fieldset
                className={classNames("text-center", {
                        "border-green-800 bg-green-200": win === 'yes',
                        "border-red-800 bg-red-200": win === 'no',
                    }
                )}>
                <input
                    className={classNames("p-1 w-20 text-center focus:ring-blue-500 focus:border-blue-500", {
                        "border-green-800 bg-green-200": win === 'yes',
                        "border-red-800 bg-red-200": win === 'no',
                    })}
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
                    type="number"
                    value={lpz}
                />

            </fieldset>

            <div className={"grid grid-cols-2 gap-0"}>
                <label
                    className={classNames(
                        "text-center rounded-lg mb-3",
                        {
                            "": win === 'yes',
                            "cursor-pointer": win === 'no',
                        },
                        "border-2 border-transparent hover:bg-green-200 hover:border-green-800")}>
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

                    <LpzEncounterProbability lpz_a={initial_lpz} lpz_b={lpz}/>
                    {win === "yes" && <LpzEncounterDelta delta={delta}/>}

                </label>

                <label
                    className={classNames(
                        "text-center rounded-lg mb-3",
                        {
                            "": win === 'no',
                            "cursor-pointer": win === 'yes',
                        },
                        "border-2 border-transparent hover:bg-red-200 hover:border-red-800")}>
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
                    <LpzEncounterProbability lpz_a={lpz} lpz_b={initial_lpz}/>
                    {win === "no" && <LpzEncounterDelta delta={delta}/>}

                </label>

            </div>
        </div>
    </div>


}

export default Lpz;
