import React from 'react';


const Electron = ({
                      count = 2,
                      position = 1,
                      animate = false
                  }) => {
    return (
        <circle
            fill="#d3181a"
            stroke="none" r="8">
            {animate &&
            <animateMotion dur={`${count}s`} begin={`${count - position}s`}
                           repeatCount="1">
                <mpath href="#orbit"/>
            </animateMotion>
            }
        </circle>
    )
}

/*

let path = document.getElementById("path");
let svg = document.getElementById("svg");

// The first important function getTotalLength
let totalLength = path.getTotalLength();
let intersections = 27;

for(var i = 0; i <= intersections; i ++){
  let distance = i * 1/intersections * totalLength;

  // The second important function getPointAtLength
  let point = path.getPointAtLength(distance);
  addCircleToSVG(point.x, point.y);
  addTextToSVG(point.x, point.y);
}

function addCircleToSVG(x, y){
  let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", "5");
  circle.setAttribute("fill", "#8888ff");
  svg.appendChild(circle);
}

function addTextToSVG(x, y){
  let text = document.createElementNS("http://www.w3.org/2000/svg",'text');
  text.setAttribute("x", x + 10);
  text.setAttribute("y", y);
  text.setAttribute("fill", "orange");
  text.innerHTML = Math.round(y);
  svg.appendChild(text);
}

svg{
  width:auto;
  height: auto;
}

<svg id="svg" viewBox="0 0 1184.25 455.99">
  <path id="path" class="st0" d="M0.18,455.53c0,0,73-311,128-311s86,276,122,287s52-22,112-25s114,16,146,18s34,20,64,16s45-144,93-133
	s55-21,88-17s58,151,85,149s103-13,128-8s48-21,85-19c37,2,133,43,133,43" fill="#666666"/>
</svg>

 */

const OrbitSvg = ({
                      height = "24px",
                      width = "24px",
                      ...props
                  }) => (
    <svg viewBox="0 0 128 128"
         width={width}
         height={height}
         xmlns="http://www.w3.org/2000/svg">
        <defs>
            <path id="orbit"
                  d="M 0, 0 A 32,80 0 1,0 1,0 z"/>
        </defs>

        {true &&
        <rect width="100%" height="100%" fill="#ccc"/>

        }

        <circle cx="64" cy="62" r="64" fill="#20782d"/>


        <g transform="rotate(10,64,64)">
            {false && <animateTransform attributeName="transform"
                                        attributeType="XML"
                                        type="rotate"
                                        from="0 64 64"
                                        to="360 64 64"
                                        dur="30s"
                                        repeatCount="indefinite"/>}

            <circle id="nucleus" fill="#fff" cx="64" cy="64" r="9"/>

            <g transform="translate(19,20) scale(0.77)">
                <g fill="none" stroke="white" strokeWidth="6px"
                   id="l-orbit" transform="translate(118,0) rotate(45, 0, 0)">
                    <use href="#orbit"/>
                    <Electron count={4} position={1}/>
                    <Electron count={4} position={2}/>
                    <Electron count={4} position={3}/>
                    <Electron count={4} position={4}/>
                </g>


                <g fill="none"
                   stroke="white" strokeWidth="6px"
                   id="k-orbit" transform="rotate(-45, 0, 0)">
                    <use href="#orbit"/>
                    <Electron count={2} position={1}/>
                    <Electron count={2} position={2}/>
                </g>
            </g>
        </g>
    </svg>

)


export default OrbitSvg;