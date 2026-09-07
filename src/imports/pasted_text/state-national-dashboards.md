Design a complete, high-fidelity web dashboard UI for a Government of India platform called **“Sahyog AI”**.

### PROJECT CONTEXT

Sahyog AI is an AI-powered dynamic mental-health monitoring and distress-prediction platform for survivors of atrocities.

I am designing the **Officer Interface**, specifically the **STATE and NATIONAL level dashboards**.

The interface is used by government officials and senior administrators. These users need evidence, accountability, explainable AI, resource-allocation insights and actionable information rather than a generic analytics dashboard.

IMPORTANT:

* Do NOT design the victim/survivor interface.
* Do NOT design the therapist interface.
* Focus ONLY on State-level and National-level officer dashboards and all supporting pages/modals needed to make those dashboards feel like a complete real government product.
* State and National dashboards should share the same design system but must NOT look identical.
* State = operational resource allocation and district comparison.
* National = strategic policy, budget and nationwide impact analysis.

---

# DESIGN LANGUAGE

Create a premium, trustworthy, modern Indian government digital platform.

Visual direction:

* Professional government SaaS dashboard
* Clean, calm and highly legible
* Data-dense but not cluttered
* Serious without feeling intimidating
* Modern enough for a Smart India Hackathon demonstration
* Strong information hierarchy
* Accessible contrast
* Spacious cards and tables
* Subtle borders and shadows
* Minimal decorative elements

Use a sophisticated neutral interface with restrained government-inspired colors.

Suggested palette:

* Deep navy / blue for primary navigation and trust
* White / very light neutral backgrounds
* Muted slate for secondary text
* Green for positive outcomes
* Amber/yellow for medium-priority conditions
* Red only for critical/high-risk alerts
* Avoid excessive red throughout the dashboard

Typography:

* Use Inter or a similar highly readable modern sans-serif.
* Strong hierarchy between page title, section title, KPI, labels and metadata.
* Numbers should be visually prominent.
* Use compact typography for data tables.

Use Lucide-style icons.

Design desktop-first at approximately 1440px width, while keeping the layout responsive.

---

# GLOBAL APP SHELL

Create a reusable application shell used across all State and National pages.

LEFT SIDEBAR:

* Sahyog AI logo
* Ministry of Social Justice & Empowerment
* Dashboard
* Districts / States
* Victims & Cases
* Alerts
* Analytics
* Resource Allocation
* Case Progress
* Reports
* Policy Insights
* Settings

At the bottom:

* Help & Support
* Logged-in official profile
* Role label
* Logout

TOP BAR:

* Breadcrumb
* Current jurisdiction
* Global search
* Date range selector
* Notification bell
* Language selector: English / Hindi
* User profile menu

Include a jurisdiction switcher:
“National”
“State: Maharashtra”
“District: Pune”

For the State experience, the selected state should be clearly visible.

For the National experience, “India — National Overview” should be visible.

---

# GLOBAL COMPONENTS

Create reusable components for:

* KPI cards
* Trend indicators
* Sparklines
* Data tables
* Filter bars
* Dropdowns
* Date range picker
* Tabs
* Alert badges
* Status badges
* Charts
* Map containers
* Empty states
* Loading states
* Error states
* Toast notifications
* Confirmation modals
* Export buttons
* Search
* Pagination
* Tooltips
* AI insight cards
* Audit log entries

Every important metric should have an information tooltip explaining what it means.

---

# PAGE 1 — STATE DASHBOARD

Page title:
**State Overview**

Subtitle:
“Monitoring distress trends, case progress and resource requirements across Maharashtra”

Top-right:

* Last updated: “2 minutes ago”
* Refresh
* Export Report

### KPI ROW

Create 5 KPI cards:

1. Total Beneficiaries
   12,482
   +8.4% vs previous month

2. High Risk
   1,284
   -5.2% vs previous month

3. Medium Risk
   3,761
   +2.1%

4. Intervention Coverage
   78.4%
   +6.8%

5. Average Distress Score
   46.8
   ↓ 3.4%

Each card should contain:

* Icon
* Main metric
* Comparison period
* Small sparkline
* Trend arrow
* Tooltip

Do not make the dashboard feel like a financial dashboard. These metrics represent human wellbeing.

---

# PAGE 1 — STATE MAP

Large central section:

**District Distress Overview**

Interactive Maharashtra map.

Show districts using a subtle heatmap:

* Green = lower distress
* Yellow = moderate
* Red = high

Map controls:

* Zoom
* Reset
* Full screen
* Legend
* Map / satellite toggle

When hovering over a district show:

“Pune”
“1,842 beneficiaries”
“High-risk: 184”
“Average distress: 62”
“Intervention coverage: 81%”

Clicking a district opens the District Detail page.

Beside or below the map show:
**State Attention Required**

List the top 5 districts requiring intervention.

Example:

1. Nagpur — Critical
2. Pune — High
3. Nashik — High
4. Aurangabad — Medium
5. Thane — Medium

Each item should have:

* Risk badge
* Distress score
* Change percentage
* “View district” action

---

# PAGE 2 — DISTRICT COMPARISON

Create a dedicated page:

**District Performance**

A large sortable/filterable table.

Columns:

* Rank
* District
* Total Beneficiaries
* High Risk %
* Average Distress
* Intervention Coverage
* Success Rate
* Active Cases
* Trend
* Action

Include:

* Search district
* Risk filter
* Score range
* Date range
* Sort
* Export

Rows should have subtle risk indicators.

Clicking a district opens the District Detail page.

Include a side panel:
**What needs attention?**

Example:
“3 districts have shown a sustained increase in distress over the last 30 days.”

---

# PAGE 3 — DISTRICT DETAIL

Create a detailed State official view for one district.

Header:
**Pune District**
“State of Maharashtra”

Actions:

* Export district report
* View alerts
* Contact district administration

KPI cards:

* Total beneficiaries
* High-risk cases
* Average distress
* Intervention coverage
* Success rate

Sections:

### Distress Trend

30/90-day line chart.

### Risk Distribution

Donut/pie chart:
Low / Medium / High / Critical

### Intervention Outcomes

Before vs After bar chart.

### Case Progress

Pipeline:
FIR → Investigation → Trial → Judgment → Conviction

### Recent Alerts

List of high-priority cases.

### District Resource Status

Counselors:
Required: 42
Available: 31
Gap: 11

Medical support:
Required: 18
Available: 15

Legal support:
Required: 24
Available: 19

Use clear gap indicators.

---

# PAGE 4 — RESOURCE ALLOCATION

Page title:
**Resource Allocation**

Purpose: Help State officials decide where counselors, legal support and other resources are needed.

Create:

### Resource Gap Overview

Cards:

* Counselors required
* Counselors deployed
* Current gap
* Districts with critical shortage

Main visualization:
**Counselor Requirement vs Availability by District**

Use horizontal bars.

Second visualization:
**Resource Coverage Map**

Show districts according to resource shortage.

Create a recommendation panel:

**AI Resource Recommendation**

Example:
“Based on distress trends, active caseload and intervention coverage, Pune and Nagpur require additional counselor capacity.”

Show:

* Recommendation
* Supporting evidence
* Confidence
* Suggested allocation
* “Review recommendation”

IMPORTANT:
AI recommendations must never appear as unquestionable decisions.

Use wording such as:
“AI-assisted recommendation”
“Review required”
“Based on available data”

---

# PAGE 5 — CASE PROGRESS

Page title:
**Case Progress**

Create a statewide legal/case-progress monitoring dashboard.

Main pipeline:
FIR
↓
Investigation
↓
Chargesheet
↓
Trial
↓
Judgment
↓
Conviction

Show number of cases at each stage.

Include:

* Average time at each stage
* Cases delayed
* Cases requiring attention

Create a trend chart showing case progression over time.

Create a table:

Case ID
District
Case Type
Current Stage
Days in Stage
Status
Last Update
Action

Keep all identities masked.

---

# PAGE 6 — STATE ANALYTICS

Page title:
**State Analytics**

Include:

### Monthly Distress Trend

Line chart showing average distress score over time.

### Case Type Distribution

Rape
Murder
Arson
Physical Assault
Threat / Intimidation
Other

### Intervention Success Rate

Before vs After comparison.

### District Trend Comparison

Multi-line chart.

### Risk Distribution

Low / Medium / High / Critical.

Add date and district filters.

---

# PAGE 7 — STATE ALERTS

Page title:
**Alerts & Attention**

Create a professional alert management interface.

Tabs:

* All
* Critical
* High
* Medium
* Acknowledged

Each alert card/table row should contain:

Case ID
District
Distress Score
Reason
Time
Priority
Status
Actions

Example:

“Case #A-2847”
“Distress Score: 84”
“High”
“Score increased by 22 points in 7 days”

Actions:

* View details
* Acknowledge
* Assign
* Escalate
* Dismiss

When dismissing, require a reason.

Every action should show an audit timestamp.

---

# PAGE 8 — STATE VICTIM / CASE DETAIL

Create a privacy-conscious case detail page accessible from alerts and district tables.

Header:
**Case #A-2847**

Display:

* Masked name
* Age
* District
* Case type
* Case status
* Current distress score

Main section:

### Distress Score Timeline

7 / 30 / 90 day views.

### WHY THIS SCORE?

Create an Explainable AI panel.

Example:

Distress Score: **84**

Contributing factors:

Threat-related keywords
+15

Negative mood indicators
+10

Reduced response frequency
+7

Reported fear
+12

Recent missed check-ins
+5

Show this as a clean SHAP-style contribution visualization.

Below:

**AI explanation**

“The score increased primarily because the survivor reported a recent threat, showed increased fear-related language and had reduced engagement over the last week.”

Add:
“AI-generated explanation”
“Confidence: 91%”
“Human review required”

Never present the AI prediction as a diagnosis.

---

# PAGE 9 — CASE INTERVENTIONS

Within the case detail experience, create:

**Recommended Interventions**

Cards:

* Counseling follow-up
* Legal aid
* Medical support
* Witness protection
* Relocation support
* District officer visit

Each recommendation contains:

* Why it was recommended
* Evidence
* Priority
* Responsible department
* Status

Buttons:

* Assign
* Approve
* Modify
* Reject

For Reject:
require a reason.

Create:
**Intervention History**

Timeline showing:
Date
Action
Officer
Department
Outcome

---

# PAGE 10 — NATIONAL DASHBOARD

Now create a separate strategic National dashboard.

Page title:

**National Overview**

Subtitle:
“National mental wellbeing, case progress and intervention intelligence”

Top-right:

* India
* Last updated
* Export Parliamentary Report

### NATIONAL KPI CARDS

1. Total Beneficiaries
2. Active Cases
3. Average Distress Score
4. Intervention Coverage
5. High-Risk Cases
6. States Requiring Attention

Each includes trend vs previous year.

---

# NATIONAL HERO — INDIA MAP

Create a large India map as the hero visualization.

Title:
**National Distress Overview**

State-level heatmap.

States should be clickable.

Hover card:
State
Beneficiaries
High-risk %
Average distress
Intervention coverage
Trend

Clicking a state opens its State Overview.

Include a clean legend.

The India map should visually dominate the page without overwhelming other information.

---

# PAGE 11 — NATIONAL TRENDS

Page title:
**National Trends**

Create:

### Year-over-Year Distress

Current year vs previous year.

### State Comparison

Rank states by:

* Average distress
* High-risk percentage
* Intervention coverage
* Success rate

### Monthly National Trend

Show long-term trend.

Include filters:

* Year
* State
* Case type
* Risk level

---

# PAGE 12 — POLICY INSIGHTS

Page title:
**Policy Insights**

Create an AI-assisted strategic insight interface.

Example card:

**Increase counselor capacity in Maharashtra**

Reason:
“Maharashtra has experienced a sustained increase in high-risk cases while counselor availability remains below estimated requirement.”

Evidence:

* +12% high-risk cases
* 68% counselor coverage
* 4 districts above critical threshold

Impact:
“Potential reduction in response time”

Confidence:
87%

Actions:

* Review evidence
* Compare states
* Generate briefing

Clearly label all recommendations as:
**AI-assisted insight — requires human review**

---

# PAGE 13 — NATIONAL RESOURCE & BUDGET

Page title:
**Budget & Resource Utilization**

Create:

### Budget Overview

Allocated
₹240 Cr

Utilized
₹186 Cr

Remaining
₹54 Cr

### State-wise Budget Utilization

Horizontal bar chart.

Table:
State
Allocated
Utilized
Utilization %
Beneficiaries
Cost / Beneficiary

Include anomaly indicators where utilization is unusually high or low.

---

# PAGE 14 — ACT-WISE ANALYTICS

Page title:
**Act-wise Analysis**

Create analytics around cases associated with SC/ST Act provisions.

Show:

* Act / section
* Number of cases
* Average distress
* High-risk %
* Intervention coverage
* Trend

Include a bar chart and trend visualization.

Keep the language neutral, factual and administrative.

---

# PAGE 15 — INTER-MINISTRY SYNC

Page title:
**Inter-Ministry Coordination**

Create integration cards:

MoHFW
Ministry of Health & Family Welfare

MHA
Ministry of Home Affairs

NLCC

Each card:

* Connection status
* Last synchronization
* Data exchanged
* Records synced
* View details

Use badges:
Connected
Syncing
Attention required

Include a synchronization activity timeline.

---

# PAGE 16 — NATIONAL REPORTS

Page title:
**Reports & Briefings**

Create a report library.

Cards:

* Parliamentary Briefing
* National Mental Wellbeing Report
* State Performance Report
* Resource Allocation Report
* Intervention Outcomes Report

Each card:

* Last generated
* Date
* Format
* Generate / Preview / Download

Create a polished **Parliamentary Briefing Preview** modal/page.

It should look like an official government briefing document.

---

# PAGE 17 — GLOBAL SEARCH

Create a full-screen search experience.

Search:
“Search cases, districts, states, reports…”

Results grouped by:

* Cases
* Districts
* States
* Alerts
* Reports

Show masked identities.

Include keyboard shortcut hint:
“Ctrl + K”

---

# PAGE 18 — NOTIFICATION CENTER

Create a notification dropdown and full page.

Categories:

* Critical alerts
* AI insights
* Resource shortages
* Case updates
* Report generation
* System notifications

Each notification:
Icon
Title
Description
Timestamp
Priority
Read/unread state

---

# PAGE 19 — SETTINGS

Create a professional government settings page.

Sections:

Profile
Security
Two-factor authentication
Language
Notifications
Dashboard preferences
Accessibility
Data access
Audit logs

Include:
English / Hindi

Accessibility:

* High contrast
* Font size
* Reduced motion

---

# PAGE 20 — AUDIT LOG

Create an administrative audit page.

Title:
**Audit Trail**

Table:

Timestamp
Official
Action
Case / Resource
Previous State
New State
IP / Session
Status

Filters:
Date
Official
Action
District
Case

Use this to reinforce accountability and defensibility.

---

# IMPORTANT UX RULES

1. The system is a support and governance platform, NOT a surveillance dashboard.

2. Mask survivor identities by default.

3. Avoid unnecessary personally identifiable information.

4. Never use “AI says this person is mentally ill.”

5. Never represent distress prediction as a medical diagnosis.

6. Every important AI prediction must include:

   * Why
   * Evidence
   * Confidence
   * Human review

7. Every alert must support:

   * Acknowledge
   * Assign
   * Escalate
   * Dismiss with reason

8. Every important action should be auditable.

9. Use calm language even for critical alerts.

10. Avoid visual overload.

11. Use progressive disclosure: executives see the summary first and can drill down into evidence.

12. District, State and National levels should feel like different decision-making tools.

---

# STATE VS NATIONAL VISUAL DIFFERENCE

STATE DASHBOARD:

Emphasize:

* District map
* District comparison
* Resource gaps
* Active cases
* Alerts
* Intervention operations

Visual feeling:
**Operational command center**

NATIONAL DASHBOARD:

Emphasize:

* India map
* State comparison
* Long-term trends
* Policy insights
* Budget
* Scheme effectiveness
* Inter-ministry coordination
* Parliamentary reporting

Visual feeling:
**Strategic policy intelligence center**

Do NOT simply duplicate the State dashboard and replace the map with India.

---

# PROTOTYPE FLOW

Design the screens so this clickable prototype flow works:

National Dashboard
→ Click Maharashtra
→ State Dashboard
→ Click Pune
→ District Detail
→ Click Critical Alert
→ Case Detail
→ “Why this score?”
→ Explainable AI panel
→ Recommended Intervention
→ Action logged

Also:

State Dashboard
→ Resource Allocation
→ AI Resource Recommendation
→ Review Evidence
→ Approve / Modify

And:

National Dashboard
→ Policy Insights
→ Review Evidence
→ Generate Parliamentary Briefing

---

# FIGMA OUTPUT REQUIREMENTS

Create:

* High-fidelity screens
* Auto Layout
* Reusable components
* Consistent spacing
* Component variants
* Responsive layouts
* Interactive prototype connections
* Hover states
* Selected states
* Loading states
* Empty states
* Error states
* Confirmation modals
* Tooltips
* Dropdown states
* Table pagination
* Chart legends

Create a small design system page containing:

* Colors
* Typography
* Spacing
* Buttons
* Inputs
* Cards
* Badges
* Tables
* Navigation
* Charts
* Alerts
* AI insight components

Use realistic but clearly **synthetic/demo data**.

Do not use real survivor names, real case numbers or real sensitive information.

The final result should look like a **production-ready Government of India administrative platform**, suitable for a Smart India Hackathon 2026 demo and presentation to senior government officials.

The overall experience should communicate:

**Trust → Evidence → Explainability → Decision → Action → Auditability**

Make the interface polished enough that screenshots can be directly used in the hackathon presentation.
