import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const DISCIPLINES = [
  {
    name: "Architecture",
    explain: "Architects, Draftsmen, Designers creating and documenting building design",
    wants: ["RVT collaboration", "Model viewing", "DWG Link Analysis", "3D Analysis"],
    platform: ["Windows"],
    color: "#1A6FD4",
    bg: "#EBF4FF",
    group: "Design",
  },
  {
    name: "Structural Engineering",
    explain: "Engineers, Draftsmen and Designers creating and documenting structures (buildings, bridges, etc.)",
    wants: ["Structural analysis", "RVT/DWG collaboration", "Load calculations"],
    platform: ["Windows"],
    color: "#6B3FA0",
    bg: "#F3EEF9",
    group: "Design",
  },
  {
    name: "MEP Engineering",
    explain: "Engineers and draftsmen designing and documenting mechanical, electrical, and plumbing systems for buildings, tunnels, etc.",
    wants: ["Systems coordination", "Clash detection", "MEP modeling"],
    platform: ["Windows"],
    color: "#0E7F6E",
    bg: "#E8F7F4",
    group: "Design",
  },
  {
    name: "Civil & Landscape",
    explain: "Civil engineers and landscape designers",
    wants: ["Site modeling", "Survey integration", "Grading plans"],
    platform: ["Windows"],
    color: "#1D7A4A",
    bg: "#E8F6EE",
    group: "Design",
  },
  {
    name: "Interior & Lighting Design",
    explain: "Interior designers and lighting specialists creating interior environments and lighting schemes",
    wants: ["Rendering", "Material libraries", "Lighting simulation"],
    platform: ["Windows", "Mac"],
    color: "#B5591A",
    bg: "#FEF3E8",
    group: "Design",
  },
  {
    name: "AEC Specialists",
    explain: "Specialist consultants (acoustics, fire safety, food service, lab design, signage, etc.)",
    wants: ["Document sharing", "Model access", "RFI tracking"],
    platform: ["Windows", "Mac"],
    color: "#5A6E8A",
    bg: "#EEF2F7",
    group: "Specialist",
  },
  {
    name: "Technical / Spec Writer",
    explain: "Specification writers and technical documentation specialists",
    wants: ["Spec libraries", "Section templates", "Document linking"],
    platform: ["Windows"],
    color: "#3A5A7A",
    bg: "#EBF1F7",
    group: "Specialist",
  },
  {
    name: "Document Management",
    explain: "Document control specialists managing project documentation workflows",
    wants: ["Version control", "Transmittals", "Approval workflows"],
    platform: ["Windows"],
    color: "#4A6070",
    bg: "#EDF3F6",
    group: "Specialist",
  },
  {
    name: "BIM/CAD/VDC Specialists",
    explain: "BIM managers, CAD technicians, and Virtual Design & Construction specialists",
    wants: ["BIM coordination", "Model management", "Point cloud", "4D scheduling"],
    platform: ["Windows"],
    color: "#1A5FA0",
    bg: "#E8F2FC",
    group: "Specialist",
  },
  {
    name: "Construction Management",
    explain: "General contractors and construction managers focused on the implementation of designs.",
    wants: ["Data distribution & management", "RFI and Change order tracking", "Progress reporting"],
    platform: ["Windows"],
    color: "#C0392B",
    bg: "#FDECEA",
    group: "Construction",
  },
  {
    name: "Cost Estimator",
    explain: "Quantity surveyors and cost estimators managing project budgets and bid analysis",
    wants: ["Quantity takeoff", "Bid comparison", "Cost databases"],
    platform: ["Windows", "Mac"],
    color: "#7D5A00",
    bg: "#FDF6E3",
    group: "Construction",
  },
  {
    name: "Building Trades",
    explain: "Constructors — people onsite building per the design.",
    wants: ["3D Model visualization", "Semantic linkage", "RFI and Change order tracking", "Progress reporting"],
    platform: ["Windows"],
    color: "#8B4513",
    bg: "#FDF0E8",
    group: "Construction",
  },
  {
    name: "BD / MBA",
    explain: "Users focused on Business management and development. Builders of proposals, Sellers.",
    wants: ["Proposal tools", "CRM integration", "Pipeline tracking"],
    platform: ["Windows", "Mac"],
    color: "#2C5F8A",
    bg: "#EBF3FB",
    group: "Business",
  },
  {
    name: "Marketing",
    explain: "Users focused on promoting their firm, generating media for the purposes of market visibility",
    wants: ["Design Templates", "Content Libraries", "Brand management"],
    platform: ["Mac"],
    color: "#9B2C8E",
    bg: "#F8EDF7",
    group: "Business",
  },
];

const ROLES = [
  { role: "Firm / Department Leader", title: "Partner / Principal / VP", wants: "Firm performance, proposal wins, utilization rates", platform: "Windows / Mac" },
  { role: "Designer", title: "Designer / Drafter", wants: "Fast iteration, design tools, rendering", platform: "Windows / Mac" },
  { role: "Project Manager", title: "PM / Associate PM", wants: "Schedule, budget, RFI tracking, team coordination", platform: "Windows / Mac" },
  { role: "Production Manager", title: "Production Manager", wants: "Document production, QA/QC, sheet management", platform: "Windows" },
  { role: "BIM / CAD Specialist", title: "VDC Specialist (GC) / Facility Architect (Owner)", wants: "Model coordination, clash detection, standards compliance", platform: "Windows" },
  { role: "BIM / CAD Manager", title: "BIM Manager / CAD Manager", wants: "Standards, template management, software deployment", platform: "Windows" },
  { role: "IT Manager / Purchaser", title: "IT Director / Procurement", wants: "Licensing, security, deployment, integrations", platform: "Windows / Mac" },
  { role: "Document Specialist", title: "Document Controller", wants: "Transmittals, version control, distribution logs", platform: "Windows" },
  { role: "Field Supervisor", title: "Superintendent / Site Foreman", wants: "Mobile access, RFI responses, daily reports", platform: "Windows (tablet)" },
  { role: "Cost Estimator", title: "Estimator / QS", wants: "Quantity takeoff, bid analysis, material costs", platform: "Windows" },
];

const CONTRACT_TYPES = [
  {
    id: "dbb",
    label: "Design-Bid-Build",
    short: "DBB",
    color: "#1A6FD4",
    description: "The most common project delivery method. An owner contracts separately with a designer and a general contractor. Design is completed first, then the project is bid competitively.",
    phases: ["Design", "Bid", "Build"],
    firms: [
      { id: "owner", label: "Owner", color: "#1A1A1A", x: 50, y: 50 },
      { id: "ownersrep", label: "Owner's Rep / CM", color: "#E07B27", x: 50, y: 180 },
      { id: "ownersconsult", label: "Owner's Consultants", color: "#5A6E8A", x: 280, y: 50 },
      { id: "lead", label: "LEAD Firm", color: "#1A6FD4", x: 480, y: 120 },
      { id: "consult1", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 50 },
      { id: "consult2", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 130 },
      { id: "consult3", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 210 },
      { id: "consult4", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 290 },
      { id: "gc1", label: "General Contractor", color: "#C0392B", x: 480, y: 340 },
      { id: "gc2", label: "General Contractor", color: "#C0392B", x: 580, y: 410 },
      { id: "gc3", label: "General Contractor", color: "#C0392B", x: 680, y: 340 },
      { id: "winning", label: "Winning GC", color: "#1D7A4A", x: 480, y: 480 },
      { id: "sub", label: "Sub/Specialty Contractor", color: "#8B4513", x: 680, y: 480 },
    ],
    planRoom: true,
    blindBid: true,
    rfiNote: "RFIs answered to ALL contractors for fair, comparable bids",
  },
  {
    id: "db",
    label: "Design-Build",
    short: "DB",
    color: "#E07B27",
    description: "A single entity (Design-Builder) is responsible for both design and construction. The owner has a single point of contact and the design-builder manages all consultants and subcontractors.",
    phases: ["Design", "Build"],
    firms: [
      { id: "owner", label: "Owner", color: "#1A1A1A", x: 50, y: 200 },
      { id: "ownersconsult", label: "Owner's Consultants", color: "#5A6E8A", x: 50, y: 320 },
      { id: "gc", label: "General Contractor", color: "#C0392B", x: 250, y: 200 },
      { id: "lead", label: "LEAD Firm", color: "#1A6FD4", x: 450, y: 100 },
      { id: "consult1", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 50 },
      { id: "consult2", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 130 },
      { id: "consult3", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 210 },
      { id: "consult4", label: "Consulting Firm", color: "#6B3FA0", x: 680, y: 290 },
      { id: "ccontract", label: "Contractor's Consultants", color: "#5A6E8A", x: 450, y: 320 },
      { id: "sub", label: "Sub/Specialty Contractor", color: "#8B4513", x: 450, y: 440 },
    ],
    planRoom: false,
    blindBid: false,
    rfiNote: "Owner holds single contract with Design-Builder",
  },
  {
    id: "ipd",
    label: "Integrated Project Delivery",
    short: "IPD / P3",
    color: "#1D7A4A",
    description: "All key parties — owner, designer, and contractor — share risk and reward under a multi-party agreement. Collaboration is maximized from project inception.",
    phases: ["Collaborate", "Design", "Build"],
    firms: [
      { id: "owner", label: "Owner", color: "#1A1A1A", x: 50, y: 200 },
      { id: "ownersconsult", label: "Owner's Consultants", color: "#5A6E8A", x: 50, y: 340 },
      { id: "gc", label: "General Contractor", color: "#C0392B", x: 300, y: 320 },
      { id: "lead", label: "LEAD Firm", color: "#1A6FD4", x: 550, y: 200 },
    ],
    planRoom: false,
    blindBid: false,
    rfiNote: "All parties share risk and reward via multi-party contract",
  },
];

const PERSONA_CASES = [
  {
    name: "Estimator",
    icon: "📊",
    color: "#1A6FD4",
    features: [
      "Start a template, looks like a dropped view",
      "Send files, without email client",
      "Active links collaborate in drawings",
      "Search easily, find the old file",
    ],
  },
  {
    name: "Design / VDC",
    icon: "🏗️",
    color: "#6B3FA0",
    features: [
      "No juggling, looks like a dropped drive",
      "Native support for links (no broken references)",
      "Integrated with tools you use — everything connected",
      "Easy sharing with partners",
      "Tight integration with notifications & access accountability",
    ],
  },
  {
    name: "Field Engineer / PM",
    icon: "🔧",
    color: "#C0392B",
    features: [
      "Everything project documentation is shared",
      "No need for specialized models for process related documents",
      "No checking files in or out — simple access",
      "Mobile-ready for on-site use",
      "Progress photos & site reports",
    ],
  },
  {
    name: "Back Office",
    icon: "🏢",
    color: "#1D7A4A",
    features: [
      "Everyone knows about project content",
      "Tight integrated, all notifications",
      "Secure internal & external communications",
      "Automated Data life cycle management",
    ],
  },
];

const AI_ROLES = [
  { title: "Partner / Principal", discipline: "Architecture", confidence: 97, tags: ["Leadership", "Architecture", "BD"] },
  { title: "BIM Manager", discipline: "BIM/CAD/VDC", confidence: 94, tags: ["BIM", "VDC", "Technical"] },
  { title: "Project Architect", discipline: "Architecture", confidence: 91, tags: ["Architecture", "PM", "Design"] },
  { title: "MEP Engineer", discipline: "MEP Engineering", confidence: 89, tags: ["MEP", "Engineering", "Systems"] },
  { title: "Construction Manager", discipline: "Construction Management", confidence: 88, tags: ["CM", "GC", "Field"] },
  { title: "Interior Designer", discipline: "Interior & Lighting Design", confidence: 85, tags: ["Interior", "Design", "Mac"] },
  { title: "Cost Estimator", discipline: "Cost Estimator", confidence: 82, tags: ["Estimating", "Budget", "Bid"] },
  { title: "Marketing Coordinator", discipline: "Marketing", confidence: 79, tags: ["Marketing", "Content", "Mac"] },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PlatformBadge({ platform }: { platform: string }) {
  const isWin = platform === "Windows";
  const isMac = platform === "Mac";
  const isBoth = platform === "Windows / Mac" || platform === "Windows (tablet)";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium"
      style={{
        background: isMac ? "#2C2C2E" : isBoth ? "#1A2E45" : "#1A2040",
        color: isMac ? "#F2F2F7" : isBoth ? "#93C5FD" : "#93C5FD",
        border: `1px solid ${isMac ? "#48484A" : "#2B4070"}`,
      }}
    >
      {(isWin || isBoth) && <span style={{ color: "#60A5FA" }}>⊞</span>}
      {(isMac || isBoth) && <span style={{ color: "#A8D8A8" }}>⌘</span>}
      {platform}
    </span>
  );
}

function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: color ? color + "22" : "#1A2E4522",
        color: color || "#93C5FD",
        border: `1px solid ${color ? color + "44" : "#2B407066"}`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Views ───────────────────────────────────────────────────────────────────

function DisciplinesView() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const groups = ["All", "Design", "Specialist", "Construction", "Business"];
  const filtered = filter === "All" ? DISCIPLINES : DISCIPLINES.filter((d) => d.group === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#EDF2F7" }}>
            AEC Disciplines
          </h2>
          <p style={{ color: "#6B7FA3", fontSize: 14, marginTop: 4 }}>
            {DISCIPLINES.length} discipline profiles · Role-based platform requirements
          </p>
        </div>
        <div className="flex gap-2">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === g ? "#1A6FD4" : "#1A2E45",
                color: filter === g ? "#fff" : "#93C5FD",
                border: `1px solid ${filter === g ? "#1A6FD4" : "#2B4070"}`,
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl" style={{ border: "1px solid #1A2E45" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#0D1B2A", borderBottom: "1px solid #1A2E45" }}>
              {["Discipline", "Group", "Explain", "Key Wants", "Primary Platform"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-mono font-semibold uppercase tracking-widest"
                  style={{ color: "#6B7FA3" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr
                key={d.name}
                onMouseEnter={() => setHovered(d.name)}
                onMouseLeave={() => setHovered(null)}
                className="transition-colors cursor-default"
                style={{
                  background: hovered === d.name ? d.bg + "18" : i % 2 === 0 ? "#0F1E2F" : "#111C2B",
                  borderBottom: "1px solid #1A2E45",
                }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ background: d.color }}
                    />
                    <span className="font-semibold text-sm" style={{ color: "#EDF2F7" }}>
                      {d.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Tag label={d.group} color={d.color} />
                </td>
                <td className="px-5 py-4" style={{ color: "#8FA3BE", fontSize: 13, maxWidth: 300 }}>
                  {d.explain}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {d.wants.map((w) => (
                      <Tag key={w} label={w} color={d.color} />
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {d.platform.map((p) => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RolesView() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const disciplines = ["Architecture", "Interior", "Structural", "MEP", "GC", "Owner"];

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#EDF2F7" }}>
          Role in Firm Matrix
        </h2>
        <p style={{ color: "#6B7FA3", fontSize: 14, marginTop: 4 }}>
          3D Persona Matrix: Firm Role × User Role × Discipline / Specialty
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-1 rounded-xl p-5"
          style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#6B7FA3" }}>
            3D Persona Axes
          </div>
          <div className="space-y-3">
            {[
              { axis: "X", label: "COMPANY / FIRM Contract Position", color: "#E07B27", icon: "↔" },
              { axis: "Y", label: "Discipline / Specialty", color: "#1A6FD4", icon: "↕" },
              { axis: "Z", label: "Role in Firm", color: "#C0392B", icon: "⊙" },
            ].map((a) => (
              <div
                key={a.axis}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "#0D1B2A", border: "1px solid #1A2E45" }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold font-mono"
                  style={{ background: a.color + "22", color: a.color, border: `1px solid ${a.color}44` }}
                >
                  {a.icon}
                </div>
                <div>
                  <div className="text-xs font-mono" style={{ color: "#6B7FA3" }}>
                    Axis {a.axis}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "#BDD0E8" }}>
                    {a.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 p-3 rounded-lg text-xs"
            style={{ background: "#1A6FD422", border: "1px solid #1A6FD444", color: "#93C5FD" }}
          >
            <div className="font-semibold mb-1">🤖 AI Classification Active</div>
            Capturing Role/Job title → Adding classifications to customers with AI
          </div>
        </div>

        <div className="col-span-2 space-y-3">
          <div className="overflow-hidden rounded-xl" style={{ border: "1px solid #1A2E45" }}>
            <div
              className="px-5 py-3 text-xs font-mono font-semibold uppercase tracking-widest"
              style={{ background: "#1A2E45", color: "#93C5FD" }}
            >
              Role in Firm
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: "#0D1B2A", borderBottom: "1px solid #1A2E45" }}>
                  <th className="px-4 py-2.5 text-left text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7FA3" }}>Role</th>
                  <th className="px-4 py-2.5 text-left text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7FA3" }}>Job Title</th>
                  <th className="px-4 py-2.5 text-left text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7FA3" }}>Key Wants</th>
                  <th className="px-4 py-2.5 text-left text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7FA3" }}>Platform</th>
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r, i) => (
                  <tr
                    key={r.role}
                    onClick={() => setSelectedRole(selectedRole === r.role ? null : r.role)}
                    className="cursor-pointer transition-colors"
                    style={{
                      background: selectedRole === r.role ? "#1A6FD422" : i % 2 === 0 ? "#0F1E2F" : "#111C2B",
                      borderBottom: "1px solid #1A2E45",
                      borderLeft: selectedRole === r.role ? "3px solid #1A6FD4" : "3px solid transparent",
                    }}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold" style={{ color: "#EDF2F7" }}>{r.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono" style={{ color: "#93C5FD" }}>{r.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs" style={{ color: "#8FA3BE" }}>{r.wants}</span>
                    </td>
                    <td className="px-4 py-3">
                      <PlatformBadge platform={r.platform} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="p-4 rounded-xl text-xs"
            style={{ background: "#E07B2718", border: "1px solid #E07B2744", color: "#F5C887" }}
          >
            <div className="font-semibold mb-1">💡 Feature: Role / Folder Access Templates</div>
            Project templates support dynamic groups (PM group, Structural group, etc.) with pre-configured
            folder permissions. Role-based access control applies automatically on project creation.
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#6B7FA3" }}>
          Discipline Coverage by Role
        </div>
        <div className="grid grid-cols-6 gap-3">
          {disciplines.map((d) => (
            <div
              key={d}
              className="rounded-xl p-4 text-center"
              style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
            >
              <div className="text-sm font-semibold mb-3" style={{ color: "#EDF2F7" }}>{d}</div>
              <div className="space-y-2">
                {["Leader", "Designer", "PM", "BIM/CAD", "Field"].map((r) => (
                  <div
                    key={r}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "#1A2E45",
                      color: "#6B7FA3",
                      fontSize: 10,
                    }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContractBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-3 py-1 rounded text-sm font-semibold font-mono"
      style={{ background: color + "22", color, border: `1px solid ${color}55` }}
    >
      {label}
    </span>
  );
}

function ContractDiagram({ ct }: { ct: typeof CONTRACT_TYPES[0] }) {
  const firmColors: Record<string, string> = {
    owner: "#374151",
    lead: "#1A6FD4",
    gc: "#C0392B",
    winning: "#1D7A4A",
    consult1: "#6B3FA0",
    consult2: "#6B3FA0",
    consult3: "#6B3FA0",
    consult4: "#6B3FA0",
    sub: "#8B4513",
    ownersrep: "#E07B27",
    ownersconsult: "#5A6E8A",
    ccontract: "#5A6E8A",
    gc1: "#C0392B",
    gc2: "#C0392B",
    gc3: "#C0392B",
  };

  return (
    <div className="flex flex-wrap gap-3 p-4">
      {ct.firms.map((f) => (
        <div
          key={f.id}
          className="px-3 py-2 rounded-lg text-xs font-medium text-center"
          style={{
            background: (firmColors[f.id] || f.color) + "22",
            border: `1px solid ${(firmColors[f.id] || f.color)}55`,
            color: firmColors[f.id] || f.color,
            minWidth: 120,
          }}
        >
          {f.label}
        </div>
      ))}
    </div>
  );
}

function ContractPositionsView() {
  const [active, setActive] = useState("dbb");
  const ct = CONTRACT_TYPES.find((c) => c.id === active)!;

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#EDF2F7" }}>
          Contract Positions
        </h2>
        <p style={{ color: "#6B7FA3", fontSize: 14, marginTop: 4 }}>
          Project delivery methods and firm relationship structures
        </p>
      </div>

      <div className="flex gap-3">
        {CONTRACT_TYPES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className="flex-1 p-4 rounded-xl text-left transition-all"
            style={{
              background: active === c.id ? c.color + "22" : "#0F1E2F",
              border: `2px solid ${active === c.id ? c.color : "#1A2E45"}`,
            }}
          >
            <div className="font-mono text-xs mb-1" style={{ color: active === c.id ? c.color : "#6B7FA3" }}>
              {c.short}
            </div>
            <div className="font-semibold text-sm" style={{ color: "#EDF2F7" }}>
              {c.label}
            </div>
            <div className="flex gap-1 mt-2">
              {c.phases.map((p) => (
                <span
                  key={p}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ background: c.color + "33", color: c.color }}
                >
                  {p}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-2 rounded-xl overflow-hidden"
          style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ background: ct.color + "22", borderBottom: `1px solid ${ct.color}44` }}
          >
            <div className="font-semibold text-sm" style={{ color: ct.color }}>
              {ct.label}: Firms
            </div>
            <div className="flex gap-2">
              {ct.phases.map((p) => (
                <ContractBadge key={p} label={p} color={ct.color} />
              ))}
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm mb-6" style={{ color: "#8FA3BE", lineHeight: 1.7 }}>
              {ct.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Owner", items: ["Funding", "Requirements", "Final approval"], color: "#374151" },
                { label: "LEAD Firm", items: ["Contract holder", "Design coordination", "Consultant management"], color: "#1A6FD4" },
                { label: "Consulting Firms", items: ["Structural", "MEP", "Landscape", "Specialists"], color: "#6B3FA0" },
                { label: "Contractor", items: ["Construction", "RFI management", "Sub coordination"], color: "#C0392B" },
              ].map((box) => (
                <div
                  key={box.label}
                  className="p-4 rounded-xl"
                  style={{ background: box.color + "18", border: `1px solid ${box.color}33` }}
                >
                  <div className="text-sm font-semibold mb-2" style={{ color: box.color }}>
                    {box.label}
                  </div>
                  {box.items.map((item) => (
                    <div key={item} className="text-xs flex items-center gap-2 mb-1" style={{ color: "#8FA3BE" }}>
                      <div className="w-1 h-1 rounded-full" style={{ background: box.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <ContractDiagram ct={ct} />
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
          >
            <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#6B7FA3" }}>
              Platform Features
            </div>
            <div className="space-y-2">
              {[
                { label: "Plan Room Setup", active: ct.planRoom, desc: "Share docs to multiple bidders" },
                { label: "Blind Bid Process", active: ct.blindBid, desc: "Comparable fair bidding" },
                { label: "RFI Management", active: true, desc: ct.rfiNote },
                { label: "Change Orders", active: true, desc: "Track and approve changes" },
                { label: "Progress Reporting", active: true, desc: "Real-time field reporting" },
                { label: "Document Sharing", active: true, desc: "Controlled distribution" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="p-3 rounded-lg"
                  style={{
                    background: f.active ? "#1A6FD418" : "#0D1B2A",
                    border: `1px solid ${f.active ? "#1A6FD444" : "#1A2E45"}`,
                    opacity: f.active ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                      style={{
                        background: f.active ? "#1A6FD4" : "#2A3A4A",
                        color: f.active ? "#fff" : "#6B7FA3",
                      }}
                    >
                      {f.active ? "✓" : "–"}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: f.active ? "#93C5FD" : "#6B7FA3" }}>
                      {f.label}
                    </span>
                  </div>
                  <div className="text-xs pl-6" style={{ color: "#6B7FA3" }}>
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
          >
            <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#6B7FA3" }}>
              Specialist Consultants
            </div>
            <div className="space-y-1">
              {["Landscape", "Lighting", "Fire Safety", "Plumbing", "Mechanical", "Structural", "Electrical", "Signage", "Kitchen", "Lab"].map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 px-2 py-1.5 rounded text-xs"
                  style={{ color: "#8FA3BE" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#6B3FA0" }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonaView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#EDF2F7" }}>
          Persona Use Cases
        </h2>
        <p style={{ color: "#6B7FA3", fontSize: 14, marginTop: 4 }}>
          How each user archetype benefits from the platform
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {PERSONA_CASES.map((p) => (
          <div
            key={p.name}
            className="rounded-xl overflow-hidden"
            style={{ background: "#0F1E2F", border: `1px solid ${p.color}44` }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ background: p.color + "22", borderBottom: `1px solid ${p.color}33` }}
            >
              <span className="text-2xl">{p.icon}</span>
              <div>
                <div className="font-semibold" style={{ color: p.color }}>
                  {p.name}
                </div>
                <div className="text-xs" style={{ color: "#6B7FA3" }}>
                  Platform persona
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#6B7FA3" }}>
                Key Benefits
              </div>
              <div className="space-y-2">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div
                      className="mt-1 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-xs"
                      style={{ background: p.color + "33", color: p.color }}
                    >
                      ✓
                    </div>
                    <span className="text-sm" style={{ color: "#BDD0E8" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
      >
        <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#6B7FA3" }}>
          Platform Requirements by Persona
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { persona: "Estimator", needs: ["Template engine", "File sharing", "DWG links", "File search"], platform: "Windows" },
            { persona: "Design / VDC", needs: ["Drive-like UX", "Native link support", "Tool integrations", "Partner sharing"], platform: "Windows" },
            { persona: "Field Engineer / PM", needs: ["Mobile access", "Progress photos", "RFI tracking", "Doc sharing"], platform: "Windows (tablet/mobile)" },
            { persona: "Back Office", needs: ["Notifications", "Secure comms", "Life cycle mgmt", "Project visibility"], platform: "Windows / Mac" },
          ].map((item) => (
            <div
              key={item.persona}
              className="rounded-xl p-4"
              style={{ background: "#0D1B2A", border: "1px solid #1A2E45" }}
            >
              <div className="font-semibold text-sm mb-1" style={{ color: "#EDF2F7" }}>
                {item.persona}
              </div>
              <div className="mb-3">
                <PlatformBadge platform={item.platform} />
              </div>
              <div className="space-y-1">
                {item.needs.map((n) => (
                  <div key={n} className="text-xs" style={{ color: "#6B7FA3" }}>
                    → {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIView() {
  const [inputValue, setInputValue] = useState("");
  const [classified, setClassified] = useState<typeof AI_ROLES[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClassify = () => {
    if (!inputValue.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const match = AI_ROLES.find(
        (r) =>
          inputValue.toLowerCase().includes(r.title.toLowerCase().split(" ")[0]) ||
          r.title.toLowerCase().includes(inputValue.toLowerCase().split(" ")[0])
      );
      setClassified(
        match || {
          title: inputValue,
          discipline: "AEC Specialists",
          confidence: Math.floor(70 + Math.random() * 20),
          tags: ["Specialist", "Consultant"],
        }
      );
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "#EDF2F7" }}>
          AI Classification Engine
        </h2>
        <p style={{ color: "#6B7FA3", fontSize: 14, marginTop: 4 }}>
          Automated persona classification based on job titles and roles
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div
          className="col-span-1 rounded-xl p-5 space-y-4"
          style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
        >
          <div className="text-xs font-mono uppercase tracking-widest" style={{ color: "#6B7FA3" }}>
            Classify a Job Title
          </div>
          <div>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleClassify()}
              placeholder="e.g. Senior Project Architect"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "#0D1B2A",
                border: "1px solid #1A6FD4",
                color: "#EDF2F7",
                fontFamily: "var(--font-mono)",
              }}
            />
          </div>
          <button
            onClick={handleClassify}
            disabled={isProcessing || !inputValue.trim()}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: isProcessing ? "#1A2E45" : "#1A6FD4",
              color: isProcessing ? "#6B7FA3" : "#fff",
              cursor: isProcessing ? "wait" : "pointer",
            }}
          >
            {isProcessing ? "Analyzing…" : "Classify →"}
          </button>

          {classified && !isProcessing && (
            <div
              className="p-4 rounded-xl"
              style={{ background: "#1D7A4A22", border: "1px solid #1D7A4A55" }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: "#6B7FA3" }}>Classification Result</div>
              <div className="font-semibold text-sm mb-1" style={{ color: "#EDF2F7" }}>
                {classified.title}
              </div>
              <div className="text-xs mb-2" style={{ color: "#93C5FD" }}>
                → {classified.discipline}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#1A2E45" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${classified.confidence}%`,
                      background: classified.confidence > 85 ? "#1D7A4A" : classified.confidence > 70 ? "#E07B27" : "#C0392B",
                    }}
                  />
                </div>
                <span className="text-xs font-mono" style={{ color: "#93C5FD" }}>
                  {classified.confidence}%
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {classified.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="col-span-2 rounded-xl overflow-hidden"
          style={{ background: "#0F1E2F", border: "1px solid #1A2E45" }}
        >
          <div
            className="px-5 py-3 text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ background: "#1A2E45", color: "#93C5FD" }}
          >
            Classification Samples — {AI_ROLES.length} mapped roles
          </div>
          <div className="divide-y" style={{ borderColor: "#1A2E45" }}>
            {AI_ROLES.map((r) => (
              <div
                key={r.title}
                className="px-5 py-3.5 flex items-center gap-4"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-0.5" style={{ color: "#EDF2F7" }}>
                    {r.title}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {r.tags.map((t) => (
                      <Tag key={t} label={t} />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1.5" style={{ color: "#93C5FD" }}>
                    → {r.discipline}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-24 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "#1A2E45" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${r.confidence}%`,
                          background: r.confidence > 90 ? "#1D7A4A" : r.confidence > 80 ? "#1A6FD4" : "#E07B27",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono w-8 text-right" style={{ color: "#6B7FA3" }}>
                      {r.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Roles Mapped", value: "47", delta: "+12 this month", color: "#1A6FD4" },
          { label: "Auto-Classified Users", value: "1,842", delta: "94.3% accuracy", color: "#1D7A4A" },
          { label: "Disciplines Covered", value: "14", delta: "All disciplines active", color: "#6B3FA0" },
          { label: "Unclassified Pending", value: "108", delta: "Needs review", color: "#E07B27" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{ background: "#0F1E2F", border: `1px solid ${stat.color}33` }}
          >
            <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#6B7FA3" }}>
              {stat.label}
            </div>
            <div
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "var(--font-mono)", color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: "#6B7FA3" }}>
              {stat.delta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewView({ setTab }: { setTab: (t: string) => void }) {
  const stats = [
    { label: "Disciplines", value: 14, color: "#1A6FD4" },
    { label: "Firm Roles", value: 10, color: "#6B3FA0" },
    { label: "Contract Types", value: 3, color: "#E07B27" },
    { label: "Personas", value: 4, color: "#1D7A4A" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-6 text-center"
            style={{ background: "#0F1E2F", border: `1px solid ${s.color}44` }}
          >
            <div
              className="text-5xl font-bold mb-2"
              style={{ fontFamily: "var(--font-mono)", color: s.color }}
            >
              {s.value}
            </div>
            <div className="text-sm" style={{ color: "#8FA3BE" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#6B7FA3" }}>
            Quick Access
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { tab: "disciplines", label: "Disciplines", desc: "14 AEC discipline profiles", icon: "🏛", color: "#1A6FD4" },
              { tab: "roles", label: "Role Matrix", desc: "3D persona framework", icon: "🧩", color: "#6B3FA0" },
              { tab: "contracts", label: "Contract Positions", desc: "DBB, DB, IPD/P3", icon: "📋", color: "#E07B27" },
              { tab: "personas", label: "Persona Use Cases", desc: "Field, VDC, Estimator, BO", icon: "👥", color: "#1D7A4A" },
              { tab: "ai", label: "AI Classification", desc: "Auto-classify job titles", icon: "🤖", color: "#C0392B" },
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => setTab(item.tab)}
                className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ background: "#0F1E2F", border: `1px solid ${item.color}33` }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "#EDF2F7" }}>
                  {item.label}
                </div>
                <div className="text-xs" style={{ color: "#6B7FA3" }}>
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#6B7FA3" }}>
            Discipline Groups
          </div>
          <div className="space-y-3">
            {[
              { group: "Design", count: 5, color: "#1A6FD4", disciplines: ["Architecture", "Structural Engineering", "MEP Engineering", "Civil & Landscape", "Interior & Lighting Design"] },
              { group: "Specialist", count: 4, color: "#6B3FA0", disciplines: ["AEC Specialists", "Technical / Spec Writer", "Document Management", "BIM/CAD/VDC Specialists"] },
              { group: "Construction", count: 3, color: "#C0392B", disciplines: ["Construction Management", "Cost Estimator", "Building Trades"] },
              { group: "Business", count: 2, color: "#E07B27", disciplines: ["BD / MBA", "Marketing"] },
            ].map((g) => (
              <div
                key={g.group}
                className="p-4 rounded-xl"
                style={{ background: "#0F1E2F", border: `1px solid ${g.color}33` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm" style={{ color: g.color }}>
                    {g.group}
                  </div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: g.color + "22", color: g.color }}
                  >
                    {g.count} disciplines
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.disciplines.map((d) => (
                    <Tag key={d} label={d} color={g.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ background: "linear-gradient(135deg, #1A2E45 0%, #0D1B2A 100%)", border: "1px solid #1A6FD444" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "#6B7FA3" }}>
              Platform Intelligence
            </div>
            <div className="font-semibold" style={{ color: "#EDF2F7" }}>
              Key Capabilities
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Model Viewing", icon: "🔍", desc: "3D model visualization for RVT, DWG, IFC" },
            { label: "RFI Tracking", icon: "📝", desc: "Request for Information lifecycle management" },
            { label: "Change Orders", icon: "🔄", desc: "Tracked, approved, and distributed" },
            { label: "Bid Management", icon: "🏷", desc: "Plan room, blind bidding, bid analysis" },
            { label: "Progress Reporting", icon: "📊", desc: "Real-time field and office progress" },
            { label: "Document Control", icon: "📁", desc: "Version control and distribution logs" },
            { label: "Content Library", icon: "🗂", desc: "Marketing templates and firm media" },
            { label: "Role-Based Access", icon: "🔐", desc: "Dynamic groups with project templates" },
            { label: "AI Classification", icon: "🤖", desc: "Auto-assign personas from job titles" },
          ].map((cap) => (
            <div
              key={cap.label}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ background: "#0D1B2A66" }}
            >
              <span className="text-xl">{cap.icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#EDF2F7" }}>
                  {cap.label}
                </div>
                <div className="text-xs" style={{ color: "#6B7FA3" }}>
                  {cap.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "disciplines", label: "Disciplines" },
  { id: "roles", label: "Roles" },
  { id: "contracts", label: "Contract Positions" },
  { id: "personas", label: "Personas" },
  { id: "ai", label: "AI Engine" },
];

export default function App() {
  const [tab, setTab] = useState("overview");

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A1525", fontFamily: "var(--font-sans)" }}
    >
      {/* Header */}
      <header
        style={{
          background: "#0D1B2A",
          borderBottom: "1px solid #1A2E45",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: "#1A2E45", border: "1px solid #2B4070" }}
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                  style={{ background: "#1A6FD4", color: "#fff" }}
                >
                  A
                </div>
                <span className="text-sm font-semibold tracking-wide" style={{ color: "#EDF2F7" }}>
                  AEC Platform
                </span>
              </div>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: "#1D7A4A22", color: "#4ADE80", border: "1px solid #1D7A4A44" }}
              >
                Persona Engine v2.4
              </span>
            </div>

            <nav className="flex gap-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: tab === t.id ? "#1A6FD422" : "transparent",
                    color: tab === t.id ? "#93C5FD" : "#6B7FA3",
                    border: `1px solid ${tab === t.id ? "#1A6FD455" : "transparent"}`,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div
                className="text-xs font-mono px-3 py-1.5 rounded-lg"
                style={{ background: "#1A2E45", color: "#6B7FA3", border: "1px solid #243B55" }}
              >
                Windows · Mac
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: "#1A6FD4", color: "#fff" }}
              >
                JB
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        {tab === "overview" && <OverviewView setTab={setTab} />}
        {tab === "disciplines" && <DisciplinesView />}
        {tab === "roles" && <RolesView />}
        {tab === "contracts" && <ContractPositionsView />}
        {tab === "personas" && <PersonaView />}
        {tab === "ai" && <AIView />}
      </main>
    </div>
  );
}
