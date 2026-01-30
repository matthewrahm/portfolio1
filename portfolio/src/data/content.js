export const experience = [
  {
    company: "Solana",
    role: "Co-Founder & Lead Software Engineer",
    type: "Web3",
    date: "Aug 2025 – Present",
    location: "Remote",
    points: [
      "Led architecture and launch of revenue-generating Web3 products",
      "Built 75+ production websites for token launches",
      "Scaled products to multi-million-dollar market caps"
    ],
    tags: ["Solana", "React", "Node.js", "AWS"]
  },
  {
    company: "Connect Social",
    role: "Software Engineering Intern",
    date: "May 2025 – Aug 2025",
    location: "Atlanta, GA",
    points: [
      "Built and deployed iOS applications using Swift & Firebase",
      "Developed full-stack eCommerce sites with React & Node.js"
    ],
    tags: ["Swift", "React", "Node.js", "PostgreSQL"]
  },
  {
    company: "Meticular",
    role: "Software Engineering Intern",
    date: "Aug 2024 – Dec 2024",
    location: "Remote",
    points: [
      "Built scalable frontend components for production workflows",
      "Improved UI performance and shipped features cross-functionally"
    ],
    tags: ["React", "TypeScript"]
  },
  {
    company: "VIVBI",
    role: "Software Engineering Intern",
    date: "May 2024 – Aug 2024",
    location: "Remote",
    points: [
      "Developed frontend experiences and backend integrations",
      "Contributed to product cycles through feature implementation"
    ],
    tags: ["React", "Node.js"]
  }
];

export const projects = [
  {
    name: "Token Launch Platform",
    description: "Production-ready website builder enabling rapid Solana token launches with custom branding, real-time analytics, and automated deployment pipelines.",
    impact: "75+ sites deployed — multi-million dollar market caps generated",
    tags: ["React", "Node.js", "Solana Web3.js", "AWS"],
    category: "Web3",
    featured: true,
    highlights: [
      "Templated builder with live preview and one-click deploy",
      "Real-time analytics dashboard tracking on-chain activity",
      "Automated CI/CD pipeline via AWS with zero-downtime deploys"
    ],
  },
  {
    name: "Crypto Tracking Platform",
    description: "Real-time cryptocurrency tracking platform with optimized API data fetching, automated server management via PM2 and shell scripts, and a high-performance Vite build pipeline with NGINX reverse proxy.",
    impact: "Full CI/CD pipeline with automated failover recovery on AWS",
    tags: ["React", "Node.js", "Express", "WebSocket", "AWS", "Vite"],
    category: "Full Stack",
    highlights: [
      "WebSocket-driven live price feeds with sub-second updates",
      "PM2 process management with automated failover scripts",
      "NGINX reverse proxy with SSL and optimized caching"
    ],
  },
  {
    name: "Ramen Crypto Paper Trading Platform",
    description: "Full-featured paper trading simulator with $100K virtual balance, real-time Binance WebSocket price feeds, and professional TradingView-style charting. Includes technical indicators, DCA backtesting, market sentiment tracking, and a gamified progression system.",
    impact: "Live platform with real-time data across BTC, ETH, and SOL",
    tags: ["React", "Supabase", "Zustand", "Lightweight Charts", "WebSocket", "Binance API"],
    category: "Full Stack",
    featured: true,
    highlights: [
      "Paper trading engine with live portfolio P&L, position tracking, and what-if scenarios",
      "Real-time WebSocket price feeds with candlestick charts and RSI/MACD/Bollinger Band indicators",
      "DCA backtesting simulator and multi-asset percentage-normalized comparison charts",
      "Supabase auth with OAuth, gamified XP/streak system, and Fear & Greed sentiment dashboard"
    ],
  },
  {
    name: "Voice Journaling App",
    description: "iOS voice journaling app with AI-powered personalized daily prompts. Integrates OpenAI GPT to analyze user input contextually and generate tailored reflection questions.",
    impact: "Full-stack Swift + Firebase architecture with modular design",
    tags: ["Swift", "TypeScript", "Firebase", "GraphQL", "ChatGPT API"],
    category: "Mobile / AI",
    highlights: [
      "Speech-to-text transcription with contextual AI analysis",
      "GPT-powered prompt engine adapting to journal history",
      "Modular Swift architecture with Firebase real-time sync"
    ],
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "Swift"],
  frontend: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
  backend: ["Node.js", "Express", "Firebase", "GraphQL"],
  infrastructure: ["AWS", "Docker", "Linux", "PM2", "Git"],
  web3: ["Solana", "RPCs", "On-chain Data", "WebSockets"]
};

export const about = {
  bio: "Full-stack engineer passionate about building scalable products. Currently studying at BYU while working on Web3 projects. Based between GA and UT.",
  school: "BYU '27"
};

export const contact = {
  email: "matthewdrahm@gmail.com",
  location: "GA / UT",
  github: "https://github.com/matthewrahm",
  linkedin: "https://www.linkedin.com/in/matthew-rahm-4ab000348/"
};
