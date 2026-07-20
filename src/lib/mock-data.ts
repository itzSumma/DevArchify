import type { Blueprint } from "@/components/BlueprintCard";

export interface ArchitectureComponent {
  name: string;
  description: string;
  items: string[];
}

export interface BlueprintDetail extends Blueprint {
  prompt: string;
  downloads: number;
  architecture: ArchitectureComponent[];
  relatedIds: string[];
}

export const blueprints: BlueprintDetail[] = [
  {
    id: "1",
    title: "E-Commerce Marketplace",
    description: "Full-stack marketplace platform with multi-vendor support, real-time inventory tracking, Stripe payment integration, and an admin dashboard for managing users, orders, and disputes.",
    category: "Web Apps",
    techStack: ["Next.js", "MongoDB", "Stripe"],
    author: "Alex Rivera",
    stars: 342,
    createdAt: "2 days ago",
    downloads: 1280,
    prompt: "Build a multi-vendor e-commerce marketplace where sellers can register, list products, and manage inventory. Buyers can browse, search, add to cart, and checkout via Stripe. Include an admin panel for user management, commission tracking, and dispute resolution.",
    architecture: [
      {
        name: "Frontend",
        description: "Next.js 14 App Router with server components, client-side interactivity, and ISR for product pages.",
        items: ["Next.js 14 + TypeScript", "Tailwind CSS + shadcn/ui", "TanStack Query for data fetching", "Stripe Checkout integration"],
      },
      {
        name: "Backend API",
        description: "Next.js API routes with tRPC for type-safe endpoints and middleware for auth and rate limiting.",
        items: ["tRPC routers for products, orders, users", "Better Auth for authentication", "Rate limiting with upstash", "File uploads via Uploadthing"],
      },
      {
        name: "Database",
        description: "MongoDB with Mongoose schemas for flexible product attributes and aggregation pipelines.",
        items: ["Users, Products, Orders collections", "Aggregation pipeline for search", "Indexes on product name and category", "Change streams for real-time inventory"],
      },
      {
        name: "Deployment",
        description: "Dockerized microservices deployed on Vercel and Railway with CI/CD via GitHub Actions.",
        items: ["Vercel for frontend", "Railway for API", "MongoDB Atlas", "GitHub Actions CI/CD"],
      },
    ],
    relatedIds: ["5", "10", "2"],
  },
  {
    id: "2",
    title: "AI Chat Dashboard",
    description: "Real-time chat application with AI-powered responses, user authentication, message history persistence, and WebSocket-based real-time communication.",
    category: "AI / ML",
    techStack: ["React", "Python", "WebSocket"],
    author: "Maya Chen",
    stars: 281,
    createdAt: "5 days ago",
    downloads: 950,
    prompt: "Create a real-time chat dashboard with AI assistant integration. Users can send messages, receive AI-generated replies, and view message history across sessions with WebSocket connectivity.",
    architecture: [
      {
        name: "Frontend",
        description: "React SPA with WebSocket client for real-time messaging and Optimistic UI updates.",
        items: ["React 18 + Vite", "Socket.IO client", "Zustand for state management", "React Markdown for AI responses"],
      },
      {
        name: "AI Service",
        description: "Python FastAPI microservice handling LLM inference with streaming responses and context management.",
        items: ["FastAPI + WebSocket endpoints", "LangChain for prompt chaining", "OpenAI / Claude API integration", "Conversation memory buffer"],
      },
      {
        name: "Database",
        description: "PostgreSQL with pgvector for semantic search across conversation history.",
        items: ["Messages, Users, Sessions tables", "pgvector for embedding search", "Full-text search on messages", "Row-level security policies"],
      },
      {
        name: "Infrastructure",
        description: "Docker Compose for local dev, deployed on Railway with Redis for message queuing.",
        items: ["Docker Compose setup", "Railway deployment", "Redis for message queue", "Cloudflare for DNS"],
      },
    ],
    relatedIds: ["12", "4", "7"],
  },
  {
    id: "3",
    title: "Cloud Cost Analyzer",
    description: "Multi-cloud cost tracking and optimization tool with real-time dashboards, budget alerts, and usage forecasting powered by cloud provider APIs.",
    category: "Cloud & DevOps",
    techStack: ["Go", "AWS", "React"],
    author: "David Kim",
    stars: 195,
    createdAt: "1 week ago",
    downloads: 720,
    prompt: "Build a cloud cost analyzer that fetches billing data from AWS, GCP, and Azure, normalizes it, and displays cost trends, forecasts, and optimization recommendations.",
    architecture: [
      {
        name: "Ingestion Layer",
        description: "Go services that poll cloud provider billing APIs on a schedule and normalize the data.",
        items: ["AWS Cost Explorer API client", "GCP Billing API client", "Azure Consumption API client", "Normalization pipeline in Go"],
      },
      {
        name: "API Server",
        description: "Go HTTP server with caching, aggregation endpoints, and WebSocket for live updates.",
        items: ["Gorilla Mux router", "Redis caching layer", "Aggregation queries", "WebSocket for real-time alerts"],
      },
      {
        name: "Frontend",
        description: "React dashboard with Recharts visualizations and interactive budget management.",
        items: ["React + Recharts", "Cost breakdown by service", "Budget alert configuration", "Export to CSV/PDF"],
      },
      {
        name: "Deployment",
        description: "Kubernetes cluster with Helm charts, monitoring via Prometheus and Grafana.",
        items: ["Kubernetes + Helm", "Prometheus metrics", "Grafana dashboards", "GitOps with ArgoCD"],
      },
    ],
    relatedIds: ["9", "7", "1"],
  },
  {
    id: "4",
    title: "Fitness Tracker App",
    description: "Cross-platform mobile fitness application with workout logging, progress tracking, social features, and wearable device integration.",
    category: "Mobile Apps",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    author: "Sarah Okafor",
    stars: 167,
    createdAt: "1 week ago",
    downloads: 1100,
    prompt: "Develop a cross-platform fitness tracker with workout logging, goal tracking, social challenges, and Apple Watch / Wear OS integration.",
    architecture: [
      {
        name: "Mobile App",
        description: "React Native with Expo for cross-platform development and native module access for sensors.",
        items: ["React Native + Expo", "HealthKit / Google Fit API", "Offline-first with SQLite", "Push notifications"],
      },
      {
        name: "Backend",
        description: "Node.js with Express and PostgreSQL for user data, workouts, and social features.",
        items: ["Express REST API", "PostgreSQL with PostGIS", "JWT authentication", "File uploads for progress photos"],
      },
      {
        name: "Real-time",
        description: "WebSocket server for live workout tracking, friend activities, and challenge updates.",
        items: ["Socket.IO server", "Live workout broadcasting", "Challenge leaderboards", "Activity feed"],
      },
    ],
    relatedIds: ["8", "11", "1"],
  },
  {
    id: "5",
    title: "SaaS Subscription Manager",
    description: "Complete billing and subscription management platform with tiered pricing, usage metering, invoicing, and customer portal.",
    category: "SaaS Platforms",
    techStack: ["Next.js", "Stripe", "MongoDB"],
    author: "James Hart",
    stars: 423,
    createdAt: "3 days ago",
    downloads: 2100,
    prompt: "Create a subscription management platform with Stripe Billing integration, usage-based pricing, automated invoicing, and a customer self-service portal.",
    architecture: [
      {
        name: "Customer Portal",
        description: "Next.js app with Stripe Customer Portal for plan management, invoices, and payment methods.",
        items: ["Next.js App Router", "Stripe Customer Portal", "Plan comparison page", "Usage dashboard"],
      },
      {
        name: "Billing Engine",
        description: "Node.js service handling subscription lifecycle, metered billing, and dunning.",
        items: ["Stripe Billing API", "Metered usage aggregation", "Invoice generation", "Dunning automation"],
      },
      {
        name: "Database",
        description: "MongoDB with transactions for billing operations and audit logging.",
        items: ["Subscriptions, Invoices collections", "Usage events capped collection", "Audit log", "Change data capture"],
      },
    ],
    relatedIds: ["1", "10", "3"],
  },
  {
    id: "6",
    title: "Security Audit Pipeline",
    description: "Automated security scanning pipeline with vulnerability detection, compliance reporting, and remediation tracking.",
    category: "Cybersecurity",
    techStack: ["Python", "Docker", "PostgreSQL"],
    author: "Priya Nair",
    stars: 156,
    createdAt: "2 weeks ago",
    downloads: 680,
    prompt: "Build a CI/CD-integrated security audit pipeline that scans dependencies, containers, and infrastructure-as-code for vulnerabilities and generates compliance reports.",
    architecture: [
      {
        name: "Scanner Engine",
        description: "Python-based orchestration layer managing multiple scanning tools and aggregating results.",
        items: ["Trivy for container scanning", "Snyk for dependency scanning", "Checkov for IaC scanning", "Result normalizer"],
      },
      {
        name: "API & Dashboard",
        description: "FastAPI backend with React dashboard for viewing scan results, trends, and compliance status.",
        items: ["FastAPI REST API", "React dashboard", "Vulnerability timeline", "Compliance framework mapping"],
      },
      {
        name: "Integration",
        description: "GitHub Actions plugin and webhook receiver for automated PR scanning.",
        items: ["GitHub Actions custom action", "Webhook receiver", "Slack notification integration", "Jira ticket creation"],
      },
    ],
    relatedIds: ["9", "3", "12"],
  },
  {
    id: "7",
    title: "Real-Time Data Pipeline",
    description: "Streaming data pipeline with Apache Kafka, real-time transformations, and dashboard visualizations for analytics teams.",
    category: "Data Pipelines",
    techStack: ["Python", "Kafka", "React"],
    author: "Tomás Silva",
    stars: 234,
    createdAt: "4 days ago",
    downloads: 890,
    prompt: "Design a real-time data pipeline that ingests events from multiple sources via Kafka, applies stream transformations, and feeds a live analytics dashboard.",
    architecture: [
      {
        name: "Ingestion",
        description: "Kafka cluster with multiple producers ingesting events from web, mobile, and server sources.",
        items: ["Apache Kafka cluster", "Kafka Connect sources", "Schema Registry with Avro", "Partitioning by event type"],
      },
      {
        name: "Stream Processing",
        description: "Python Kafka Streams application for real-time transformations, aggregations, and enrichment.",
        items: ["Faust streaming library", "Windowed aggregations", "Data enrichment pipeline", "Dead letter queue"],
      },
      {
        name: "Storage & Query",
        description: "ClickHouse for real-time analytics queries with materialized views and pre-aggregations.",
        items: ["ClickHouse database", "Materialized views", "Kafka to ClickHouse sink", "Retention policies"],
      },
      {
        name: "Visualization",
        description: "React dashboard with WebSocket connections for live-updating charts and alerts.",
        items: ["React + Realtime charts", "WebSocket subscriptions", "Alert configuration UI", "Export to CSV"],
      },
    ],
    relatedIds: ["12", "3", "2"],
  },
  {
    id: "8",
    title: "Component Library Starter",
    description: "Production-ready UI component library with Storybook, accessibility auditing, dark mode theming, and tree-shakeable exports.",
    category: "UI Libraries",
    techStack: ["React", "TypeScript", "Tailwind"],
    author: "Emma Watson",
    stars: 512,
    createdAt: "1 day ago",
    downloads: 3400,
    prompt: "Create a production-ready React component library with TypeScript, Tailwind CSS, Storybook documentation, accessibility compliance, and optimized tree-shaking.",
    architecture: [
      {
        name: "Package Structure",
        description: "Monorepo with Turborepo, pnpm workspaces, and separate packages for each component category.",
        items: ["Turborepo monorepo", "pnpm workspaces", "Rollup for bundling", "CSS extraction"],
      },
      {
        name: "Component System",
        description: "Radix UI primitives wrapped with Tailwind styling, supporting dark mode and RTL layouts.",
        items: ["Radix UI primitives", "Tailwind CSS + cva", "Dark mode with class strategy", "RTL layout support"],
      },
      {
        name: "Documentation",
        description: "Storybook with auto-generated docs, accessibility addon, and interactive playground.",
        items: ["Storybook 8", "Auto-docs from props", "A11y addon", "Interactive playground"],
      },
      {
        name: "Quality",
        description: "Automated testing, visual regression, and bundle size monitoring in CI.",
        items: ["Vitest + Testing Library", "Chromatic visual tests", "Bundle size tracking", "Changesets for versioning"],
      },
    ],
    relatedIds: ["4", "2", "1"],
  },
  {
    id: "9",
    title: "Microservice Orchestrator",
    description: "Service mesh orchestration platform with auto-scaling, circuit breaking, distributed tracing, and health monitoring.",
    category: "Cloud & DevOps",
    techStack: ["Go", "Docker", "Kubernetes"],
    author: "Raj Patel",
    stars: 189,
    createdAt: "6 days ago",
    downloads: 760,
    prompt: "Build a microservice orchestrator with service mesh capabilities, auto-scaling based on custom metrics, circuit breaker patterns, and distributed tracing.",
    architecture: [
      {
        name: "Control Plane",
        description: "Go-based control plane managing service discovery, configuration, and health checks across the mesh.",
        items: ["Service registry", "Health check coordinator", "Configuration distribution", "Certificate management"],
      },
      {
        name: "Data Plane",
        description: "Sidecar proxy handling traffic routing, load balancing, and telemetry collection.",
        items: ["Envoy sidecar proxy", "Traffic routing rules", "Load balancing strategies", "Metrics export"],
      },
      {
        name: "Observability",
        description: "Distributed tracing with OpenTelemetry, metrics with Prometheus, and centralized logging.",
        items: ["OpenTelemetry collector", "Prometheus + Grafana", "Jaeger for tracing", "Loki for logging"],
      },
    ],
    relatedIds: ["3", "6", "7"],
  },
  {
    id: "10",
    title: "Social Media Scheduler",
    description: "Multi-platform content scheduling app with AI caption generation, analytics, team collaboration, and auto-posting.",
    category: "SaaS Platforms",
    techStack: ["Next.js", "PostgreSQL", "Redis"],
    author: "Lena Schmidt",
    stars: 278,
    createdAt: "3 days ago",
    downloads: 1350,
    prompt: "Develop a social media scheduling platform that supports Instagram, Twitter, LinkedIn, and TikTok with AI-generated captions, analytics, and team workflows.",
    architecture: [
      {
        name: "Platform",
        description: "Next.js with PostgreSQL for relational data and Redis for caching and job queues.",
        items: ["Next.js App Router", "PostgreSQL + Prisma", "Redis for caching", "BullMQ for job queues"],
      },
      {
        name: "Content Engine",
        description: "Node.js service handling content creation, media processing, and scheduled publishing.",
        items: ["Media upload and processing", "Scheduled publishing queue", "AI caption generation", "Content calendar"],
      },
      {
        name: "Social Integrations",
        description: "OAuth-based connections to social platforms with rate limit handling and webhook receivers.",
        items: ["Instagram Graph API", "Twitter API v2", "LinkedIn Marketing API", "TikTok Business API"],
      },
    ],
    relatedIds: ["5", "1", "8"],
  },
  {
    id: "11",
    title: "Medical Records System",
    description: "HIPAA-compliant electronic health records system with patient portals, appointment scheduling, and e-prescriptions.",
    category: "Web Apps",
    techStack: ["React", "Node.js", "MongoDB"],
    author: "Dr. Karen Lee",
    stars: 145,
    createdAt: "1 week ago",
    downloads: 590,
    prompt: "Build a HIPAA-compliant EHR system with patient records, appointment management, e-prescriptions, billing, and a patient self-service portal.",
    architecture: [
      {
        name: "Patient Portal",
        description: "React SPA with secure authentication, appointment booking, and medical record viewing.",
        items: ["React + React Router", "OAuth 2.0 + MFA", "Appointment booking calendar", "Record viewer"],
      },
      {
        name: "Clinical API",
        description: "Node.js with FHIR-compliant endpoints for patient data, appointments, and prescriptions.",
        items: ["FHIR R4 API standard", "Express.js middleware", "HL7 message parsing", "Audit logging"],
      },
      {
        name: "Compliance",
        description: "Encryption at rest and in transit, access controls, audit trails, and BAA agreements.",
        items: ["AES-256 encryption", "Role-based access control", "Full audit trail", "BAA-compliant hosting"],
      },
    ],
    relatedIds: ["1", "4", "6"],
  },
  {
    id: "12",
    title: "ML Model Registry",
    description: "Machine learning model versioning, deployment, and monitoring platform with A/B testing and drift detection.",
    category: "AI / ML",
    techStack: ["Python", "Docker", "FastAPI"],
    author: "Yuki Tanaka",
    stars: 367,
    createdAt: "2 days ago",
    downloads: 1650,
    prompt: "Create an ML model registry that tracks model versions, manages deployments to staging and production, monitors performance drift, and supports A/B testing.",
    architecture: [
      {
        name: "Registry API",
        description: "FastAPI server managing model metadata, versioning, and artifact storage.",
        items: ["FastAPI + SQLAlchemy", "Model versioning system", "S3 artifact storage", "Metadata search"],
      },
      {
        name: "Deployment Engine",
        description: "Docker-based deployment manager that orchestrates model serving containers across environments.",
        items: ["Docker container orchestration", "Canary deployment support", "A/B testing router", "Auto-scaling"],
      },
      {
        name: "Monitoring",
        description: "Real-time model performance monitoring with drift detection, alerting, and retraining triggers.",
        items: ["Prediction logging", "Drift detection algorithms", "Performance dashboards", "Retraining pipeline trigger"],
      },
      {
        name: "CI/CD",
        description: "ML pipeline with automated training, evaluation, and promotion through staging environments.",
        items: ["DVC for data versioning", "MLflow tracking", "Automated evaluation gates", "Promotion workflows"],
      },
    ],
    relatedIds: ["2", "7", "6"],
  },
];

export function getBlueprintById(id: string): BlueprintDetail | undefined {
  return blueprints.find((b) => b.id === id);
}

export function getRelatedBlueprints(ids: string[]): BlueprintDetail[] {
  return blueprints.filter((b) => ids.includes(b.id));
}
