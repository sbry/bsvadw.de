import React from 'react';

import {shape, intersect} from "svg-intersections";


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    rotate(angle, origin = Point(0, 0)) {
        const theta = (Math.PI / 180) * angle;
        const cos_theta = Math.cos(theta)
        const sin_theta = Math.sin(theta)
        const nx = (cos_theta * (this.x - origin.x)) + (sin_theta * (this.y - origin.y)) + origin.x;
        const ny = (cos_theta * (this.y - origin.y)) - (sin_theta * (this.x - origin.x)) + origin.y;
        return new Point(nx, ny);
    }
}


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
    const centerPoint = new Point(center_x, center_y);
    const topApex = new Point(center_x, 0);
    const bottomApex = new Point(center_x, height);
    const ellipse = {
        rx: width / 5.4,
        ry: width / 2.05,
        cx: center_x,
        cy: center_y
    }
    const ellipses = [
        {
            transform: `rotate(45, ${center_x}, ${center_y})`,
            electrons: [
                1, 2
            ]
        },
        {
            transform: `rotate(-45, ${center_x}, ${center_y})`,
            electrons: [
                1, 2, 3, 4
            ]
        }
    ];
    console.log(ellipses);
    return <svg viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet" role="img"
                width={width} height={height}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <ellipse id="orbit" fill="none" stroke="#fff" strokeWidth={width / 35}
                     {...ellipse} />
        </defs>


        <g transform={`rotate(10, ${center_x}, ${center_y})`}>
            <circle id="nucleus" fill="#fff" cx={center_x} cy={center_y} r={width / 13} />

            {ellipses.map((ellipsis, i) => (<g transform={ellipsis.transform} key={`g-${i}`}>
                <use xlinkHref={"#orbit"}/>
                {ellipsis.electrons.map((electron, i) => (
                    <circle
                        key={`c-${i}`}
                        fill="#d3181a"
                        r={width / 23}>
                        <animateMotion dur={`${ellipsis.electrons.length * 5}s`}
                                       begin={`${(i + 1) * 5}s`}
                                       repeatCount="indefinite">
                            <mpath xlinkHref="#orbit"/>
                        </animateMotion>
                    </circle>
                ))}
            </g>))}

            {/*<animateTransform*/}
            {/*    attributeName="transform"*/}
            {/*    attributeType="XML"*/}
            {/*    type="rotate"*/}
            {/*    from={`0 ${center_x} ${center_y}`}*/}
            {/*    to={`360 ${center_x} ${center_y}`}*/}
            {/*    dur="60s"*/}
            {/*    repeatCount="indefinite"/>*/}

        </g>
    </svg>
};


export default BohrAtom;

