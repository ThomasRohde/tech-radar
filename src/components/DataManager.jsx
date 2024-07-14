/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialTechnologies = [
  // Tools (quadrantId: 0)
  {
    id: 0,
    name: "Docker",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A platform for developing, shipping, and running applications in containers",
    sponsor: "DevOps Team",
    date: "2023-03-05",
    quadrantId: 0,
  },
  {
    id: 1,
    name: "Kubernetes",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description:
      "An open-source system for automating deployment, scaling, and management of containerized applications",
    sponsor: "Infrastructure Team",
    date: "2023-08-17",
    quadrantId: 0,
  },
  {
    id: 2,
    name: "Terraform",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "An open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure",
    sponsor: "Cloud Team",
    date: "2023-09-01",
    quadrantId: 0,
  },
  {
    id: 3,
    name: "Jenkins X",
    deleted: false,
    ring: "Hold",
    status: "No change",
    description:
      "An open source automated CI/CD solution for cloud native applications on Kubernetes",
    sponsor: "DevOps Team",
    date: "2023-02-28",
    quadrantId: 0,
  },
  {
    id: 4,
    name: "Micro Frontends",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "Architectural style where independently deliverable frontend applications are composed into a greater whole",
    sponsor: "Frontend Team",
    date: "2023-05-15",
    quadrantId: 1,
  },
  {
    id: 5,
    name: "Serverless Architecture",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description:
      "A way to build and run applications and services without having to manage infrastructure",
    sponsor: "Cloud Team",
    date: "2023-06-22",
    quadrantId: 1,
  },
  {
    id: 6,
    name: "Event Sourcing",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "Storing all changes to the application state as a sequence of events",
    sponsor: "Backend Team",
    date: "2023-07-30",
    quadrantId: 1,
  },
  {
    id: 7,
    name: "Blockchain",
    deleted: false,
    ring: "Hold",
    status: "No change",
    description:
      "A distributed ledger technology that allows for secure, transparent and tamper-proof transactions",
    sponsor: "Innovation Department",
    date: "2023-04-10",
    quadrantId: 1,
  },
  {
    id: 8,
    name: "AWS",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A comprehensive and widely adopted cloud platform, offering over 200 fully featured services",
    sponsor: "Infrastructure Team",
    date: "2023-01-15",
    quadrantId: 2,
  },
  {
    id: 9,
    name: "Google Cloud Platform",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description:
      "A suite of cloud computing services that runs on the same infrastructure that Google uses internally",
    sponsor: "Cloud Team",
    date: "2023-07-20",
    quadrantId: 2,
  },
  {
    id: 10,
    name: "Azure",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "Microsoft's public cloud computing platform, providing a range of cloud services",
    sponsor: "IT Department",
    date: "2023-08-05",
    quadrantId: 2,
  },
  {
    id: 11,
    name: "Heroku",
    deleted: false,
    ring: "Hold",
    status: "No change",
    description:
      "A cloud platform as a service supporting several programming languages",
    sponsor: "Development Team",
    date: "2023-04-30",
    quadrantId: 2,
  },
  {
    id: 12,
    name: "TypeScript",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A typed superset of JavaScript that compiles to plain JavaScript",
    sponsor: "Frontend Team",
    date: "2023-02-10",
    quadrantId: 3,
  },
  {
    id: 13,
    name: "React",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description: "A JavaScript library for building user interfaces",
    sponsor: "UI Team",
    date: "2023-06-15",
    quadrantId: 3,
  },
  {
    id: 14,
    name: "GraphQL",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "A query language for APIs and a runtime for executing those queries with your existing data",
    sponsor: "API Team",
    date: "2023-09-10",
    quadrantId: 3,
  },
  {
    id: 15,
    name: "Angular",
    deleted: false,
    ring: "Hold",
    status: "No change",
    description: "A platform for building mobile and desktop web applications",
    sponsor: "Frontend Team",
    date: "2023-03-20",
    quadrantId: 3,
  },
  {
    id: 16,
    name: "Ansible",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "An open-source software provisioning, configuration management, and application-deployment tool",
    sponsor: "DevOps Team",
    date: "2023-10-01",
    quadrantId: 0,
  },
  {
    id: 17,
    name: "Prometheus",
    deleted: false,
    ring: "Trial",
    status: "New",
    description: "An open-source systems monitoring and alerting toolkit",
    sponsor: "Operations Team",
    date: "2023-10-05",
    quadrantId: 0,
  },
  {
    id: 18,
    name: "GitLab CI/CD",
    deleted: false,
    ring: "Assess",
    status: "Moved in/out",
    description:
      "A tool built into GitLab for software development through the continuous methodologies",
    sponsor: "DevOps Team",
    date: "2023-10-10",
    quadrantId: 0,
  },
  {
    id: 19,
    name: "Microservices",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "An architectural style that structures an application as a collection of loosely coupled services",
    sponsor: "Architecture Team",
    date: "2023-10-15",
    quadrantId: 1,
  },
  {
    id: 20,
    name: "Domain-Driven Design",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "An approach to software development that centers the development on programming a domain model",
    sponsor: "Backend Team",
    date: "2023-10-20",
    quadrantId: 1,
  },
  {
    id: 21,
    name: "CQRS",
    deleted: false,
    ring: "Assess",
    status: "Moved in/out",
    description:
      "Command Query Responsibility Segregation, an architectural pattern",
    sponsor: "Architecture Team",
    date: "2023-10-25",
    quadrantId: 1,
  },
  {
    id: 22,
    name: "Digital Ocean",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "A cloud infrastructure provider that offers developer-friendly solutions",
    sponsor: "Cloud Team",
    date: "2023-11-01",
    quadrantId: 2,
  },
  {
    id: 23,
    name: "OpenShift",
    deleted: false,
    ring: "Assess",
    status: "Moved in/out",
    description:
      "A family of containerization software products developed by Red Hat",
    sponsor: "Infrastructure Team",
    date: "2023-11-05",
    quadrantId: 2,
  },
  {
    id: 24,
    name: "Cloudflare",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A web infrastructure and website security company, providing CDN services",
    sponsor: "Security Team",
    date: "2023-11-10",
    quadrantId: 2,
  },
  {
    id: 25,
    name: "Vue.js",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "A progressive JavaScript framework for building user interfaces",
    sponsor: "Frontend Team",
    date: "2023-11-15",
    quadrantId: 3,
  },
  {
    id: 26,
    name: "Rust",
    deleted: false,
    ring: "Assess",
    status: "Moved in/out",
    description:
      "A multi-paradigm programming language designed for performance and safety",
    sponsor: "Systems Team",
    date: "2023-11-20",
    quadrantId: 3,
  },
  {
    id: 27,
    name: "Kotlin",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description: "A modern programming language that makes developers happier",
    sponsor: "Mobile Team",
    date: "2023-11-25",
    quadrantId: 3,
  },
  {
    id: 28,
    name: "Svelte",
    deleted: false,
    ring: "Assess",
    status: "New",
    description: "A radical new approach to building user interfaces",
    sponsor: "UI Team",
    date: "2023-12-01",
    quadrantId: 3,
  },
  {
    id: 29,
    name: "WebAssembly",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description:
      "A binary instruction format for a stack-based virtual machine",
    sponsor: "Web Performance Team",
    date: "2023-12-05",
    quadrantId: 3,
  },
  {
    id: 30,
    name: "Deno",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "A simple, modern and secure runtime for JavaScript and TypeScript",
    sponsor: "Backend Team",
    date: "2023-12-10",
    quadrantId: 3,
  },
  {
    id: 31,
    name: "Tailwind CSS",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces",
    sponsor: "Frontend Team",
    date: "2024-01-05",
    quadrantId: 3,
  },
  {
    id: 32,
    name: "Next.js",
    deleted: false,
    ring: "Adopt",
    status: "Moved in/out",
    description:
      "A React framework for production-grade applications with server-side rendering and static site generation",
    sponsor: "Web Team",
    date: "2024-01-10",
    quadrantId: 3,
  },
  {
    id: 33,
    name: "Go",
    deleted: false,
    ring: "Trial",
    status: "No change",
    description:
      "An open source programming language that makes it easy to build simple, reliable, and efficient software",
    sponsor: "Backend Team",
    date: "2024-01-15",
    quadrantId: 3,
  },
  {
    id: 34,
    name: "Apache Kafka",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A distributed event streaming platform capable of handling trillions of events a day",
    sponsor: "Data Team",
    date: "2024-01-20",
    quadrantId: 0,
  },
  {
    id: 35,
    name: "Elasticsearch",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description:
      "A distributed, RESTful search and analytics engine capable of addressing a growing number of use cases",
    sponsor: "Search Team",
    date: "2024-01-25",
    quadrantId: 0,
  },
  {
    id: 36,
    name: "gRPC",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description: "A high performance, open source universal RPC framework",
    sponsor: "API Team",
    date: "2024-02-01",
    quadrantId: 1,
  },
  {
    id: 37,
    name: "Apache Airflow",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "A platform to programmatically author, schedule and monitor workflows",
    sponsor: "Data Engineering Team",
    date: "2024-02-05",
    quadrantId: 0,
  },
  {
    id: 38,
    name: "Flutter",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase",
    sponsor: "Mobile Team",
    date: "2024-02-10",
    quadrantId: 3,
  },
  {
    id: 39,
    name: "Apache Spark",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description: "A unified analytics engine for large-scale data processing",
    sponsor: "Big Data Team",
    date: "2024-02-15",
    quadrantId: 0,
  },
  {
    id: 40,
    name: "GitOps",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "A way of implementing Continuous Deployment for cloud native applications",
    sponsor: "DevOps Team",
    date: "2024-02-20",
    quadrantId: 1,
  },
  {
    id: 41,
    name: "Istio",
    deleted: false,
    ring: "Trial",
    status: "Moved in/out",
    description:
      "An open platform to connect, manage, and secure microservices",
    sponsor: "Infrastructure Team",
    date: "2024-02-25",
    quadrantId: 2,
  },
  {
    id: 42,
    name: "PyTorch",
    deleted: false,
    ring: "Adopt",
    status: "No change",
    description: "An open source machine learning framework",
    sponsor: "AI Team",
    date: "2024-03-01",
    quadrantId: 3,
  },
  {
    id: 43,
    name: "Knative",
    deleted: false,
    ring: "Assess",
    status: "New",
    description:
      "Kubernetes-based platform to build, deploy, and manage modern serverless workloads",
    sponsor: "Cloud Team",
    date: "2024-03-05",
    quadrantId: 2,
  },
  {
    id: 44,
    name: "Apache Flink",
    deleted: false,
    ring: "Trial",
    status: "New",
    description:
      "A framework and distributed processing engine for stateful computations over unbounded and bounded data streams",
    sponsor: "Stream Processing Team",
    date: "2024-03-10",
    quadrantId: 0,
  },
  {
    id: 45,
    name: "Rust",
    deleted: false,
    ring: "Assess",
    status: "Moved in/out",
    description:
      "A language empowering everyone to build reliable and efficient software",
    sponsor: "Systems Team",
    date: "2024-03-15",
    quadrantId: 3,
  },
];

const fetchTechnologies = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTechnologies);
    }, 1000);
  });
};

export const TechnologiesContext = createContext();

export const TechnologiesProvider = ({ children }) => {
  const [technologies, setTechnologies] = useState(null);
  const [customRadars, setCustomRadars] = useState([]);
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

  // Technology CRUD operations
  const addTechnology = (newTech) => {
    setTechnologies((prevTechs) => [
      ...prevTechs,
      {
        ...newTech,
        id: Math.max(...prevTechs.map((t) => t.id)) + 1,
        deleted: false,
      },
    ]);
  };

  const updateTechnology = (updatedTech) => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === updatedTech.id ? { ...tech, ...updatedTech } : tech
      )
    );
  };

  const deleteTechnology = (id) => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === id ? { ...tech, deleted: true } : tech
      )
    );
  };

  const getTechnology = (id) => {
    return technologies ? technologies.find((tech) => tech.id === id) : null;
  };

  const getActiveTechnologies = () => {
    return technologies ? technologies.filter((tech) => !tech.deleted) : [];
  };

  const getAllTechnologies = () => {
    return technologies ? technologies : [];
  };

  const restoreTechnology = (id) => {
    setTechnologies((prevTechs) =>
      prevTechs.map((tech) =>
        tech.id === id ? { ...tech, deleted: false } : tech
      )
    );
  };

  // Custom Radar CRUD operations
  const addCustomRadar = (newRadar) => {
    setCustomRadars((prevRadars) => [
      ...prevRadars,
      {
        ...newRadar,
        id: Math.max(...prevRadars.map((r) => r.id), 0) + 1,
        technologies: [],
      },
    ]);
  };

  const updateCustomRadar = (updatedRadar) => {
    setCustomRadars((prevRadars) =>
      prevRadars.map((radar) =>
        radar.id === updatedRadar.id ? { ...radar, ...updatedRadar } : radar
      )
    );
  };

  const deleteCustomRadar = (id) => {
    setCustomRadars((prevRadars) =>
      prevRadars.filter((radar) => radar.id !== id)
    );
  };

  const getCustomRadar = (id) => {
    return customRadars.find((radar) => radar.id === id);
  };

  const getAllCustomRadars = () => {
    return customRadars;
  };

  // Custom Radar Technology Management
  const addTechnologyToCustomRadar = (radarId, techId) => {
    setCustomRadars((prevRadars) =>
      prevRadars.map((radar) => {
        if (radar.id === radarId && !radar.technologies.includes(techId)) {
          return { ...radar, technologies: [...radar.technologies, techId] };
        }
        return radar;
      })
    );
  };

  const removeTechnologyFromCustomRadar = (radarId, techId) => {
    setCustomRadars((prevRadars) =>
      prevRadars.map((radar) => {
        if (radar.id === radarId) {
          return {
            ...radar,
            technologies: radar.technologies.filter((id) => id !== techId),
          };
        }
        return radar;
      })
    );
  };

  return (
    <TechnologiesContext.Provider
      value={{
        technologies: getActiveTechnologies(),
        loading,
        error,
        addTechnology,
        updateTechnology,
        deleteTechnology,
        restoreTechnology,
        getTechnology,
        getAllTechnologies,
        customRadars,
        addCustomRadar,
        updateCustomRadar,
        deleteCustomRadar,
        getCustomRadar,
        getAllCustomRadars,
        addTechnologyToCustomRadar,
        removeTechnologyFromCustomRadar,
      }}
    >
      {children}
    </TechnologiesContext.Provider>
  );
};

TechnologiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TechnologiesProvider;
