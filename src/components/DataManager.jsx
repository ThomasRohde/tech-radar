import React, { createContext, useContext, useEffect, useState } from 'react';

const fetchTechnologies = async () => {
    const dataSource = import.meta.env.VITE_DATA_SOURCE;

    if (dataSource === 'firestore') {
        console.log('Fetching from Firestore (not implemented yet)');
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Micro Frontends", ring: "Adopt", status: "No change", description: "Architectural style where independently deliverable frontend applications are composed into a greater whole", sponsor: "Frontend Team", date: "2023-05-15", quadrantId: 0 },
                { id: 2, name: "Serverless Architecture", ring: "Trial", status: "Moved in/out", description: "A way to build and run applications and services without having to manage infrastructure", sponsor: "Cloud Team", date: "2023-06-22", quadrantId: 0 },
                { id: 3, name: "Event Sourcing", ring: "Assess", status: "New", description: "Storing all changes to the application state as a sequence of events", sponsor: "Backend Team", date: "2023-07-30", quadrantId: 0 },
                { id: 4, name: "Blockchain", ring: "Hold", status: "No change", description: "A distributed ledger technology that allows for secure, transparent and tamper-proof transactions", sponsor: "Innovation Department", date: "2023-04-10", quadrantId: 0 },
                { id: 5, name: "Docker", ring: "Adopt", status: "No change", description: "A platform for developing, shipping, and running applications in containers", sponsor: "DevOps Team", date: "2023-03-05", quadrantId: 1 },
                { id: 6, name: "Kubernetes", ring: "Trial", status: "Moved in/out", description: "An open-source system for automating deployment, scaling, and management of containerized applications", sponsor: "Infrastructure Team", date: "2023-08-17", quadrantId: 1 },
                { id: 7, name: "Terraform", ring: "Assess", status: "New", description: "An open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure", sponsor: "Cloud Team", date: "2023-09-01", quadrantId: 1 },
                { id: 8, name: "Jenkins X", ring: "Hold", status: "No change", description: "An open source automated CI/CD solution for cloud native applications on Kubernetes", sponsor: "DevOps Team", date: "2023-02-28", quadrantId: 1 },
                { id: 9, name: "AWS", ring: "Adopt", status: "No change", description: "A comprehensive and widely adopted cloud platform, offering over 200 fully featured services", sponsor: "Infrastructure Team", date: "2023-01-15", quadrantId: 2 },
                { id: 10, name: "Google Cloud Platform", ring: "Trial", status: "Moved in/out", description: "A suite of cloud computing services that runs on the same infrastructure that Google uses internally", sponsor: "Cloud Team", date: "2023-07-20", quadrantId: 2 },
                { id: 11, name: "Azure", ring: "Assess", status: "New", description: "Microsoft's public cloud computing platform, providing a range of cloud services", sponsor: "IT Department", date: "2023-08-05", quadrantId: 2 },
                { id: 12, name: "Heroku", ring: "Hold", status: "No change", description: "A cloud platform as a service supporting several programming languages", sponsor: "Development Team", date: "2023-04-30", quadrantId: 2 },
                { id: 13, name: "TypeScript", ring: "Adopt", status: "No change", description: "A typed superset of JavaScript that compiles to plain JavaScript", sponsor: "Frontend Team", date: "2023-02-10", quadrantId: 3 },
                { id: 14, name: "React", ring: "Trial", status: "Moved in/out", description: "A JavaScript library for building user interfaces", sponsor: "UI Team", date: "2023-06-15", quadrantId: 3 },
                { id: 15, name: "GraphQL", ring: "Assess", status: "New", description: "A query language for APIs and a runtime for executing those queries with your existing data", sponsor: "API Team", date: "2023-09-10", quadrantId: 3 },
                { id: 16, name: "Angular", ring: "Hold", status: "No change", description: "A platform for building mobile and desktop web applications", sponsor: "Frontend Team", date: "2023-03-20", quadrantId: 3 }
            ]);
        }, 1000);
    });
};

const TechnologiesContext = createContext();

export const useTechnologies = () => useContext(TechnologiesContext);

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

    return (
        <TechnologiesContext.Provider value={{ technologies, loading, error }}>
            {children}
        </TechnologiesContext.Provider>
    );
};

export default TechnologiesProvider;