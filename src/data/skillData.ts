// src/data/skillData.ts

export interface Topic {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  resources: { type: "docs" | "video"; url: string; title: string }[];
}

export interface Section {
  title: string;
  priority: "🔥 Most Important" | "⭐ Important" | "📘 Intermediate" | "🚀 Advanced" | "🏆 Pro Level";
  topics: Topic[];
}

export interface SkillData {
  title: string;
  description: string;
  sections: Section[];
}

export const skillsData: Record<string, SkillData> = {
  "JS/TS": {
    title: "JavaScript & TypeScript",
    description: "Master the language of the web – from ES6+ fundamentals to type‑safe development with TypeScript.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Variables & Data Types", difficulty: "Beginner", resources: [{ type: "docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures", title: "MDN: Data Types" }] },
          { name: "Functions (declaration, expression, arrow)", difficulty: "Beginner", resources: [] },
          { name: "Arrays & Objects", difficulty: "Beginner", resources: [] },
          { name: "Loops & Conditionals", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "ES6+ (destructuring, spread, rest)", difficulty: "Intermediate", resources: [] },
          { name: "Promises & Async/Await", difficulty: "Intermediate", resources: [{ type: "video", url: "https://www.youtube.com/watch?v=...", title: "Async JS Crash Course" }] },
          { name: "Modules (import/export)", difficulty: "Intermediate", resources: [] },
          { name: "Closures & Scope", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "TypeScript (types, interfaces)", difficulty: "Advanced", resources: [{ type: "docs", url: "https://www.typescriptlang.org/docs/", title: "TypeScript Handbook" }] },
          { name: "Event Loop & Concurrency", difficulty: "Advanced", resources: [] },
          { name: "Design Patterns in JS", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "React": {
    title: "React.js",
    description: "Build modern user interfaces with the most popular frontend library.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "JSX", difficulty: "Beginner", resources: [{ type: "docs", url: "https://react.dev/learn/writing-markup-with-jsx", title: "React Docs: JSX" }] },
          { name: "Functional Components", difficulty: "Beginner", resources: [] },
          { name: "Props", difficulty: "Beginner", resources: [] },
          { name: "State (useState)", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "useEffect & Lifecycle", difficulty: "Intermediate", resources: [] },
          { name: "Conditional Rendering", difficulty: "Intermediate", resources: [] },
          { name: "Lists & Keys", difficulty: "Intermediate", resources: [] },
          { name: "Forms & Controlled Components", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Context API", difficulty: "Advanced", resources: [] },
          { name: "Custom Hooks", difficulty: "Advanced", resources: [] },
          { name: "Performance (memo, useCallback)", difficulty: "Advanced", resources: [] },
          { name: "React Router", difficulty: "Advanced", resources: [] }
        ]
      },
      {
        title: "Pro Level",
        priority: "🏆 Pro Level",
        topics: [
          { name: "Next.js (App Router)", difficulty: "Pro", resources: [{ type: "docs", url: "https://nextjs.org/docs", title: "Next.js Docs" }] },
          { name: "State Management (Redux / Zustand)", difficulty: "Pro", resources: [] },
          { name: "Testing (Jest, RTL)", difficulty: "Pro", resources: [] }
        ]
      }
    ]
  },
  "Node/Express": {
    title: "Node.js & Express",
    description: "Build scalable backend services and APIs with JavaScript runtime and framework.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Node.js Runtime Basics", difficulty: "Beginner", resources: [] },
          { name: "npm & package.json", difficulty: "Beginner", resources: [] },
          { name: "Built‑in Modules (fs, path, http)", difficulty: "Beginner", resources: [] },
          { name: "Express Routing", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Middleware", difficulty: "Intermediate", resources: [] },
          { name: "JWT Authentication", difficulty: "Intermediate", resources: [] },
          { name: "Environment Variables", difficulty: "Intermediate", resources: [] },
          { name: "Error Handling", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Database Integration (MongoDB, PostgreSQL)", difficulty: "Advanced", resources: [] },
          { name: "RESTful API Design", difficulty: "Advanced", resources: [] },
          { name: "File Uploads & Static Files", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "DB & SQL": {
    title: "Databases & SQL",
    description: "Learn to store, query, and manage data using relational and NoSQL databases.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "SQL (SELECT, INSERT, UPDATE, DELETE)", difficulty: "Beginner", resources: [] },
          { name: "JOINs (INNER, LEFT, RIGHT)", difficulty: "Beginner", resources: [] },
          { name: "Aggregation (GROUP BY)", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Indexing & Performance", difficulty: "Intermediate", resources: [] },
          { name: "Normalization & Design", difficulty: "Intermediate", resources: [] },
          { name: "MongoDB (CRUD, Aggregation)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Transactions & ACID", difficulty: "Advanced", resources: [] },
          { name: "ORM (Prisma, Sequelize)", difficulty: "Advanced", resources: [] },
          { name: "Database Sharding", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Git": {
    title: "Git & Version Control",
    description: "Essential tool for collaboration and code management.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "git init, add, commit", difficulty: "Beginner", resources: [] },
          { name: "git push, pull, clone", difficulty: "Beginner", resources: [] },
          { name: "git status, log", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Branching & Merging", difficulty: "Intermediate", resources: [] },
          { name: "Resolving Conflicts", difficulty: "Intermediate", resources: [] },
          { name: "git stash, rebase", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "GitHub Actions", difficulty: "Advanced", resources: [] },
          { name: "Git Hooks", difficulty: "Advanced", resources: [] },
          { name: "Collaboration Workflows (Git Flow)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "API": {
    title: "REST & GraphQL APIs",
    description: "Design, build, and consume modern APIs.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "REST Principles (CRUD, status codes)", difficulty: "Beginner", resources: [] },
          { name: "HTTP Methods (GET, POST, PUT, DELETE)", difficulty: "Beginner", resources: [] },
          { name: "Postman / API Testing", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Authentication (API keys, JWT)", difficulty: "Intermediate", resources: [] },
          { name: "API Documentation (Swagger)", difficulty: "Intermediate", resources: [] },
          { name: "Rate Limiting & Caching", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "GraphQL (Queries, Mutations)", difficulty: "Advanced", resources: [] },
          { name: "API Gateway & Microservices", difficulty: "Advanced", resources: [] },
          { name: "WebSockets (Socket.io)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Testing": {
    title: "Testing & Debugging",
    description: "Ensure code quality with automated testing and efficient debugging.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Unit Testing (Jest)", difficulty: "Beginner", resources: [] },
          { name: "Console Debugging", difficulty: "Beginner", resources: [] },
          { name: "Browser DevTools", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Integration Tests", difficulty: "Intermediate", resources: [] },
          { name: "Mocking & Spies", difficulty: "Intermediate", resources: [] },
          { name: "Debugging with VS Code", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "End‑to‑End (Cypress, Playwright)", difficulty: "Advanced", resources: [] },
          { name: "Performance Profiling", difficulty: "Advanced", resources: [] },
          { name: "Continuous Testing (CI)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "HTML/CSS": {
    title: "HTML5 & CSS3",
    description: "Structure and style beautiful, responsive web pages.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Semantic HTML", difficulty: "Beginner", resources: [] },
          { name: "CSS Selectors & Properties", difficulty: "Beginner", resources: [] },
          { name: "Box Model", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Flexbox & Grid", difficulty: "Intermediate", resources: [] },
          { name: "Responsive Design (Media Queries)", difficulty: "Intermediate", resources: [] },
          { name: "CSS Variables", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Animations & Transitions", difficulty: "Advanced", resources: [] },
          { name: "Tailwind CSS", difficulty: "Advanced", resources: [] },
          { name: "Preprocessors (SASS)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "DevOps": {
    title: "DevOps Basics",
    description: "Automate development workflows and deploy applications.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Linux Commands", difficulty: "Beginner", resources: [] },
          { name: "Environment Variables & Config", difficulty: "Beginner", resources: [] },
          { name: "CI/CD Concepts", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Docker (Containers, Dockerfile)", difficulty: "Intermediate", resources: [] },
          { name: "GitHub Actions / GitLab CI", difficulty: "Intermediate", resources: [] },
          { name: "Deployment (Vercel, Heroku, AWS)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Kubernetes Basics", difficulty: "Advanced", resources: [] },
          { name: "Infrastructure as Code (Terraform)", difficulty: "Advanced", resources: [] },
          { name: "Monitoring (Prometheus, Grafana)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Sys Design": {
    title: "System Design",
    description: "Architect scalable, reliable, and maintainable systems.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "MVC Pattern", difficulty: "Beginner", resources: [] },
          { name: "Client‑Server Architecture", difficulty: "Beginner", resources: [] },
          { name: "Load Balancing Basics", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Caching Strategies (Redis, CDN)", difficulty: "Intermediate", resources: [] },
          { name: "Database Scaling (Replication, Sharding)", difficulty: "Intermediate", resources: [] },
          { name: "Message Queues (RabbitMQ, Kafka)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Microservices vs Monolith", difficulty: "Advanced", resources: [] },
          { name: "CAP Theorem", difficulty: "Advanced", resources: [] },
          { name: "Design Patterns (Circuit Breaker, Saga)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "DSA": {
    title: "Data Structures & Algorithms",
    description: "Solve problems efficiently and ace technical interviews.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Arrays & Strings", difficulty: "Beginner", resources: [] },
          { name: "HashMaps / Sets", difficulty: "Beginner", resources: [] },
          { name: "Recursion", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Sorting & Searching", difficulty: "Intermediate", resources: [] },
          { name: "Stacks & Queues", difficulty: "Intermediate", resources: [] },
          { name: "Linked Lists", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Trees & Graphs (BFS, DFS)", difficulty: "Advanced", resources: [] },
          { name: "Dynamic Programming", difficulty: "Advanced", resources: [] },
          { name: "Big O Analysis", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Soft Skills": {
    title: "Soft Skills for Developers",
    description: "Communication, teamwork, and project management essentials.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Agile / Scrum Basics", difficulty: "Beginner", resources: [] },
          { name: "Effective Communication", difficulty: "Beginner", resources: [] },
          { name: "Time Management", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Technical Writing", difficulty: "Intermediate", resources: [] },
          { name: "Pair Programming", difficulty: "Intermediate", resources: [] },
          { name: "Giving & Receiving Feedback", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Leadership & Mentoring", difficulty: "Advanced", resources: [] },
          { name: "Conflict Resolution", difficulty: "Advanced", resources: [] },
          { name: "Public Speaking / Presentations", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Cyber": {
    title: "Cybersecurity Basics",
    description: "Protect applications and data from common threats.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "HTTPS / SSL/TLS", difficulty: "Beginner", resources: [] },
          { name: "Authentication vs Authorisation", difficulty: "Beginner", resources: [] },
          { name: "Environment Secrets Management", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "XSS & CSRF Protection", difficulty: "Intermediate", resources: [] },
          { name: "SQL Injection Prevention", difficulty: "Intermediate", resources: [] },
          { name: "OWASP Top 10", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Rate Limiting & DDoS Mitigation", difficulty: "Advanced", resources: [] },
          { name: "Security Headers (CSP, HSTS)", difficulty: "Advanced", resources: [] },
          { name: "Penetration Testing Basics", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Cloud": {
    title: "Cloud Fundamentals",
    description: "Deploy and manage applications on AWS, Azure, or GCP.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Virtual Machines", difficulty: "Beginner", resources: [] },
          { name: "Object Storage (S3, Blob)", difficulty: "Beginner", resources: [] },
          { name: "IAM & Security Groups", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Serverless (Lambda, Functions)", difficulty: "Intermediate", resources: [] },
          { name: "Load Balancers & Auto‑Scaling", difficulty: "Intermediate", resources: [] },
          { name: "Basic Networking (VPC)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Infrastructure as Code (Terraform)", difficulty: "Advanced", resources: [] },
          { name: "Containers (ECS, AKS)", difficulty: "Advanced", resources: [] },
          { name: "Cost Optimisation", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Mobile (RN)": {
    title: "Mobile Development (React Native)",
    description: "Build cross‑platform mobile apps with React.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "React Native Setup", difficulty: "Beginner", resources: [] },
          { name: "Core Components (View, Text)", difficulty: "Beginner", resources: [] },
          { name: "Styling (StyleSheet)", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Navigation (Stack, Tab)", difficulty: "Intermediate", resources: [] },
          { name: "State Management (Redux Toolkit)", difficulty: "Intermediate", resources: [] },
          { name: "Native Modules (Camera, Location)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Performance Optimisation", difficulty: "Advanced", resources: [] },
          { name: "Publishing to Stores (App Store, Play)", difficulty: "Advanced", resources: [] },
          { name: "Offline Support (AsyncStorage)", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "Web Perf": {
    title: "Web Performance & SEO",
    description: "Make websites fast, accessible, and search‑engine friendly.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "Lighthouse Metrics (CLS, LCP, FID)", difficulty: "Beginner", resources: [] },
          { name: "Image Optimisation (lazy loading)", difficulty: "Beginner", resources: [] },
          { name: "Minification (CSS, JS)", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Code Splitting & Bundle Analysis", difficulty: "Intermediate", resources: [] },
          { name: "Caching Strategies (CDN, HTTP Cache)", difficulty: "Intermediate", resources: [] },
          { name: "SEO Meta Tags & Semantic HTML", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Critical CSS & Inlining", difficulty: "Advanced", resources: [] },
          { name: "Service Workers & PWA", difficulty: "Advanced", resources: [] },
          { name: "Advanced Core Web Vitals", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  },
  "AI/ML": {
    title: "AI/ML Integration (APIs)",
    description: "Add intelligence to apps using pre‑trained models and APIs.",
    sections: [
      {
        title: "Basics",
        priority: "🔥 Most Important",
        topics: [
          { name: "OpenAI API (ChatGPT, embeddings)", difficulty: "Beginner", resources: [] },
          { name: "Prompt Engineering Basics", difficulty: "Beginner", resources: [] },
          { name: "Hugging Face Models", difficulty: "Beginner", resources: [] }
        ]
      },
      {
        title: "Intermediate",
        priority: "📘 Intermediate",
        topics: [
          { name: "Image Generation (DALL‑E, Stable Diffusion)", difficulty: "Intermediate", resources: [] },
          { name: "Fine‑tuning vs Zero‑shot", difficulty: "Intermediate", resources: [] },
          { name: "RAG Pipelines (Retrieval Augmented)", difficulty: "Intermediate", resources: [] }
        ]
      },
      {
        title: "Advanced",
        priority: "🚀 Advanced",
        topics: [
          { name: "Model Deployment (Replicate, Modal)", difficulty: "Advanced", resources: [] },
          { name: "Vector Databases (Pinecone)", difficulty: "Advanced", resources: [] },
          { name: "LLM Evaluation Metrics", difficulty: "Advanced", resources: [] }
        ]
      }
    ]
  }
};