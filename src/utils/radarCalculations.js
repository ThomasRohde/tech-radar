// src/utils/radarCalculations.js

const getQuadrantAngles = (quadrantId) => {
    switch (quadrantId) {
        case 0: return { start: -Math.PI / 4, end: Math.PI / 4 };
        case 1: return { start: Math.PI / 4, end: 3 * Math.PI / 4 };
        case 2: return { start: 3 * Math.PI / 4, end: 5 * Math.PI / 4 };
        case 3: return { start: 5 * Math.PI / 4, end: 7 * Math.PI / 4 };
        default: return { start: 0, end: 2 * Math.PI };
    }
};

export const calculatePosition = (tech, svgSize, rings) => {
    const { start, end } = getQuadrantAngles(tech.quadrantId);
    const angle = start + Math.random() * (end - start);
    const maxRadius = Math.min(svgSize.width, svgSize.height) / 2;
    
    // Calculate ring radius based on the index of the ring in the provided rings array
    const ringIndex = rings.indexOf(tech.ring);
    const ringRadius = ((ringIndex + 1) / rings.length) * maxRadius;
    
    const radius = ringRadius - Math.random() * (maxRadius / (2 * rings.length));
    const x = svgSize.width / 2 + radius * Math.cos(angle);
    const y = svgSize.height / 2 + radius * Math.sin(angle);
    return { x, y };
};

export const calculateTechnologiesWithPositions = (technologies, svgSize, rings) => {
    if (!technologies) return [];
    return Object.values(technologies).flat().map(tech => ({
        ...tech,
        position: calculatePosition(tech, svgSize, rings)
    }));
};