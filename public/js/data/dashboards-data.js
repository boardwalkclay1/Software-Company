export const DASHBOARD_TEMPLATES = [
  {
    id: "ops",
    name: "Operations Command Center",
    description: "Live KPIs, ticket flow, occupancy, and automation triggers.",
    stack: ["JS", "HTML", "CSS"],
    preview: "../assets/dashboards/ops.png"
  },
  {
    id: "analytics",
    name: "Analytics Hub",
    description: "Charts, funnels, retention, and product metrics.",
    stack: ["Charts.js", "Workers", "D1"],
    preview: "../assets/dashboards/analytics.png"
  },
  {
    id: "finance",
    name: "Finance Dashboard",
    description: "Cashflow, AR/AP, forecasting, and ledger summaries.",
    stack: ["JS", "Cloudflare", "SQL"],
    preview: "../assets/dashboards/finance.png"
  }
];
