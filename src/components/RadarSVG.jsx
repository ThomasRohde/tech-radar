/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { QUADRANTS, RINGS } from '../constants';

const RadarSVG = ({
  svgSize,
  technologiesWithPositions,
  handleQuadrantClick,
  getColor,
  getStatusFill,
  setHoveredTech,
  isExtraSmallScreen
}) => {
  const theme = useTheme();

  const QuadrantLabel = ({ quadrantIndex, children }) => {
    let x, y, textAnchor;

    switch (quadrantIndex) {
      case 0: // Tools
        x = svgSize.width - 10;
        y = 30;
        textAnchor = "end";
        break;
      case 1: // Techniques
        x = 10;
        y = 30;
        textAnchor = "start";
        break;
      case 2: // Platforms
        x = 10;
        y = svgSize.height - 20;
        textAnchor = "start";
        break;
      case 3: // Languages & Frameworks
        x = svgSize.width - 10;
        y = svgSize.height - 45;
        textAnchor = "end";
        break;
      default:
        x = 0;
        y = 0;
        textAnchor = "start";
    }

    const multiline = children === "Languages & Frameworks";
    const [firstLine, secondLine] = multiline
      ? children.split(" & ")
      : [children];

    return (
      <g
        onClick={() => handleQuadrantClick(quadrantIndex)}
        style={{ cursor: "pointer" }}
      >
        <text
          x={x}
          y={y}
          fontSize={theme.typography.subtitle1.fontSize}
          fontWeight={theme.typography.subtitle1.fontWeight}
          fill={theme.palette.text.primary}
          textAnchor={textAnchor}
        >
          {firstLine}
          {multiline && (
            <tspan x={x} dy="1.2em">
              & {secondLine}
            </tspan>
          )}
          <tspan dx="5">🔗</tspan>
        </text>
      </g>
    );
  };

  return (
    <svg
      width={svgSize.width}
      height={svgSize.height}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        width={svgSize.width}
        height={svgSize.height}
        fill={theme.palette.background.default}
      />
      <circle
        cx={svgSize.width / 2}
        cy={svgSize.height / 2}
        r={Math.min(svgSize.width, svgSize.height) / 2}
        fill={theme.palette.background.paper}
      />
      {RINGS.map((_, index) => (
        <circle
          key={index}
          cx={svgSize.width / 2}
          cy={svgSize.height / 2}
          r={(4 - index) * (Math.min(svgSize.width, svgSize.height) / 8)}
          fill="none"
          stroke={theme.palette.divider}
          strokeWidth="2"
        />
      ))}
      <line
        x1="0"
        y1={svgSize.height / 2}
        x2={svgSize.width}
        y2={svgSize.height / 2}
        stroke={theme.palette.divider}
        strokeWidth="2"
      />
      <line
        x1={svgSize.width / 2}
        y1="0"
        x2={svgSize.width / 2}
        y2={svgSize.height}
        stroke={theme.palette.divider}
        strokeWidth="2"
      />
      {!isExtraSmallScreen &&
        RINGS.map((ring, index) => (
          <text
            key={ring}
            x={svgSize.width / 2 + 10}
            y={(4 - index) * (Math.min(svgSize.width, svgSize.height) / 8) - 5}
            fontSize={theme.typography.subtitle1.fontSize}
            fontWeight={theme.typography.subtitle1.fontWeight}
            textAnchor="start"
            fill={theme.palette.text.primary}
          >
            {ring}
          </text>
        ))}
      {!isExtraSmallScreen &&
        QUADRANTS.map((quadrantName, index) => (
          <QuadrantLabel
            key={index}
            quadrantIndex={index}
          >
            {quadrantName}
          </QuadrantLabel>
        ))}
      {technologiesWithPositions.map((tech) => {
        const { x, y } = tech.position;
        return (
          <g
            key={tech.id}
            onMouseEnter={() => setHoveredTech(tech)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            <circle
              cx={x}
              cy={y}
              r={Math.min(svgSize.width, svgSize.height) / 50}
              fill={getColor(tech.quadrantId)}
              stroke={theme.palette.background.paper}
              strokeWidth="1"
            />
            <circle
              cx={x}
              cy={y}
              r={Math.min(svgSize.width, svgSize.height) / 70}
              fill={getStatusFill(tech.status)}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={theme.palette.background.paper}
              fontSize={theme.typography.caption.fontSize}
            >
              {tech.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default RadarSVG;