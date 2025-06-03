import React from 'react';

/**
 *  we learned a lot here:
 * https://stackoverflow.com/questions/55632058/set-origin-and-rotation-on-animatemotions-path
 */
const BohrAtom = ({...props}) => {
    const width = props.width || 100;
    const height = props.height || 100;
    const counter = props.counter || 2;
    const center_x = width / 2;
    const center_y = height / 2;
    const transforms = [
        `rotate(45, ${center_x}, ${center_y})`,
        `rotate(-45, ${center_x}, ${center_y})`
    ]
    /*
     * three electrons per ellipse
     */
    const electrons = [
        1, 2, 3
    ]
    // @todo not quite clear about the radii of the ellipse
    // @todo would be nice to have a soft rotation of the whole thing
    return <svg viewBox={`"0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet" role="img"
                width={width} height={height}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <ellipse id="orbit"
                     fill="none" strokeWidth={width / 50} stroke="#fff"
                     cx={center_x} cy={center_y}

                     rx={width / 5}
                     ry={width / 2}
            />
        </defs>

        <circle id="atom" cx={width / 2} cy={height / 2} r={width / 2} fill="#20782d"/>
        <circle id="nucleus" fill="#fff" cx={width / 2} cy={height / 2} r={width / 10}/>

        {transforms.map((v, i) => (<g transform={transforms[i]} key={i}>
            <use xlinkHref={"#orbit"}/>
            {electrons.map((electron, i) => (
                <circle
                    fill="#d3181a"
                    stroke="none" r={width / 40}>
                    <animateMotion dur={`${electrons.length}s`} begin={`${electron}s`}
                                   repeatDur={"indefinite"}
                                   repeatCount="indefinite">
                        <mpath xlinkHref="#orbit"/>
                    </animateMotion>
                </circle>
            ))}
        </g>))}

    </svg>
};


export default BohrAtom;

