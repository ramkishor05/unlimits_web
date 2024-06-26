import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */
import logo from '../assets/images/logo.png';
//-----------------------|| LOGO SVG ||-----------------------//

const Logo = (props) => {
    const theme = useTheme();

    return (
      <div>
      <img src={logo} alt="Unlimits" width="150" height="50" />
        {
          
          /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * 
         *
         */
           /** <svg
        width="40px"
        height="40px"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g id="basket" transform="translate(-124 -372)">
          <path
            id="Path_80"
            data-name="Path 80"
            d="M139,383v21h13l1-3h6l1,3h13V383Z"
            fill="#1b8cff"
            opacity={0.3}
          />
          <line
            id="Line_141"
            data-name="Line 141"
            x2={34}
            transform="translate(139 385)"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit={10}
            strokeWidth={2}
            opacity={0.3}
          />
          <line
            id="Line_142"
            data-name="Line 142"
            x2={14}
            transform="translate(159 402)"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit={10}
            strokeWidth={2}
            opacity={0.3}
          />
          <line
            id="Line_143"
            data-name="Line 143"
            x2={14}
            transform="translate(139 402)"
            fill="none"
            stroke="#ffffff"
            strokeMiterlimit={10}
            strokeWidth={2}
            opacity={0.3}
          />
          <path
            id="Path_81"
            data-name="Path 81"
            d="M171,413h15V374H126v39h15"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={4}
          />
          <path
            id="Path_82"
            data-name="Path 82"
            d="M153,404H139V383h34v21H159"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="square"
            strokeMiterlimit={10}
            strokeWidth={2}
          />
          <path
            id="Path_83"
            data-name="Path 83"
            d="M153,404H139V383h34v21H159"
            fill="none"
          />
          <rect
            id="Rectangle_9"
            data-name="Rectangle 9"
            width={30}
            height={6}
            transform="translate(141 408)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_144"
            data-name="Line 144"
            x1={3}
            y1={13.998}
            transform="translate(147 414.002)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_145"
            data-name="Line 145"
            x1={3}
            y2={13.998}
            transform="translate(162 414.002)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            id="Path_84"
            data-name="Path 84"
            d="M153,408v-7h6v7"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_146"
            data-name="Line 146"
            x2={30}
            transform="translate(141 411)"
            fill="none"
            stroke="#1b8cff"
            strokeMiterlimit={10}
            strokeWidth={2}
          />
          <line
            id="Line_147"
            data-name="Line 147"
            y2={15}
            transform="translate(181 374)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_148"
            data-name="Line 148"
            y2={8}
            transform="translate(177 374)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            id="Path_85"
            data-name="Path 85"
            d="M171,414l-6,21a2.943,2.943,0,0,0-3-3,2.874,2.874,0,0,0-3,2.916V435a2.943,2.943,0,0,0-3-3,2.874,2.874,0,0,0-3,2.916V435a2.943,2.943,0,0,0-3-3,2.874,2.874,0,0,0-3,2.916V435l-6-21"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_149"
            data-name="Line 149"
            y2={18}
            transform="translate(156 414)"
            fill="none"
            stroke="#1b8cff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_150"
            data-name="Line 150"
            x1={7}
            y1={3}
            transform="translate(149 423)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_151"
            data-name="Line 151"
            x1={7}
            y2={3}
            transform="translate(156 423)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_152"
            data-name="Line 152"
            x1={8}
            y1={3}
            transform="translate(148 418)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_153"
            data-name="Line 153"
            x1={5.218}
            y2={2.236}
            transform="translate(142.782 418)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_154"
            data-name="Line 154"
            x1={4.903}
            y2={1.839}
            transform="translate(144.097 423)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_155"
            data-name="Line 155"
            x1={4.838}
            y1={2.072}
            transform="translate(163 423)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_156"
            data-name="Line 156"
            x1={5.286}
            y1={1.982}
            transform="translate(164 418)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <line
            id="Line_157"
            data-name="Line 157"
            x1={8}
            y2={3}
            transform="translate(156 418)"
            fill="none"
            stroke="#1b8cff"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </g>
      </svg>
    
      <Typography sx={{    
                    margin: '15px',
                    fontWeight: 900,
                    lineHeight: '1.334em',
                    fontFamily: 'Roboto,sans-serif, unset',
                    fontSize: 18,
                    color: 'blueviolet'}}>
        Unlimits
      </Typography>
      </>*/
      
      }
      </div>
    );
};

export default Logo;
