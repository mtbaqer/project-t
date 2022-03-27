import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

interface Props {
  animate: boolean;
}

const Confetti: FunctionComponent<Props> = ({ animate }) => {
  return (
    <Svg viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg" animate={animate}>
      <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
        <g id="grp7" opacity="0" transform="translate(7 6)">
          <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
          <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
        </g>

        <g id="grp6" opacity="0" transform="translate(0 28)">
          <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
          <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
        </g>

        <g id="grp3" opacity="0" transform="translate(52 28)">
          <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
          <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
        </g>

        <g id="grp2" opacity="0" transform="translate(44 6)">
          <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
          <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
        </g>

        <g id="grp5" opacity="0" transform="translate(14 50)">
          <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
        </g>

        <g id="grp4" opacity="0" transform="translate(35 50)">
          <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
          <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
        </g>

        <g id="grp1" opacity="0" transform="translate(24)">
          <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
          <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
        </g>
      </g>
    </Svg>
  );
};

const Svg = styled.svg<{ animate: boolean }>`
  position: absolute;
  top: 5px;
  left: 0;
  transform: scale(1.7);
  overflow: visible;

  ${({ animate }) =>
    animate
      ? css`
          #grp1 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(0, -30px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(10px, -50px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp2 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(30px, -15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(60px, -15px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp3 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(30px, 0px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(60px, 10px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp4 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(30px, 15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(40px, 50px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp5 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(-10px, 20px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(-60px, 30px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp6 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(-30px, 0px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(-60px, -5px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp7 {
            opacity: 1;
            transition: 0.1s all;
            #oval1 {
              transform: scale(0) translate(-30px, -15px);
              transform-origin: 0 0 0;
              transition: 0.5s transform;
            }
            #oval2 {
              transform: scale(0) translate(-55px, -30px);
              transform-origin: 0 0 0;
              transition: 1s transform;
            }
          }
          #grp2 {
            opacity: 1;
            transition: 0.1s opacity;
          }
          #grp3 {
            opacity: 1;
            transition: 0.1s opacity;
          }
          #grp4 {
            opacity: 1;
            transition: 0.1s opacity;
          }
          #grp5 {
            opacity: 1;
            transition: 0.1s opacity;
          }
          #grp6 {
            opacity: 1;
            transition: 0.1s opacity;
          }
          #grp7 {
            opacity: 1;
            transition: 0.1s opacity;
          }
        `
      : css``}
`;

export default Confetti;
