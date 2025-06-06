import React from 'react';

// import {shape, intersect} from "svg-intersections";
// const centerPoint = new Point(center_x, center_y);
// const topApex = new Point(center_x, 0);
// const bottomApex = new Point(center_x, height);
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
    const total_width = width * 1.5;
    const total_height = height * 1.5;

    const center_x = width / 2;
    const center_y = height / 2;
    const config = {
        ellipseSvgAttributes: {
            rx: width / 5.4,
            ry: width / 2.05,
            cx: center_x,
            cy: center_y,
            strokeWidth: width / 35,
            stroke: "#fff"
        },
        nucleusSvgAttributes: {
            fill: "#fff",
            cx: center_x,
            cy: center_y,
            r: width / 13
        },
        atomSvgAttributes: {
            fill: "#20782d",
            cx: center_x,
            cy: center_y,
            r: width / 2
        },
        electronSvgAttributes: {
            fill: "#d3181a",
            r: width / 23
        }
    }

    const ellipses = [
        {
            transform: `rotate(45, ${center_x}, ${center_y})`,
            electrons: [
                true, true
            ]
        },
        {
            transform: `rotate(-45, ${center_x}, ${center_y})`,
            electrons: [
                true, true, true, true
            ]
        }
    ];
    return <svg viewBox={`0 0 ${total_width} ${total_height}`}
                preserveAspectRatio="xMidYMid meet" role="img"
                width={total_width} height={total_height}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <ellipse id="orbit" fill="none"
                     {...config.ellipseSvgAttributes} />
        </defs>
        <rect width={total_width} height={total_height} fill={"#ffcc00"}/>
        <g transform={`rotate(15, ${center_x}, ${center_y})`}>
            <circle id="atom" {...config.atomSvgAttributes} />
            <circle id="nucleus" {...config.nucleusSvgAttributes} />
            {ellipses.map((ellipsis, i) => (<g transform={ellipsis.transform} key={`g-${i}`}>
                <use xlinkHref={"#orbit"}/>
                {ellipsis.electrons.map((electron, i) => (
                    <circle
                        key={`c-${i}`}
                        {...config.electronSvgAttributes}
                    >
                        <animateMotion dur={`${ellipsis.electrons.length * 5}s`}
                                       begin={`${i * 5}s`}
                                       repeatCount="indefinite">
                            <mpath xlinkHref="#orbit"/>
                        </animateMotion>
                    </circle>
                ))}
            </g>))}
        </g>
    </svg>
};


export default BohrAtom;

