import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Plus, Filter, MoreHorizontal, ChevronRight, ChevronDown,
  TrendingUp, TrendingDown, Calendar, Phone, Mail, Building2,
  User, DollarSign, Target, Zap, Clock, ArrowUpRight, X,
  Settings, Bell, Command, Inbox, Layers, BarChart3,
  CalendarDays, Package, Activity, Users, Briefcase, Tag,
  Circle, CheckCircle2, AlertCircle, ChevronLeft, FileText,
  MessageSquare, Edit3, Trash2, ArrowRight, Sparkles, Hash,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, ResponsiveContainer, Tooltip as ReTooltip,
  PieChart, Pie, Cell,
} from "recharts";

// ============================================================
// MOCK DATA
// ============================================================

const USERS = [
  { id: "u1", name: "Maria Constantin", initials: "MC", color: "bg-amber-500/20 text-amber-300 ring-amber-500/30" },
  { id: "u2", name: "Andrei Pop", initials: "AP", color: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30" },
  { id: "u3", name: "Elena Vasilescu", initials: "EV", color: "bg-sky-500/20 text-sky-300 ring-sky-500/30" },
  { id: "u4", name: "Răzvan Ionescu", initials: "RI", color: "bg-rose-500/20 text-rose-300 ring-rose-500/30" },
  { id: "u5", name: "Diana Stoica", initials: "DS", color: "bg-violet-500/20 text-violet-300 ring-violet-500/30" },
];

const STAGES = [
  { id: "new", label: "New", accent: "bg-zinc-500" },
  { id: "contacted", label: "Contacted", accent: "bg-sky-500" },
  { id: "qualified", label: "Qualified", accent: "bg-violet-500" },
  { id: "proposal", label: "Proposal", accent: "bg-amber-500" },
  { id: "negotiation", label: "Negotiation", accent: "bg-orange-500" },
  { id: "won", label: "Won", accent: "bg-emerald-500" },
  { id: "lost", label: "Lost", accent: "bg-rose-500/60" },
];

const LEADS_SEED = [
  { id: "l1", company: "Northwind Labs", contact: "Sara Mitchell", email: "sara@northwind.io", phone: "+1 415 555 0142", source: "Referral", stage: "negotiation", priority: "high", value: 48000, score: 92, owner: "u1", tags: ["enterprise", "saas", "warm"], nextAction: "Send revised SOW", nextActionDate: "Tomorrow", company_size: "120-500", lastTouch: "2h ago" },
  { id: "l2", company: "Helix Studio", contact: "Marcus Webb", email: "m@helixstudio.co", phone: "+44 20 7946 0028", source: "Organic", stage: "proposal", priority: "high", value: 32000, score: 84, owner: "u2", tags: ["agency", "warm"], nextAction: "Pricing call", nextActionDate: "Mar 14", company_size: "20-50", lastTouch: "yesterday" },
  { id: "l3", company: "Borealis Tech", contact: "Anna Lindqvist", email: "anna@borealis.se", phone: "+46 8 555 0199", source: "Outbound", stage: "qualified", priority: "medium", value: 24500, score: 71, owner: "u1", tags: ["fintech"], nextAction: "Demo prep", nextActionDate: "Mar 16", company_size: "50-120", lastTouch: "3d ago" },
  { id: "l4", company: "Meridian & Co", contact: "James Okafor", email: "james@meridian.co", phone: "+1 312 555 0188", source: "Paid Ads", stage: "contacted", priority: "medium", value: 18000, score: 58, owner: "u3", tags: ["smb"], nextAction: "Follow up email", nextActionDate: "Mar 13", company_size: "10-20", lastTouch: "5d ago" },
  { id: "l5", company: "Quantum Foundry", contact: "Liu Wei", email: "wei@quantumfoundry.com", phone: "+1 408 555 0173", source: "Event", stage: "qualified", priority: "high", value: 56000, score: 88, owner: "u2", tags: ["enterprise", "expansion"], nextAction: "Stakeholder mapping", nextActionDate: "Mar 15", company_size: "500+", lastTouch: "1d ago" },
  { id: "l6", company: "Saffron Digital", contact: "Priya Raman", email: "priya@saffron.digital", phone: "+44 161 555 0117", source: "Referral", stage: "new", priority: "medium", value: 14000, score: 54, owner: "u3", tags: ["agency", "smb"], nextAction: "Discovery call", nextActionDate: "Mar 14", company_size: "5-10", lastTouch: "today" },
  { id: "l7", company: "Apex Consulting", contact: "Rachel Goldberg", email: "rachel@apex.consulting", phone: "+1 646 555 0144", source: "Organic", stage: "proposal", priority: "high", value: 42000, score: 81, owner: "u4", tags: ["enterprise", "warm"], nextAction: "Legal review", nextActionDate: "Mar 17", company_size: "120-500", lastTouch: "4h ago" },
  { id: "l8", company: "Drift & Echo", contact: "Tomás García", email: "tomas@driftecho.es", phone: "+34 91 555 0166", source: "Outbound", stage: "contacted", priority: "low", value: 9500, score: 41, owner: "u5", tags: ["smb", "cold"], nextAction: "Re-engage email", nextActionDate: "Mar 18", company_size: "10-20", lastTouch: "1w ago" },
  { id: "l9", company: "Polaris Health", contact: "Dr. Naomi Chen", email: "naomi@polaris.health", phone: "+1 617 555 0190", source: "Partner", stage: "negotiation", priority: "high", value: 67000, score: 94, owner: "u1", tags: ["enterprise", "warm"], nextAction: "Final terms call", nextActionDate: "Today", company_size: "500+", lastTouch: "1h ago" },
  { id: "l10", company: "Verdant Markets", contact: "Felix Brun", email: "felix@verdant.market", phone: "+33 1 55 55 0133", source: "Organic", stage: "qualified", priority: "medium", value: 21000, score: 67, owner: "u2", tags: ["ecommerce"], nextAction: "Send case study", nextActionDate: "Mar 14", company_size: "20-50", lastTouch: "2d ago" },
  { id: "l11", company: "Kestrel Logistics", contact: "Owen Davies", email: "owen@kestrel.co.uk", phone: "+44 113 555 0122", source: "Referral", stage: "won", priority: "high", value: 89000, score: 96, owner: "u4", tags: ["enterprise"], nextAction: "Kickoff scheduled", nextActionDate: "Mar 20", company_size: "500+", lastTouch: "today" },
  { id: "l12", company: "Cinder Coffee Co", contact: "Maya Bauer", email: "maya@cindercoffee.com", phone: "+1 503 555 0155", source: "Event", stage: "new", priority: "low", value: 6800, score: 38, owner: "u5", tags: ["smb", "cold"], nextAction: "First reachout", nextActionDate: "Mar 14", company_size: "5-10", lastTouch: "today" },
  { id: "l13", company: "Lattice Robotics", contact: "Hiro Tanaka", email: "hiro@lattice.ai", phone: "+81 3 5555 0177", source: "Outbound", stage: "contacted", priority: "high", value: 51000, score: 78, owner: "u3", tags: ["enterprise", "saas"], nextAction: "Tech deep dive", nextActionDate: "Mar 19", company_size: "120-500", lastTouch: "6h ago" },
  { id: "l14", company: "Mosaic Wellness", contact: "Aisha Patel", email: "aisha@mosaic.health", phone: "+1 213 555 0111", source: "Paid Ads", stage: "lost", priority: "low", value: 12000, score: 28, owner: "u2", tags: ["smb"], nextAction: "—", nextActionDate: "—", company_size: "10-20", lastTouch: "2w ago" },
  { id: "l15", company: "Solstice Records", contact: "Jonas Reidel", email: "jonas@solstice.fm", phone: "+49 30 5555 0188", source: "Referral", stage: "proposal", priority: "medium", value: 27500, score: 73, owner: "u1", tags: ["smb", "warm"], nextAction: "Contract review", nextActionDate: "Mar 15", company_size: "20-50", lastTouch: "yesterday" },
  { id: "l16", company: "Granite Build", contact: "Carlos Mendez", email: "carlos@granite.build", phone: "+1 720 555 0144", source: "Organic", stage: "qualified", priority: "medium", value: 34000, score: 69, owner: "u4", tags: ["smb"], nextAction: "Proposal draft", nextActionDate: "Mar 16", company_size: "50-120", lastTouch: "3d ago" },
  { id: "l17", company: "Tide & Co", contact: "Beatrice Howell", email: "bea@tideandco.com", phone: "+1 858 555 0123", source: "Outbound", stage: "won", priority: "high", value: 44000, score: 91, owner: "u3", tags: ["agency", "warm"], nextAction: "Onboarding", nextActionDate: "Mar 22", company_size: "20-50", lastTouch: "today" },
  { id: "l18", company: "Volta Energy", contact: "Sven Bergström", email: "sven@volta.energy", phone: "+46 8 555 0166", source: "Partner", stage: "new", priority: "high", value: 73000, score: 76, owner: "u1", tags: ["enterprise", "inbound"], nextAction: "Qualification", nextActionDate: "Tomorrow", company_size: "500+", lastTouch: "today" },
];

const ACTIVITY_VERBS = {
  "stage.move": "moved",
  "note.add": "added a note to",
  "call.book": "scheduled a call with",
  "quote.send": "sent a quote to",
  "lead.create": "created",
  "lead.win": "marked as won:",
  "email.send": "emailed",
};

const REVENUE_TREND = Array.from({ length: 12 }, (_, i) => {
  const base = 28000 + i * 1800;
  const noise = Math.sin(i * 1.3) * 6000 + (i === 8 ? 12000 : 0);
  return {
    week: `W${i + 1}`,
    booked: Math.round(base + noise),
    forecast: Math.round((base + noise) * 1.15),
  };
});

const FUNNEL_DATA = [
  { stage: "New", count: 142, value: 142 },
  { stage: "Contacted", count: 98, value: 98 },
  { stage: "Qualified", count: 64, value: 64 },
  { stage: "Proposal", count: 31, value: 31 },
  { stage: "Negotiation", count: 18, value: 18 },
  { stage: "Won", count: 11, value: 11 },
];

const SOURCE_BREAKDOWN = [
  { name: "Referral", value: 38, color: "#f59e0b" },
  { name: "Organic", value: 24, color: "#10b981" },
  { name: "Outbound", value: 18, color: "#8b5cf6" },
  { name: "Paid Ads", value: 12, color: "#0ea5e9" },
  { name: "Event", value: 5, color: "#ef4444" },
  { name: "Partner", value: 3, color: "#a78bfa" },
];

// ============================================================
// UTILITIES
// ============================================================

const fmt = (n) => `$${n.toLocaleString("en-US")}`;
const fmtCompact = (n) => n >= 1000 ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `$${n}`;
const userById = (id) => USERS.find(u => u.id === id);
const stageById = (id) => STAGES.find(s => s.id === id);

// ============================================================
// PRIMITIVES
// ============================================================

const Avatar = ({ user, size = "sm" }) => {
  if (!user) return null;
  const sizes = { xs: "h-5 w-5 text-[9px]", sm: "h-6 w-6 text-[10px]", md: "h-8 w-8 text-xs", lg: "h-10 w-10 text-sm" };
  return (
    <div className={`${sizes[size]} ${user.color} ring-1 rounded-full flex items-center justify-center font-medium tracking-wide font-mono`}>
      {user.initials}
    </div>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-zinc-800/80 text-zinc-300 ring-zinc-700",
    high: "bg-rose-500/10 text-rose-300 ring-rose-500/30",
    medium: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    low: "bg-zinc-500/10 text-zinc-400 ring-zinc-600/30",
    success: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    info: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
    ghost: "bg-transparent text-zinc-400 ring-zinc-700/60",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ring-1 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", size = "md", icon: Icon, onClick, className = "" }) => {
  const variants = {
    primary: "bg-amber-400 text-zinc-950 hover:bg-amber-300 ring-1 ring-amber-500/50 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_-1px_0_0_rgba(0,0,0,0.2)_inset]",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 ring-1 ring-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60",
    outline: "bg-transparent text-zinc-300 hover:bg-zinc-800/40 ring-1 ring-zinc-700",
  };
  const sizes = {
    sm: "h-7 px-2.5 text-xs gap-1.5",
    md: "h-8 px-3 text-[13px] gap-2",
    lg: "h-10 px-4 text-sm gap-2",
  };
  return (
    <button onClick={onClick} className={`${variants[variant]} ${sizes[size]} font-medium rounded-md inline-flex items-center transition-all duration-150 active:scale-[0.98] ${className}`}>
      {Icon && <Icon className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.25} />}
      {children}
    </button>
  );
};

const ScoreRing = ({ score, size = 28 }) => {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : score >= 40 ? "#f97316" : "#71717a";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgb(39 39 42)" strokeWidth="2" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth="2" fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      <span className="text-[10px] font-mono font-medium text-zinc-200 tabular-nums">{score}</span>
    </div>
  );
};

// ============================================================
// SIDEBAR
// ============================================================

const Sidebar = ({ active, onNavigate }) => {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pipeline", label: "Pipeline", icon: Layers, badge: "18" },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "projects", label: "Projects", icon: Briefcase, badge: "8" },
    { id: "catalog", label: "Catalog", icon: Package },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "activity", label: "Activity", icon: Activity },
  ];
  const secondary = [
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-[220px] shrink-0 border-r border-zinc-800/80 bg-zinc-950 flex flex-col">
      <div className="h-14 px-4 flex items-center gap-2.5 border-b border-zinc-800/80">
        <div className="h-7 w-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(245,158,11,0.5)]">
          <div className="h-2.5 w-2.5 rounded-sm bg-zinc-950" />
        </div>
        <div>
          <div className="text-[13px] font-semibold tracking-tight text-zinc-100 font-display">ClientOps</div>
          <div className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Suite · v2.4</div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-2">
        <button className="w-full px-2.5 h-9 rounded-md bg-zinc-900/60 ring-1 ring-zinc-800 hover:ring-zinc-700 flex items-center justify-between group transition">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-violet-500/20 ring-1 ring-violet-500/40 flex items-center justify-center text-[10px] font-mono font-semibold text-violet-300">A</div>
            <span className="text-xs font-medium text-zinc-200">Atlas Studio</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300" />
        </button>
      </div>

      <nav className="px-2 pt-1 flex-1 overflow-auto">
        <div className="mb-3">
          {items.map(item => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)}
                className={`w-full h-8 px-2 rounded-md flex items-center gap-2.5 text-[13px] mb-0.5 transition-all relative group
                  ${isActive ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"}`}>
                {isActive && <div className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-amber-400 rounded-r" />}
                <item.icon className="h-4 w-4" strokeWidth={2} />
                <span className="font-medium tracking-tight">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[10px] font-mono text-zinc-500 group-hover:text-zinc-400 tabular-nums">{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-2 mb-1.5 text-[9px] uppercase tracking-[0.15em] font-semibold text-zinc-600">System</div>
        {secondary.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className={`w-full h-8 px-2 rounded-md flex items-center gap-2.5 text-[13px] mb-0.5 transition-all
              ${active === item.id ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"}`}>
            <item.icon className="h-4 w-4" strokeWidth={2} />
            <span className="font-medium tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-zinc-800/80 p-3">
        <div className="flex items-center gap-2.5 p-1.5 rounded-md hover:bg-zinc-900/60 cursor-pointer transition">
          <Avatar user={USERS[0]} size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-zinc-100 truncate">Maria Constantin</div>
            <div className="text-[10px] text-zinc-500 truncate">Account Director</div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        </div>
      </div>
    </aside>
  );
};

// ============================================================
// TOPBAR
// ============================================================

const Topbar = ({ title, breadcrumb, onCmdK }) => (
  <header className="h-14 shrink-0 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur px-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {breadcrumb ? (
        <div className="flex items-center gap-2 text-[13px]">
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />}
              <span className={i === breadcrumb.length - 1 ? "text-zinc-100 font-medium" : "text-zinc-500 hover:text-zinc-300 cursor-pointer"}>
                {b}
              </span>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <h1 className="text-[15px] font-semibold tracking-tight text-zinc-100 font-display">{title}</h1>
      )}
    </div>

    <div className="flex items-center gap-2">
      <button onClick={onCmdK} className="h-8 px-2.5 rounded-md bg-zinc-900/60 ring-1 ring-zinc-800 hover:ring-zinc-700 hover:bg-zinc-900 flex items-center gap-2 text-[12px] text-zinc-500 transition group">
        <Search className="h-3.5 w-3.5" />
        <span className="text-zinc-400 hidden sm:inline">Search anything</span>
        <kbd className="hidden sm:flex items-center gap-0.5 ml-2 px-1.5 py-0.5 rounded bg-zinc-800 ring-1 ring-zinc-700/80 text-[9px] font-mono text-zinc-400">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>
      <button className="h-8 w-8 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 flex items-center justify-center relative transition">
        <Bell className="h-4 w-4" />
        <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 ring-2 ring-zinc-950" />
      </button>
      <div className="h-5 w-px bg-zinc-800 mx-1" />
      <Button size="sm" variant="primary" icon={Plus}>New lead</Button>
    </div>
  </header>
);

// ============================================================
// DASHBOARD
// ============================================================

const KPICard = ({ label, value, delta, deltaPositive, sparkData, accent = "amber" }) => {
  const accentColors = {
    amber: "stroke-amber-400",
    emerald: "stroke-emerald-400",
    sky: "stroke-sky-400",
    violet: "stroke-violet-400",
  };
  return (
    <div className="bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-4 hover:ring-zinc-700 transition group relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-zinc-800/0 group-hover:bg-zinc-800/30 transition-all blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500">{label}</div>
          <MoreHorizontal className="h-3.5 w-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition" />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[26px] font-semibold tracking-tight text-zinc-50 tabular-nums leading-none mb-1.5 font-display">
              {value}
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-medium ${deltaPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {deltaPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span className="tabular-nums">{delta}</span>
              <span className="text-zinc-500 font-normal">vs last period</span>
            </div>
          </div>
          <div className="h-10 w-20 -mb-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line type="monotone" dataKey="v" strokeWidth={1.5} className={accentColors[accent]} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onOpenLead }) => {
  const sparkA = Array.from({ length: 12 }, (_, i) => ({ v: 20 + Math.sin(i * 0.7) * 5 + i * 1.2 }));
  const sparkB = Array.from({ length: 12 }, (_, i) => ({ v: 15 + Math.cos(i * 0.9) * 4 + i * 0.8 }));
  const sparkC = Array.from({ length: 12 }, (_, i) => ({ v: 30 + Math.sin(i * 1.1) * 8 + i * 0.5 }));
  const sparkD = Array.from({ length: 12 }, (_, i) => ({ v: 10 + i * 1.5 + Math.sin(i) * 3 }));

  const upcomingLeads = LEADS_SEED.filter(l => ["Today", "Tomorrow"].includes(l.nextActionDate)).slice(0, 4);
  const atRiskLeads = LEADS_SEED.filter(l => l.priority === "high" && ["proposal", "negotiation"].includes(l.stage)).slice(0, 3);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between mb-6 pb-4 border-b border-zinc-800/60">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400/80 mb-2">// Overview</div>
          <h2 className="text-[28px] font-semibold tracking-tight text-zinc-50 leading-tight italic font-display">
            Good morning, Maria.
          </h2>
          <p className="text-[13px] text-zinc-400 mt-1">You have <span className="text-amber-300 font-medium">3 high-priority actions</span> and 5 deals awaiting response.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Filter}>Last 30 days</Button>
          <Button variant="secondary" size="sm">Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KPICard label="Pipeline value" value="$612k" delta="+18.4%" deltaPositive sparkData={sparkA} accent="amber" />
        <KPICard label="Active leads" value="142" delta="+12" deltaPositive sparkData={sparkB} accent="emerald" />
        <KPICard label="Win rate" value="34.2%" delta="+2.8 pts" deltaPositive sparkData={sparkC} accent="sky" />
        <KPICard label="Avg deal size" value="$28.4k" delta="-3.1%" deltaPositive={false} sparkData={sparkD} accent="violet" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="col-span-2 bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-1">Revenue trend</div>
              <div className="text-[15px] font-medium text-zinc-100 font-display">Booked vs forecast</div>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm bg-amber-400" />
                <span className="text-zinc-400">Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm bg-zinc-600" />
                <span className="text-zinc-400">Forecast</span>
              </div>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="bookedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
                <ReTooltip
                  contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "6px", fontSize: "12px" }}
                  labelStyle={{ color: "#a1a1aa" }}
                  formatter={v => fmt(v)}
                />
                <Area type="monotone" dataKey="forecast" stroke="#52525b" strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
                <Area type="monotone" dataKey="booked" stroke="#f59e0b" strokeWidth={2} fill="url(#bookedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-5">
          <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-1">Lead sources</div>
          <div className="text-[15px] font-medium text-zinc-100 mb-4 font-display">Distribution</div>
          <div className="h-[140px] -mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SOURCE_BREAKDOWN} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={2}>
                  {SOURCE_BREAKDOWN.map((s, i) => <Cell key={i} fill={s.color} stroke="none" />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {SOURCE_BREAKDOWN.slice(0, 4).map(s => (
              <div key={s.name} className="flex items-center gap-2 text-[11px]">
                <div className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                <span className="text-zinc-300 flex-1">{s.name}</span>
                <span className="text-zinc-500 tabular-nums font-mono">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-5">
          <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-1">Funnel</div>
          <div className="text-[15px] font-medium text-zinc-100 mb-4 font-display">Conversion path</div>
          <div className="space-y-2">
            {FUNNEL_DATA.map((f, i) => {
              const max = FUNNEL_DATA[0].count;
              const w = (f.count / max) * 100;
              const conv = i > 0 ? Math.round((f.count / FUNNEL_DATA[i - 1].count) * 100) : null;
              return (
                <div key={f.stage}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-zinc-300 font-medium">{f.stage}</span>
                    <div className="flex items-center gap-2">
                      {conv !== null && <span className="text-zinc-500 tabular-nums font-mono text-[10px]">{conv}%</span>}
                      <span className="text-zinc-100 tabular-nums font-mono font-medium">{f.count}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-zinc-800/60 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${w}%`, background: i === 5 ? "#10b981" : `linear-gradient(90deg, #f59e0b, #f59e0b${Math.round((1 - i / 6) * 200).toString(16)})` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-1 bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-1">Today's actions</div>
              <div className="text-[15px] font-medium text-zinc-100 font-display">Up next</div>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tabular-nums">{upcomingLeads.length}</span>
          </div>
          <div className="space-y-1">
            {upcomingLeads.map(lead => {
              const owner = userById(lead.owner);
              return (
                <button key={lead.id} onClick={() => onOpenLead(lead)}
                  className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/40 transition group text-left">
                  <div className="h-8 w-8 rounded-md bg-zinc-800/60 ring-1 ring-zinc-700/60 flex items-center justify-center shrink-0">
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-zinc-100 truncate">{lead.company}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{lead.nextAction}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-amber-400 font-medium">{lead.nextActionDate}</div>
                    <div className="text-[9px] text-zinc-600">{owner?.name.split(" ")[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-1 bg-zinc-900/40 ring-1 ring-zinc-800/80 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-rose-400/80 mb-1">⚡ High priority</div>
              <div className="text-[15px] font-medium text-zinc-100 font-display">Watch closely</div>
            </div>
          </div>
          <div className="space-y-1.5">
            {atRiskLeads.map(lead => (
              <button key={lead.id} onClick={() => onOpenLead(lead)}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/40 transition group text-left">
                <ScoreRing score={lead.score} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-zinc-100 truncate">{lead.company}</div>
                  <div className="text-[10px] text-zinc-500 truncate flex items-center gap-1">
                    <span className="capitalize">{stageById(lead.stage)?.label}</span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-zinc-400 tabular-nums">{fmtCompact(lead.value)}</span>
                  </div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300 transition" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PIPELINE
// ============================================================

const LeadCard = ({ lead, onClick, onDragStart }) => {
  const owner = userById(lead.owner);
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-zinc-900/80 ring-1 ring-zinc-800 hover:ring-zinc-700 rounded-md p-3 cursor-pointer group transition-all hover:translate-y-[-1px] hover:shadow-lg hover:shadow-zinc-950/50">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-semibold text-zinc-100 tracking-tight truncate">{lead.company}</div>
          <div className="text-[10px] text-zinc-500 truncate">{lead.contact}</div>
        </div>
        <ScoreRing score={lead.score} size={28} />
      </div>

      <div className="flex items-center gap-2 mb-2.5">
        <div className="text-[16px] font-semibold tabular-nums text-amber-300 font-display">
          {fmtCompact(lead.value)}
        </div>
        {lead.priority === "high" && (
          <Badge variant="high"><Zap className="h-2.5 w-2.5" />Hot</Badge>
        )}
      </div>

      <div className="flex items-center gap-1 mb-2.5 overflow-hidden">
        {lead.tags.slice(0, 2).map(t => (
          <span key={t} className="text-[9px] uppercase tracking-wider font-medium text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <Clock className="h-3 w-3 text-zinc-600 shrink-0" />
          <span className="text-[10px] text-zinc-500 truncate">{lead.nextActionDate}</span>
        </div>
        <Avatar user={owner} size="xs" />
      </div>
    </div>
  );
};

const PipelineColumn = ({ stage, leads, onLeadClick, onDragStart, onDragOver, onDrop, dragOver }) => {
  const total = leads.reduce((sum, l) => sum + l.value, 0);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOver(stage.id); }}
      onDrop={() => onDrop(stage.id)}
      className={`w-[280px] shrink-0 rounded-lg flex flex-col transition-all
        ${dragOver ? "bg-amber-400/5 ring-1 ring-amber-400/30" : "bg-zinc-900/30"}`}>
      <div className="px-3 pt-3 pb-2 sticky top-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${stage.accent}`} />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">{stage.label}</span>
            <span className="text-[10px] font-mono text-zinc-500 tabular-nums">{leads.length}</span>
          </div>
          <button className="text-zinc-600 hover:text-zinc-300 transition">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono tabular-nums">{fmtCompact(total)} · pipeline</div>
      </div>

      <div className="flex-1 px-2 pb-2 space-y-2 overflow-y-auto">
        {leads.length === 0 ? (
          <div className="text-center py-8 text-[10px] text-zinc-600 italic">No leads</div>
        ) : (
          leads.map(lead => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick(lead)}
              onDragStart={(e) => onDragStart(e, lead)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Pipeline = ({ leads, setLeads, onOpenLead }) => {
  const [draggedLead, setDraggedLead] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);
  const [filterOwner, setFilterOwner] = useState(null);
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(l => {
    if (filterOwner && l.owner !== filterOwner) return false;
    if (search && !l.company.toLowerCase().includes(search.toLowerCase()) && !l.contact.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (stageId) => {
    if (draggedLead && draggedLead.stage !== stageId) {
      setLeads(prev => prev.map(l => l.id === draggedLead.id ? { ...l, stage: stageId } : l));
    }
    setDraggedLead(null);
    setDragOverStage(null);
  };

  const totalPipeline = filteredLeads.filter(l => !["won", "lost"].includes(l.stage)).reduce((s, l) => s + l.value, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-4 border-b border-zinc-800/60">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400/80 mb-2">// Sales pipeline</div>
            <h2 className="text-[24px] font-semibold tracking-tight text-zinc-50 leading-tight font-display">
              Active deals
            </h2>
            <div className="text-[12px] text-zinc-400 mt-1 flex items-center gap-3">
              <span><span className="text-zinc-200 font-medium tabular-nums">{filteredLeads.length}</span> leads</span>
              <span className="text-zinc-700">·</span>
              <span><span className="text-amber-300 font-medium tabular-nums">{fmtCompact(totalPipeline)}</span> in pipeline</span>
              <span className="text-zinc-700">·</span>
              <span className="flex items-center gap-1"><span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" /> Live updates</span>
            </div>
          </div>
          <Button variant="primary" size="md" icon={Plus}>Add lead</Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads, contacts..."
              className="h-8 pl-8 pr-3 w-[260px] rounded-md bg-zinc-900/60 ring-1 ring-zinc-800 hover:ring-zinc-700 focus:ring-amber-500/40 focus:bg-zinc-900 text-[12px] text-zinc-100 placeholder:text-zinc-500 outline-none transition" />
          </div>

          <div className="h-5 w-px bg-zinc-800" />

          <div className="flex items-center gap-1">
            <span className="text-[11px] text-zinc-500 mr-1">Owner</span>
            <button onClick={() => setFilterOwner(null)}
              className={`h-7 w-7 rounded-md ring-1 transition flex items-center justify-center text-[10px] font-medium
                ${!filterOwner ? "bg-zinc-800 ring-zinc-700 text-zinc-200" : "bg-transparent ring-zinc-800 text-zinc-500 hover:text-zinc-300"}`}>
              All
            </button>
            {USERS.map(u => (
              <button key={u.id} onClick={() => setFilterOwner(u.id === filterOwner ? null : u.id)}
                className={`transition ${filterOwner === u.id ? "ring-2 ring-amber-400 rounded-full" : "opacity-60 hover:opacity-100"}`}>
                <Avatar user={u} size="sm" />
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="ghost" icon={Filter}>More filters</Button>
            <div className="flex bg-zinc-900/60 ring-1 ring-zinc-800 rounded-md p-0.5">
              <button className="h-6 px-2 rounded text-[11px] bg-zinc-800 text-zinc-100 font-medium">Board</button>
              <button className="h-6 px-2 rounded text-[11px] text-zinc-500 hover:text-zinc-300">List</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex gap-3 h-full min-h-0">
          {STAGES.map(stage => (
            <PipelineColumn
              key={stage.id}
              stage={stage}
              leads={filteredLeads.filter(l => l.stage === stage.id)}
              onLeadClick={onOpenLead}
              onDragStart={handleDragStart}
              onDragOver={setDragOverStage}
              onDrop={handleDrop}
              dragOver={dragOverStage === stage.id && draggedLead?.stage !== stage.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// LEAD DETAIL DRAWER
// ============================================================

const LeadDetail = ({ lead, onClose, onUpdate }) => {
  const [tab, setTab] = useState("overview");
  const [note, setNote] = useState("");
  const owner = userById(lead.owner);
  const stage = stageById(lead.stage);

  const [leadActivity, setLeadActivity] = useState([
    { id: "la1", actor: "u1", verb: "stage.move", detail: `Moved to ${stage.label}`, time: "2h ago" },
    { id: "la2", actor: "u1", verb: "note.add", detail: "Initial discovery call went well. Decision-maker is engaged.", time: "yesterday" },
    { id: "la3", actor: "u2", verb: "email.send", detail: "Sent intro deck and pricing overview", time: "3d ago" },
    { id: "la4", actor: "u1", verb: "lead.create", detail: `Created from ${lead.source}`, time: "1w ago" },
  ]);

  const addNote = () => {
    if (!note.trim()) return;
    setLeadActivity([
      { id: `la-${Date.now()}`, actor: "u1", verb: "note.add", detail: note, time: "now" },
      ...leadActivity,
    ]);
    setNote("");
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200" />

      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[640px] bg-zinc-950 ring-1 ring-zinc-800 z-50 flex flex-col shadow-2xl"
        style={{ animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        <div className="border-b border-zinc-800 px-6 pt-5 pb-4 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 ring-1 ring-zinc-700 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-0.5">Lead · {lead.id.toUpperCase()}</div>
                <h2 className="text-[20px] font-semibold tracking-tight text-zinc-50 font-display">{lead.company}</h2>
                <div className="text-[12px] text-zinc-400">{lead.contact}</div>
              </div>
            </div>
            <button onClick={onClose} className="h-8 w-8 rounded-md text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900 flex items-center justify-center transition">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-zinc-900/60 ring-1 ring-zinc-800 rounded-md">
            {STAGES.filter(s => s.id !== "lost").map(s => {
              const isActive = lead.stage === s.id;
              const stageIdx = STAGES.findIndex(st => st.id === s.id);
              const currentIdx = STAGES.findIndex(st => st.id === lead.stage);
              const isPassed = stageIdx < currentIdx && lead.stage !== "lost";
              return (
                <button key={s.id} onClick={() => onUpdate({ ...lead, stage: s.id })}
                  className={`flex-1 h-7 px-2 rounded text-[10px] font-medium uppercase tracking-wider transition relative
                    ${isActive ? "bg-amber-400 text-zinc-950" : isPassed ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-600 hover:text-zinc-400"}`}>
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="px-3 py-2 rounded-md bg-zinc-900/40 ring-1 ring-zinc-800/60">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Value</div>
              <div className="text-[14px] font-semibold text-amber-300 tabular-nums font-display">{fmtCompact(lead.value)}</div>
            </div>
            <div className="px-3 py-2 rounded-md bg-zinc-900/40 ring-1 ring-zinc-800/60">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Score</div>
              <div className="flex items-center gap-1.5">
                <ScoreRing score={lead.score} size={20} />
                <span className="text-[12px] font-mono text-zinc-200 tabular-nums">{lead.score}</span>
              </div>
            </div>
            <div className="px-3 py-2 rounded-md bg-zinc-900/40 ring-1 ring-zinc-800/60">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Owner</div>
              <div className="flex items-center gap-1.5">
                <Avatar user={owner} size="xs" />
                <span className="text-[11px] text-zinc-200 truncate">{owner.name.split(" ")[0]}</span>
              </div>
            </div>
            <div className="px-3 py-2 rounded-md bg-zinc-900/40 ring-1 ring-zinc-800/60">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Priority</div>
              <Badge variant={lead.priority}>{lead.priority}</Badge>
            </div>
          </div>
        </div>

        <div className="px-6 border-b border-zinc-800 flex items-center gap-1">
          {["overview", "activity", "notes", "bookings"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`relative h-10 px-3 text-[12px] font-medium capitalize transition
                ${tab === t ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}>
              {t}
              {tab === t && <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-amber-400 rounded-t" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {tab === "overview" && (
            <div className="p-6 space-y-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Contact</div>
                <div className="space-y-2.5 bg-zinc-900/40 ring-1 ring-zinc-800/60 rounded-md p-4">
                  <div className="flex items-center gap-3 text-[12px]">
                    <User className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300 w-24">Name</span>
                    <span className="text-zinc-100 font-medium">{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <Mail className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300 w-24">Email</span>
                    <a className="text-amber-300 hover:underline">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <Phone className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300 w-24">Phone</span>
                    <span className="text-zinc-100 font-mono">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300 w-24">Company size</span>
                    <span className="text-zinc-100">{lead.company_size}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px]">
                    <Tag className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300 w-24">Source</span>
                    <Badge variant="info">{lead.source}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {lead.tags.map(t => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-medium text-zinc-400 bg-zinc-900 ring-1 ring-zinc-800 px-2 py-1 rounded">
                      <Hash className="h-2.5 w-2.5 inline mr-0.5" />
                      {t}
                    </span>
                  ))}
                  <button className="text-[10px] uppercase tracking-wider font-medium text-zinc-600 hover:text-zinc-400 ring-1 ring-zinc-800 ring-dashed px-2 py-1 rounded hover:ring-zinc-700 transition">
                    + add tag
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Next action</div>
                <div className="bg-amber-500/5 ring-1 ring-amber-500/20 rounded-md p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-medium text-zinc-100 mb-0.5">{lead.nextAction}</div>
                    <div className="text-[11px] text-amber-300/80 font-mono">{lead.nextActionDate}</div>
                  </div>
                  <Button size="sm" variant="primary" icon={Calendar}>Schedule</Button>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Score breakdown</div>
                <div className="bg-zinc-900/40 ring-1 ring-zinc-800/60 rounded-md p-4 space-y-2.5">
                  {[
                    { label: "Budget signals", value: 24, max: 25 },
                    { label: "Engagement", value: 22, max: 25 },
                    { label: "Decision authority", value: 18, max: 25 },
                    { label: "Timeline", value: lead.score - 64, max: 25 },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-zinc-400">{s.label}</span>
                        <span className="text-zinc-300 font-mono tabular-nums">{Math.max(s.value, 0)}/{s.max}</span>
                      </div>
                      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700"
                          style={{ width: `${(Math.max(s.value, 0) / s.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "activity" && (
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-4">Timeline</div>
              <div className="relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-zinc-800" />
                <div className="space-y-4">
                  {leadActivity.map(a => {
                    const actor = userById(a.actor);
                    return (
                      <div key={a.id} className="flex gap-3 relative">
                        <div className="relative z-10">
                          <Avatar user={actor} size="md" />
                        </div>
                        <div className="flex-1 bg-zinc-900/40 ring-1 ring-zinc-800/60 rounded-md p-3">
                          <div className="flex items-baseline gap-1.5 mb-1">
                            <span className="text-[12px] font-medium text-zinc-100">{actor.name}</span>
                            <span className="text-[11px] text-zinc-500">{ACTIVITY_VERBS[a.verb]}</span>
                            <span className="text-[10px] text-zinc-600 ml-auto font-mono">{a.time}</span>
                          </div>
                          <div className="text-[12px] text-zinc-300">{a.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Add note</div>
              <div className="bg-zinc-900/40 ring-1 ring-zinc-800/60 rounded-md p-3 mb-5 focus-within:ring-amber-500/40 transition">
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="What happened on this call? What's next?"
                  className="w-full bg-transparent text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none resize-none min-h-[60px]"
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                  <div className="flex gap-1.5">
                    {["@mention", "#tag"].map(s => (
                      <button key={s} className="text-[10px] text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5 rounded hover:bg-zinc-800/60">{s}</button>
                    ))}
                  </div>
                  <Button size="sm" variant="primary" onClick={addNote}>Save note</Button>
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-500 mb-3">Past notes</div>
              <div className="space-y-2">
                {leadActivity.filter(a => a.verb === "note.add").map(a => {
                  const actor = userById(a.actor);
                  return (
                    <div key={a.id} className="bg-zinc-900/40 ring-1 ring-zinc-800/60 rounded-md p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Avatar user={actor} size="xs" />
                        <span className="text-[11px] font-medium text-zinc-200">{actor.name}</span>
                        <span className="text-[10px] text-zinc-500 ml-auto font-mono">{a.time}</span>
                      </div>
                      <div className="text-[12px] text-zinc-300 leading-relaxed">{a.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "bookings" && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="h-12 w-12 rounded-full bg-zinc-900 ring-1 ring-zinc-800 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-5 w-5 text-zinc-600" />
                </div>
                <div className="text-[14px] font-medium text-zinc-200 mb-1 font-display">No bookings yet</div>
                <div className="text-[12px] text-zinc-500 mb-4 max-w-[280px] mx-auto">Schedule a discovery call or demo with {lead.contact.split(" ")[0]} to move this lead forward.</div>
                <Button variant="primary" size="sm" icon={Calendar}>Schedule call</Button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 px-6 py-3 flex items-center justify-between bg-zinc-950/80">
          <Button variant="ghost" size="sm" icon={Trash2}>Archive</Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={FileText}>Create quote</Button>
            <Button variant="primary" size="sm" icon={CheckCircle2}>Convert to client</Button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================
// COMMAND PALETTE
// ============================================================

const CommandPalette = ({ open, onClose, onNavigate, onOpenLead, leads }) => {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filteredLeads = leads.filter(l => l.company.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  const pages = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "pipeline", label: "Pipeline", icon: Layers },
    { id: "calendar", label: "Calendar", icon: CalendarDays },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ].filter(p => !q || p.label.toLowerCase().includes(q.toLowerCase()));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" />
      <div className="relative w-full max-w-[560px] bg-zinc-900 ring-1 ring-zinc-800 rounded-lg shadow-2xl overflow-hidden"
        style={{ animation: "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <style>{`@keyframes scaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>

        <div className="flex items-center gap-3 px-4 h-12 border-b border-zinc-800">
          <Search className="h-4 w-4 text-zinc-500" />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search leads, pages, actions..."
            className="flex-1 bg-transparent text-[14px] text-zinc-100 placeholder:text-zinc-600 outline-none" />
          <kbd className="text-[9px] font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800 ring-1 ring-zinc-700">ESC</kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredLeads.length > 0 && (
            <div className="mb-2">
              <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-semibold text-zinc-500">Leads</div>
              {filteredLeads.map(l => (
                <button key={l.id} onClick={() => { onOpenLead(l); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 h-9 rounded-md hover:bg-zinc-800/60 text-left transition group">
                  <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[13px] text-zinc-100 flex-1">{l.company}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">{fmtCompact(l.value)}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-amber-400 transition" />
                </button>
              ))}
            </div>
          )}

          {pages.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] font-semibold text-zinc-500">Navigation</div>
              {pages.map(p => (
                <button key={p.id} onClick={() => { onNavigate(p.id); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 h-9 rounded-md hover:bg-zinc-800/60 text-left transition">
                  <p.icon className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[13px] text-zinc-100">Go to {p.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-zinc-800 px-4 h-10 flex items-center justify-between text-[10px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono">↵</kbd> select
            </span>
          </div>
          <span className="text-amber-400/80 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> AI suggestions
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PLACEHOLDER PAGES
// ============================================================

const PlaceholderPage = ({ title, icon: Icon, description }) => (
  <div className="h-full flex flex-col items-center justify-center px-6">
    <div className="h-16 w-16 rounded-full bg-zinc-900 ring-1 ring-zinc-800 flex items-center justify-center mb-5">
      <Icon className="h-7 w-7 text-zinc-600" />
    </div>
    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-400/80 mb-2">// Module</div>
    <h2 className="text-[24px] font-semibold tracking-tight text-zinc-100 mb-2 font-display">
      {title}
    </h2>
    <p className="text-[13px] text-zinc-500 text-center max-w-[400px] mb-6">{description}</p>
    <Badge variant="warning">Coming in Phase 2</Badge>
  </div>
);

// ============================================================
// ROOT APP
// ============================================================

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [leads, setLeads] = useState(LEADS_SEED);
  const [openLead, setOpenLead] = useState(null);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setOpenLead(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const updateLead = (updated) => {
    setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
    setOpenLead(updated);
  };

  return (
    <div className="h-screen flex bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar active={page} onNavigate={setPage} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={
            page === "dashboard" ? "Dashboard"
            : page === "pipeline" ? "Pipeline"
            : page === "calendar" ? "Calendar"
            : page === "projects" ? "Projects"
            : page === "catalog" ? "Catalog"
            : page === "analytics" ? "Analytics"
            : page === "activity" ? "Activity"
            : page === "team" ? "Team"
            : "Settings"
          }
          breadcrumb={["Atlas Studio", page.charAt(0).toUpperCase() + page.slice(1)]}
          onCmdK={() => setCmdOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-950">
          {page === "dashboard" && <Dashboard onOpenLead={setOpenLead} />}
          {page === "pipeline" && <Pipeline leads={leads} setLeads={setLeads} onOpenLead={setOpenLead} />}
          {page === "calendar" && <PlaceholderPage title="Calendar & Bookings" icon={CalendarDays} description="Schedule discovery calls, demos, and meetings with conflict detection and timezone handling." />}
          {page === "projects" && <PlaceholderPage title="Projects & Kanban" icon={Briefcase} description="Drag-and-drop task management with project health tracking and dependency visualization." />}
          {page === "catalog" && <PlaceholderPage title="Service Catalog" icon={Package} description="Build quotes from a catalog of packages and add-ons. Apply promo codes and send to clients." />}
          {page === "analytics" && <PlaceholderPage title="Analytics" icon={TrendingUp} description="Compare periods, track funnel conversion, and identify outlier moments in your sales motion." />}
          {page === "activity" && <PlaceholderPage title="Activity Feed" icon={Activity} description="Filterable timeline across leads, bookings, projects, and quotes — your team's audit trail." />}
          {page === "team" && <PlaceholderPage title="Team" icon={Users} description="Manage roles, permissions, working hours, and individual performance." />}
          {page === "settings" && <PlaceholderPage title="Settings" icon={Settings} description="Workspace preferences, integrations, billing, and notification controls." />}
        </main>
      </div>

      {openLead && <LeadDetail lead={openLead} onClose={() => setOpenLead(null)} onUpdate={updateLead} />}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={setPage} onOpenLead={setOpenLead} leads={leads} />
    </div>
  );
}
