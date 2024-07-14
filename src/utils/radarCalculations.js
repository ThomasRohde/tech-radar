// src/utils/radarCalculations.js

// Global constants
const RING_PADDING = 0.1; // Percentage of ring width to use as padding

const getQuadrantAngles = (quadrantId) => {
    switch (quadrantId) {
        case 0: return { start: 3 * Math.PI / 2, end: 2 * Math.PI }; // Tools
        case 1: return { start: Math.PI, end: 3 * Math.PI / 2 }; // Techniques  
        case 2: return { start: Math.PI / 2, end: Math.PI }; // Platforms        
        case 3: return { start: 0, end: Math.PI / 2 }; // Languages & Frameworks
        default: return { start: 0, end: 2 * Math.PI };
    }
};

const distance = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

const calculateIdealPosition = (tech, svgSize, rings) => {
    const { start, end } = getQuadrantAngles(tech.quadrantId);
    const maxRadius = Math.min(svgSize.width, svgSize.height) / 2;
    
    const ringIndex = rings.indexOf(tech.ring);
    const ringWidth = maxRadius / rings.length;
    const innerRadius = ringIndex * ringWidth;
    const outerRadius = (ringIndex + 1) * ringWidth;
    
    // Calculate a random radius within the ring, avoiding the exact perimeters
    const minRadius = innerRadius + (ringWidth * RING_PADDING);
    const maxRingRadius = outerRadius - (ringWidth * RING_PADDING);
    const radius = minRadius + Math.random() * (maxRingRadius - minRadius);
    
    const angle = start + Math.random() * (end - start);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    
    return { x, y, innerRadius, outerRadius, angle };
};

const applyForces = (node, nodes, svgSize) => {
    const repulsionForce = 0.5;
    const attractionForce = 0.02;
    const maxDistance = Math.min(svgSize.width, svgSize.height) / 4;
    const nodeRadius = Math.min(svgSize.width, svgSize.height) / 50; // Matches the circle radius in Radar
    const minDistance = nodeRadius * 2; // Minimum distance is two times the node radius

    let fx = 0, fy = 0;

    // Repulsion from other nodes
    nodes.forEach(otherNode => {
        if (node !== otherNode) {
            const d = distance(node.position, otherNode.position);
            if (d < maxDistance) {
                const force = repulsionForce * minDistance / (d * d);
                fx += force * (node.position.x - otherNode.position.x);
                fy += force * (node.position.y - otherNode.position.y);
            }
        }
    });

    // Attraction to ideal position
    const d = distance(node.position, node.idealPosition);
    const force = attractionForce * d;
    fx += force * (node.idealPosition.x - node.position.x);
    fy += force * (node.idealPosition.y - node.position.y);

    return { fx, fy };
};

const updatePosition = (node, force, svgSize) => {
    const damping = 0.3;

    node.position.x += force.fx * damping;
    node.position.y += force.fy * damping;

    // Calculate the new angle and radius
    let newAngle = Math.atan2(node.position.y, node.position.x);
    if (newAngle < 0) newAngle += 2 * Math.PI;
    
    const newRadius = Math.sqrt(node.position.x * node.position.x + node.position.y * node.position.y);

    // Constrain the angle to the node's quadrant
    const { start, end } = getQuadrantAngles(node.quadrantId);
    newAngle = Math.max(start, Math.min(end, newAngle));

    // Constrain the radius to stay within the ring, avoiding exact perimeters
    const ringWidth = node.outerRadius - node.innerRadius;
    const minRadius = node.innerRadius + (ringWidth * RING_PADDING);
    const maxRadius = node.outerRadius - (ringWidth * RING_PADDING);
    const constrainedRadius = Math.max(minRadius, Math.min(maxRadius, newRadius));

    // Update the position
    node.position.x = constrainedRadius * Math.cos(newAngle);
    node.position.y = constrainedRadius * Math.sin(newAngle);
};

export const calculateTechnologiesWithPositions = (technologies, svgSize, rings) => {
    if (!technologies) return [];
    
    const nodes = technologies.map(tech => {
        const idealPosition = calculateIdealPosition(tech, svgSize, rings);
        return {
            ...tech,
            position: { ...idealPosition },
            idealPosition,
            innerRadius: idealPosition.innerRadius,
            outerRadius: idealPosition.outerRadius,
            quadrantId: tech.quadrantId
        };
    });

    const iterations = 50;
    for (let i = 0; i < iterations; i++) {
        nodes.forEach(node => {
            const force = applyForces(node, nodes, svgSize);
            updatePosition(node, force, svgSize);
        });
    }

    // Add the centering offset here, after all calculations
    const centerX = svgSize.width / 2;
    const centerY = svgSize.height / 2;
    return nodes.map(node => ({
        ...node,
        position: {
            x: node.position.x + centerX,
            y: node.position.y + centerY
        }
    }));
};