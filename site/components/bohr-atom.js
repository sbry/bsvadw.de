import React from 'react';


const Electron = ({
                      dur = 2,
                      position = 1,
                      mpath_href, transform
                  }) => {
    return (
        <g fill="none" stroke="bbb" strokeWidth="6px" transform={transform}>

            <circle
                fill="#d3181a"
                stroke="none" r={8}>

                <animateMotion dur={`${dur}s`} begin={`${dur - position}s`}
                               repeatDur={"indefinite"}
                               repeatCount="indefinite">
                    <mpath xlinkHref={mpath_href}/>
                </animateMotion>

            </circle>
        </g>
    )
}

const BohrAtom = ({
                      ...props
                  }) => {
    const width = props.width || 100;
    const height = props.height || 100;
    const transforms = [
        `rotate(45, ${width / 2}, ${width / 2})`,
        `rotate(-45, ${width / 2}, ${width / 2})`
    ]
    const electrons = [
        1, 2, 3
    ]
    return <svg viewBox={`"0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet" role="img"
                width={width} height={height}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
            <ellipse id="orbit"
                     fill="none" strokeWidth={width / 50} stroke="#fff"
                     cx={width / 2} cy={height / 2}
                     rx={width / 5} ry={width / 2}/>
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

