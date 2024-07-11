import React, { createContext, useContext, useEffect, useState } from 'react';

const TechnologiesContext = createContext();

const initialTechnologies = [
// Tools (quadrantId: 0)
{ id: 0, name: "Docker", deleted: false, ring: "Adopt", status: "No change", description: "A platform for developing, shipping, and running applications in containers", sponsor: "DevOps Team", date: "2023-03-05", quadrantId: 0 },
{ id: 1, name: "Kubernetes", deleted: false, ring: "Trial", status: "Moved in/out", description: "An open-source system for automating deployment, scaling, and management of containerized applications", sponsor: "Infrastructure Team", date: "2023-08-17", quadrantId: 0 },
{ id: 2, name: "Terraform", deleted: false, ring: "Assess", status: "New", description: "An open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure", sponsor: "Cloud Team", date: "2023-09-01", quadrantId: 0 },
{ id: 3, name: "Jenkins X", deleted: false, ring: "Hold", status: "No change", description: "An open source automated CI/CD solution for cloud native applications on Kubernetes", sponsor: "DevOps Team", date: "2023-02-28", quadrantId: 0 },

// Techniques (quadrantId: 1)
{ id: 4, name: "Micro Frontends", deleted: false, ring: "Adopt", status: "No change", description: "Architectural style where independently deliverable frontend applications are composed into a greater whole", sponsor: "Frontend Team", date: "2023-05-15", quadrantId: 1 },
{ id: 5, name: "Serverless Architecture", deleted: false, ring: "Trial", status: "Moved in/out", description: "A way to build and run applications and services without having to manage infrastructure", sponsor: "Cloud Team", date: "2023-06-22", quadrantId: 1 },
{ id: 6, name: "Event Sourcing", deleted: false, ring: "Assess", status: "New", description: "Storing all changes to the application state as a sequence of events", sponsor: "Backend Team", date: "2023-07-30", quadrantId: 1 },
{ id: 7, name: "Blockchain", deleted: false, ring: "Hold", status: "No change", description: "A distributed ledger technology that allows for secure, transparent and tamper-proof transactions", sponsor: "Innovation Department", date: "2023-04-10", quadrantId: 1 },

// Platforms (quadrantId: 2)
{ id: 8, name: "AWS", deleted: false, ring: "Adopt", status: "No change", description: "A comprehensive and widely adopted cloud platform, offering over 200 fully featured services", sponsor: "Infrastructure Team", date: "2023-01-15", quadrantId: 2 },
{ id: 9, name: "Google Cloud Platform", deleted: false, ring: "Trial", status: "Moved in/out", description: "A suite of cloud computing services that runs on the same infrastructure that Google uses internally", sponsor: "Cloud Team", date: "2023-07-20", quadrantId: 2 },
{ id: 10, name: "Azure", deleted: false, ring: "Assess", status: "New", description: "Microsoft's public cloud computing platform, providing a range of cloud services", sponsor: "IT Department", date: "2023-08-05", quadrantId: 2 },
{ id: 11, name: "Heroku", deleted: false, ring: "Hold", status: "No change", description: "A cloud platform as a service supporting several programming languages", sponsor: "Development Team", date: "2023-04-30", quadrantId: 2 },

// Languages & Frameworks (quadrantId: 3)
{ id: 12, name: "TypeScript", deleted: false, ring: "Adopt", status: "No change", description: "A typed superset of JavaScript that compiles to plain JavaScript", sponsor: "Frontend Team", date: "2023-02-10", quadrantId: 3 },
{ id: 13, name: "React", deleted: false, ring: "Trial", status: "Moved in/out", description: "A JavaScript library for building user interfaces", sponsor: "UI Team", date: "2023-06-15", quadrantId: 3 },
{ id: 14, name: "GraphQL", deleted: false, ring: "Assess", status: "New", description: "A query language for APIs and a runtime for executing those queries with your existing data", sponsor: "API Team", date: "2023-09-10", quadrantId: 3 },
{ id: 15, name: "Angular", deleted: false, ring: "Hold", status: "No change", description: "A platform for building mobile and desktop web applications", sponsor: "Frontend Team", date: "2023-03-20", quadrantId: 3 }
];

const fetchTechnologies = async () => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(initialTechnologies);
        }, 1000);
    });
};

export const useTechnologies = () => {
    const context = useContext(TechnologiesContext);
    if (!context) {
        throw new Error('useTechnologies must be used within a TechnologiesProvider');
    }
    return context;
};

export const TechnologiesProvider = ({ children }) => {
    const [technologies, setTechnologies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTechnologies = async () => {
            try {
                const data = await fetchTechnologies();
                setTechnologies(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        loadTechnologies();
    }, []);

    const addTechnology = (newTech) => {
        setTechnologies(prevTechs => [
            ...prevTechs,
            { ...newTech, id: Math.max(...prevTechs.map(t => t.id)) + 1, deleted: false }
        ]);
    };

    const updateTechnology = (updatedTech) => {
        setTechnologies(prevTechs =>
            prevTechs.map(tech => tech.id === updatedTech.id ? { ...tech, ...updatedTech } : tech)
        );
    };

    const deleteTechnology = (id) => {
        setTechnologies(prevTechs =>
            prevTechs.map(tech => tech.id === id ? { ...tech, deleted: true } : tech)
        );
    };

    const getTechnology = (id) => {
        return technologies ? technologies.find(tech => tech.id === id) : null;
    };

    const getActiveTechnologies = () => {
        return technologies ? technologies.filter(tech => !tech.deleted) : [];
    };

    return (
        <TechnologiesContext.Provider value={{
            technologies: getActiveTechnologies(),
            loading,
            error,
            addTechnology,
            updateTechnology,
            deleteTechnology,
            getTechnology
        }}>
            {children}
        </TechnologiesContext.Provider>
    );
};

export default TechnologiesProvider;