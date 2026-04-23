import { useMemo, useState } from 'react'
import logo from './assets/srhu-logo.png'
import loginIllustration from './assets/login-illustration.png'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [attendance, setAttendance] = useState([
    { date: '2026-04-20', status: 'Present' },
    { date: '2026-04-21', status: 'Present' },
    { date: '2026-04-22', status: 'Late' },
  ])
  const [leaveBalance, setLeaveBalance] = useState(7)
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: 'Casual Leave', dates: 'Apr 26 - Apr 27', status: 'Pending' },
  ])
  const [leaveType, setLeaveType] = useState('Casual Leave')
  const [leaveDates, setLeaveDates] = useState('')
  const [leaveReason, setLeaveReason] = useState('')
  const [isLeaveFlyoutOpen, setIsLeaveFlyoutOpen] = useState(false)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('')
  const [profile, setProfile] = useState({
    name: 'Sagar Panwar',
    department: 'Administration',
    email: 'vandana.farswan@srhu.edu.in',
    phone: '9876543210',
  })
  const [separation, setSeparation] = useState({
    clearance: false,
    handover: false,
    hrInterview: false,
  })
  const [toastMessage, setToastMessage] = useState('')
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Leave policy updated', time: '10m ago', read: false },
    { id: 2, title: 'Salary slip for March available', time: '2h ago', read: false },
    { id: 3, title: 'Townhall on Friday', time: '1d ago', read: true },
  ])
  const [announcements] = useState([
    {
      id: 1,
      title: 'NAAC Preparation Drive',
      audience: 'All Departments',
      date: 'Apr 24, 2026',
      content: 'Please submit your department documentation by end of this week.',
    },
    {
      id: 2,
      title: 'New Academic Session Readiness',
      audience: 'Admin and HR',
      date: 'Apr 28, 2026',
      content: 'Checklist for onboarding and infrastructure readiness is now available.',
    },
  ])
  const [approvals, setApprovals] = useState([
    { id: 1, employee: 'Priya Rawat', type: 'Leave Request', detail: 'May 2 - May 4', status: 'Pending' },
    { id: 2, employee: 'Arjun Negi', type: 'Attendance Regularization', detail: 'Apr 18', status: 'Pending' },
    { id: 3, employee: 'Neha Bisht', type: 'Reimbursement', detail: 'Conference travel', status: 'Pending' },
  ])
  const [documentSearch, setDocumentSearch] = useState('')
  const [documents] = useState([
    { id: 1, name: 'Leave Policy 2026', category: 'Policy', updated: 'Apr 2026' },
    { id: 2, name: 'Code of Conduct', category: 'Policy', updated: 'Jan 2026' },
    { id: 3, name: 'Medical Reimbursement Form', category: 'Form', updated: 'Feb 2026' },
    { id: 4, name: 'NOC Request Form', category: 'Form', updated: 'Mar 2026' },
  ])
  const [viewMode, setViewMode] = useState('Employee')
  const [showcaseRole, setShowcaseRole] = useState('Employee')
  const [dashboardRole, setDashboardRole] = useState('Employee')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const menuItems = useMemo(
    () => [
      { label: 'Dashboard' },
      { label: 'Employee Information'},
      { label: 'Employee Self Service' },
      { label: 'Separation' },
      { label: 'Approvals Center' },
      { label: 'Documents & Policies' },
      { label: 'Reports & Analytics' },
      { label: 'Role Feature Showcase' },
    ],
    [],
  )

  const calendarDays = useMemo(() => {
    const daysInMonth = 30
    const startOffset = 3
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1
      return {
        label: day,
        isoDate: `2026-04-${String(day).padStart(2, '0')}`,
      }
    }).reduce(
      (acc, current, index) => {
        if (index === 0) {
          acc.push(...Array.from({ length: startOffset }, () => null))
        }
        acc.push(current)
        return acc
      },
      [],
    )
  }, [])

  const presentDays = attendance.filter((item) => item.status === 'Present').length

  const statCards = [
    { title: 'My Attendance', value: `${presentDays}/${attendance.length}`, note: 'This week' },
    { title: 'My Leaves', value: `${leaveBalance}`, note: 'Available balance' },
    { title: 'Tasks', value: `${approvals.filter((item) => item.status === 'Pending').length}`, note: 'Pending approvals' },
    { title: 'Notifications', value: `${notifications.filter((item) => !item.read).length}`, note: 'Unread updates' },
  ]

  const reportCards = [
    { name: 'Attendance Compliance', value: 93 },
    { name: 'Leave Utilization', value: 68 },
    { name: 'Resolution SLA', value: 84 },
    { name: 'Profile Completion', value: 78 },
  ]

  const dashboardGraphData = {
    Employee: {
      bars: [78, 64, 88, 72, 81],
      trend: [52, 58, 56, 62, 67, 73, 79],
      donut: 84,
      barLabel: 'Weekly Productivity',
      trendLabel: 'Attendance Trend',
      donutLabel: 'Goal Achievement',
    },
    HR: {
      bars: [66, 74, 83, 77, 69],
      trend: [48, 54, 59, 61, 66, 69, 75],
      donut: 71,
      barLabel: 'Hiring Pipeline',
      trendLabel: 'Employee Engagement',
      donutLabel: 'Onboarding Completion',
    },
    Admin: {
      bars: [82, 86, 79, 91, 88],
      trend: [60, 64, 68, 66, 72, 78, 82],
      donut: 89,
      barLabel: 'System Reliability',
      trendLabel: 'Active Usage',
      donutLabel: 'Security Compliance',
    },
  }

  const roleFeatureMap = {
    Employee: {
      sections: [
        {
          title: 'Core Self-Service',
          features: [
            'Personal profile management',
            'Document upload (ID, certificates, contracts)',
            'Payslip access & salary details',
            'Tax declarations and investment proofs',
          ],
        },
        {
          title: 'Attendance & Leave',
          features: [
            'Attendance tracking (check-in/out, timesheets)',
            'Leave application and leave balance',
            'Holiday calendar',
          ],
        },
        {
          title: 'Performance & Growth',
          features: [
            'Performance reviews & feedback',
            'Goal setting (OKRs/KPIs)',
            'Training and skill tracking',
          ],
        },
        {
          title: 'Communication & Requests',
          features: [
            'Internal announcements',
            'Raise IT/HR tickets',
            'Reimbursement claims',
            'Approval requests (shift/remote work)',
          ],
        },
      ],
    },
    HR: {
      sections: [
        {
          title: 'Employee Lifecycle Management',
          features: [
            'Recruitment tracking (ATS integration)',
            'Onboarding workflows',
            'Offboarding/separation management',
            'Employee database management',
          ],
        },
        {
          title: 'Payroll & Compensation',
          features: [
            'Salary structure configuration',
            'Payroll processing automation',
            'Tax computation and compliance',
            'Bonus, incentives, deductions',
          ],
        },
        {
          title: 'Attendance & Leave Oversight',
          features: [
            'Attendance policy setup',
            'Leave policy management',
            'Shift scheduling and overtime tracking',
          ],
        },
        {
          title: 'Performance, Compliance & Culture',
          features: [
            'Appraisal cycles and 360 feedback',
            'Labor law compliance and audit trails',
            'Surveys, recognition programs, events',
          ],
        },
      ],
    },
    Admin: {
      sections: [
        {
          title: 'System Configuration',
          features: [
            'Role-based access control (RBAC)',
            'Workflow customization',
            'Organization hierarchy setup',
            'Department/designation structuring',
          ],
        },
        {
          title: 'User & Access Management',
          features: [
            'Create/manage users and roles',
            'Permissions and access levels',
            'Single Sign-On (SSO) integration',
          ],
        },
        {
          title: 'Data, Security & Integrations',
          features: [
            'Data encryption and backups',
            'Audit logs and activity tracking',
            'Third-party/API/biometric integrations',
          ],
        },
        {
          title: 'Reporting & Maintenance',
          features: [
            'Custom dashboards and analytics',
            'Exportable reports (CSV/PDF)',
            'Portal branding and notification settings',
            'Performance monitoring',
          ],
        },
      ],
    },
    Common: {
      sections: [
        {
          title: 'Cross-Role Features',
          features: [
            'Dashboard overview with KPIs and alerts',
            'Notifications and reminders',
            'Mobile accessibility',
            'Search and filtering',
            'Multi-language support',
          ],
        },
      ],
    },
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2500)
  }

  const getMenuIcon = (label) => {
    const commonProps = { viewBox: '0 0 24 24', className: 'menu-svg-icon' }

    switch (label) {
      case 'Dashboard':
        return <svg {...commonProps}><path d="M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h5v8H3v-8Zm7 4h11v4H10v-4Z" fill="currentColor" /></svg>
      case 'Employee Information':
        return <svg {...commonProps}><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.5 0-7 1.7-7 4v2h14v-2c0-2.3-3.5-4-7-4Z" fill="currentColor" /></svg>
      case 'Employee Self Service':
        return <svg {...commonProps}><path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6l-8-4Zm-1 14-3-3 1.4-1.4 1.6 1.6 3.6-3.6L16 11l-5 5Z" fill="currentColor" /></svg>
      case 'Profile':
        return <svg {...commonProps}><path d="M12 3a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 12 3Zm0 11c-4 0-7.5 2-7.5 4.5V21h15v-2.5C19.5 16 16 14 12 14Z" fill="currentColor" /></svg>
      case 'Separation':
        return <svg {...commonProps}><path d="M5 4h14l-1 16H6L5 4Zm3 3v2h8V7H8Z" fill="currentColor" /></svg>
      case 'Approvals Center':
        return <svg {...commonProps}><path d="M5 3h14v18H5V3Zm3 4v2h8V7H8Zm0 4v2h8v-2H8Zm0 4v2h5v-2H8Z" fill="currentColor" /></svg>
      case 'Documents & Policies':
        return <svg {...commonProps}><path d="M7 3h7l5 5v13H7V3Zm7 1.5V9h4.5L14 4.5Z" fill="currentColor" /></svg>
      case 'Reports & Analytics':
        return <svg {...commonProps}><path d="M4 19h16v2H4v-2Zm2-2V9h3v8H6Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" /></svg>
      case 'Role Feature Showcase':
        return <svg {...commonProps}><path d="M12 2 2 7l10 5 8-4v6h2V7L12 2Zm-6 9v4c0 2.8 3 5 6 5s6-2.2 6-5v-4l-6 3-6-3Z" fill="currentColor" /></svg>
      default:
        return <svg {...commonProps}><circle cx="12" cy="12" r="8" fill="currentColor" /></svg>
    }
  }

  const markAttendance = () => {
    const today = new Date().toISOString().slice(0, 10)
    const alreadyMarked = attendance.some((entry) => entry.date === today)
    if (alreadyMarked) {
      showToast('Attendance already marked for today.')
      return
    }
    setAttendance((prev) => [{ date: today, status: 'Present' }, ...prev])
    showToast('Attendance marked successfully.')
  }

  const submitLeaveRequest = (event) => {
    event.preventDefault()
    if (!leaveDates.trim()) {
      showToast('Please add leave dates before submitting.')
      return
    }
    const newRequest = {
      id: Date.now(),
      type: leaveType,
      dates: leaveDates,
      status: 'Pending',
    }
    setLeaveRequests((prev) => [newRequest, ...prev])
    setLeaveBalance((prev) => Math.max(prev - 1, 0))
    setLeaveDates('')
    setLeaveReason('')
    setIsLeaveFlyoutOpen(false)
    showToast('Leave request submitted for approval.')
  }

  const openLeaveFlyout = (isoDate) => {
    setSelectedCalendarDate(isoDate)
    setLeaveDates(isoDate)
    setIsLeaveFlyoutOpen(true)
  }

  const updateApprovalStatus = (id, status) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
    showToast(`Request ${status.toLowerCase()}.`)
  }

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }

  const filteredDocuments = documents.filter((item) =>
    item.name.toLowerCase().includes(documentSearch.toLowerCase()),
  )

  const renderMainContent = () => {
    if (activeMenu === 'Employee Information' || activeMenu === 'Menu 1') {
      return (
        <section className="feature-card">
          <h3>Employee Information</h3>
          <div className="info-grid">
            <p>
              <strong>Employee ID:</strong> SRHU-6230
            </p>
            <p>
              <strong>Department:</strong> {profile.department}
            </p>
            <p>
              <strong>Designation:</strong> Senior Executive
            </p>
            <p>
              <strong>Reporting Manager:</strong> Registrar Office
            </p>
          </div>
        </section>
      )
    }

    if (activeMenu === 'Employee Self Service') {
      return (
        <div className="feature-stack">
          <section className="feature-card">
            <h3>My Attendance</h3>
            <button className="primary-btn" onClick={markAttendance}>
              Mark Today Attendance
            </button>
            <div className="list-table">
              {attendance.map((entry) => (
                <div key={entry.date} className="list-row">
                  <span>{entry.date}</span>
                  <span>{entry.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="feature-card">
            <h3>My Leaves</h3>
            <form className="leave-form" onSubmit={submitLeaveRequest}>
              <select value={leaveType} onChange={(event) => setLeaveType(event.target.value)}>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
              <input
                placeholder="Date range (e.g. May 2 - May 4)"
                value={leaveDates}
                onChange={(event) => setLeaveDates(event.target.value)}
              />
              <button type="submit">Apply Leave</button>
            </form>
            <div className="list-table">
              {leaveRequests.map((request) => (
                <div key={request.id} className="list-row">
                  <span>{request.type}</span>
                  <span>{request.dates}</span>
                  <span>{request.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )
    }

    if (activeMenu === 'Profile') {
      return (
        <section className="feature-card">
          <h3>Profile</h3>
          <div className="profile-form">
            <label>
              Full Name
              <input
                value={profile.name}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </label>
            <label>
              Email
              <input
                value={profile.email}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </label>
            <label>
              Phone
              <input
                value={profile.phone}
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </label>
          </div>
          <button className="primary-btn" onClick={() => showToast('Profile changes saved.')}>
            Save Profile
          </button>
        </section>
      )
    }

    if (activeMenu === 'Separation') {
      return (
        <section className="feature-card">
          <h3>Separation Workflow</h3>
          <div className="checklist">
            {Object.keys(separation).map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={separation[item]}
                  onChange={(event) =>
                    setSeparation((prev) => ({
                      ...prev,
                      [item]: event.target.checked,
                    }))
                  }
                />
                {item}
              </label>
            ))}
          </div>
          <button className="primary-btn" onClick={() => showToast('Separation checklist submitted.')}>
            Submit Checklist
          </button>
        </section>
      )
    }

    if (activeMenu === 'Notifications') {
      return (
        <section className="feature-card">
          <h3>Notifications</h3>
          <div className="list-table">
            {notifications.map((item) => (
              <div key={item.id} className={item.read ? 'list-row notification-row' : 'list-row notification-row unread'}>
                <span>{item.title}</span>
                <span>{item.time}</span>
                <button className="ghost-btn" onClick={() => markNotificationRead(item.id)}>
                  Mark Read
                </button>
              </div>
            ))}
          </div>
        </section>
      )
    }

    if (activeMenu === 'Announcements') {
      return (
        <section className="feature-card">
          <h3>Announcements</h3>
          <div className="announcement-grid">
            {announcements.map((item) => (
              <article key={item.id} className="announcement-card">
                <p className="eyebrow">{item.date}</p>
                <h4>{item.title}</h4>
                <span className="badge">{item.audience}</span>
                <p>{item.content}</p>
              </article>
            ))}
          </div>
        </section>
      )
    }

    if (activeMenu === 'Approvals Center') {
      return (
        <section className="feature-card">
          <div className="section-head">
            <h3>Approvals Center</h3>
            <div className="quick-links">
              <button onClick={() => setViewMode('Employee')}>Employee View</button>
              <button onClick={() => setViewMode('Manager')}>Manager View</button>
              <button onClick={() => setViewMode('HR')}>HR View</button>
            </div>
          </div>
          <div className="list-table">
            {approvals.map((item) => (
              <div key={item.id} className="list-row approval-row">
                <span>{item.employee}</span>
                <span>{item.type}</span>
                <span>{item.detail}</span>
                <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
                <div className="action-row">
                  <button className="ghost-btn" onClick={() => updateApprovalStatus(item.id, 'Approved')}>
                    Approve
                  </button>
                  <button className="ghost-btn danger" onClick={() => updateApprovalStatus(item.id, 'Rejected')}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="helper-text">Current preview mode: {viewMode}</p>
        </section>
      )
    }

    if (activeMenu === 'Documents & Policies') {
      return (
        <section className="feature-card">
          <h3>Documents & Policies</h3>
          <input
            className="search-input"
            placeholder="Search policy or form..."
            value={documentSearch}
            onChange={(event) => setDocumentSearch(event.target.value)}
          />
          <div className="list-table">
            {filteredDocuments.map((item) => (
              <div key={item.id} className="list-row">
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>{item.updated}</span>
              </div>
            ))}
          </div>
        </section>
      )
    }

    if (activeMenu === 'Reports & Analytics') {
      return (
        <section className="feature-card">
          <h3>Reports & Analytics</h3>
          <div className="report-grid">
            {reportCards.map((report) => (
              <article key={report.name} className="report-card">
                <p>{report.name}</p>
                <strong>{report.value}%</strong>
                <div className="bar-track">
                  <span className="bar-fill" style={{ width: `${report.value}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )
    }

    if (activeMenu === 'Role Feature Showcase') {
      const currentShowcase = roleFeatureMap[showcaseRole]

      return (
        <section className="feature-card">
          <div className="section-head">
            <h3>EMS Role Feature Showcase</h3>
            <span className="badge">Static UI Preview for Client Demo</span>
          </div>
          <p className="helper-text">
            All features are visible in one unified UI for presentation. Later these sections can
            be shown/hidden using RBAC policies.
          </p>

          <div className="role-tabs">
            {Object.keys(roleFeatureMap).map((role) => (
              <button
                key={role}
                className={showcaseRole === role ? 'role-tab active' : 'role-tab'}
                onClick={() => setShowcaseRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="showcase-grid">
            {currentShowcase.sections.map((section) => (
              <article key={section.title} className="showcase-card">
                <h4>{section.title}</h4>
                <ul>
                  {section.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )
    }

    return (
      <>
        <section className="welcome-strip">
          <div>
            <p className="eyebrow">Good afternoon</p>
            <h3>{profile.name}</h3>
            <span>Here is your HR and employee productivity overview.</span>
          </div>
          <div className="completion-chip">
            <strong>78%</strong>
            <span>Profile Completion</span>
          </div>
        </section>

        <div className="quick-links">
          <button onClick={() => setActiveMenu('Employee Self Service')}>Apply Leave</button>
          <button onClick={() => setActiveMenu('Employee Self Service')}>My Attendance</button>
          <button onClick={() => setActiveMenu('Profile')}>My Profile</button>
          <button onClick={() => setActiveMenu('Approvals Center')}>Approvals</button>
          <button onClick={() => setActiveMenu('Reports & Analytics')}>Reports</button>
          <button onClick={() => setActiveMenu('Role Feature Showcase')}>Role Features</button>
        </div>

        <div className="stats-grid">
          {statCards.map((card) => (
            <article key={card.title} className="stat-card">
              <h3>{card.title}</h3>
              <p>{card.value}</p>
              <span>{card.note}</span>
            </article>
          ))}
        </div>

        <section className="feature-card">
          <div className="section-head">
            <h3>Dashboard Insights</h3>
            <div className="role-tabs">
              {Object.keys(dashboardGraphData).map((role) => (
                <button
                  key={role}
                  className={dashboardRole === role ? 'role-tab active' : 'role-tab'}
                  onClick={() => setDashboardRole(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          <div className="dashboard-graph-grid">
            <article className="graph-card">
              <p>{dashboardGraphData[dashboardRole].barLabel}</p>
              <div className="mini-bar-chart">
                {dashboardGraphData[dashboardRole].bars.map((value, index) => (
                  <div key={`${dashboardRole}-bar-${index}`} className="mini-bar-column">
                    <span className="mini-bar-fill" style={{ height: `${value}%` }} />
                  </div>
                ))}
              </div>
            </article>

            <article className="graph-card">
              <p>{dashboardGraphData[dashboardRole].trendLabel}</p>
              <div className="mini-trend-chart">
                {dashboardGraphData[dashboardRole].trend.map((value, index) => (
                  <span
                    key={`${dashboardRole}-trend-${index}`}
                    className="trend-point"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </article>

            <article className="graph-card">
              <p>{dashboardGraphData[dashboardRole].donutLabel}</p>
              <div
                className="mini-donut"
                style={{
                  background: `conic-gradient(var(--srhu-blue) ${dashboardGraphData[dashboardRole].donut}%, #e5edff 0)`,
                }}
              >
                <div className="mini-donut-inner">{dashboardGraphData[dashboardRole].donut}%</div>
              </div>
            </article>
          </div>
        </section>

        <section className="calendar-block">
          <h3>Leave Calendar - April 2026</h3>
          <p className="helper-text">Click any date to open the leave flyout and apply instantly.</p>
          <div className="calendar-weekdays">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div className="calendar-date-grid">
            {calendarDays.map((day, index) =>
              day ? (
                <button
                  key={day.isoDate}
                  className={selectedCalendarDate === day.isoDate ? 'calendar-day active' : 'calendar-day'}
                  onClick={() => openLeaveFlyout(day.isoDate)}
                >
                  {day.label}
                </button>
              ) : (
                <span key={`empty-${index}`} className="calendar-day empty" />
              ),
            )}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className="portal-app">
      {!isLoggedIn ? (
        <main className="login-page">
          <section className="login-shell">
            <section className="login-card">
              <div className="login-card-top">
                <p className="brand-text"></p>
                <div className="login-nav">
                  <a href="https://srhu.edu.in/">Home</a>
                  <a href="#about">About us</a>
                  <a href="#blog">Blog</a>
                  <a href="#pricing">Pricing</a>
                </div>
              </div>

              <div className="login-brand center-text">
                <img src={logo} alt="SRHU logo" className="brand-logo" />
                <h1>life ka compass ...</h1>
                <p>Welcome back! Please login to your account.</p>
              </div>

              <form
                className="login-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  setIsLoggedIn(true)
                }}
              >
                <label htmlFor="userCode">Email Address</label>
                <input id="userCode" type="text" defaultValue="sagar.panwar@srhu.edu.in" />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" defaultValue="************" />

                <div className="login-row">
                  <label className="remember-box">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <button type="button" className="link-btn">
                    Forgot Password?
                  </button>
                </div>

                <div className="login-cta">
                  <button type="submit">Login</button>
                  <button type="button" className="ghost-btn">
                    Sign Up
                  </button>
                </div>
              </form>
            </section>

            <section className="login-illustration-panel">
              <img src={loginIllustration} alt="Illustration" />
            </section>
          </section>
        </main>
      ) : (
        <main
          className={
            isSidebarCollapsed
              ? `dashboard-layout collapsed${isMobileNavOpen ? ' mobile-nav-open' : ''}`
              : `dashboard-layout${isMobileNavOpen ? ' mobile-nav-open' : ''}`
          }
        >
          <aside className={isSidebarCollapsed ? 'sidebar collapsed' : 'sidebar'}>
            <div className="sidebar-brand center-text">
              <img src={logo} alt="SRHU logo" />
              {!isSidebarCollapsed && <p>Himshikhar Portal</p>}
            </div>
            <nav>
              {menuItems.map((item) => (
                <div key={item.label} className="menu-group">
                  <button
                    className={activeMenu === item.label ? 'menu-item active' : 'menu-item'}
                    onClick={() => {
                      setActiveMenu(item.label)
                      setIsMobileNavOpen(false)
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <span className="menu-item-content">
                      <span className="menu-item-icon" aria-hidden="true">
                        {getMenuIcon(item.label)}
                      </span>
                      {!isSidebarCollapsed && <span className="menu-item-label">{item.label}</span>}
                    </span>
                  </button>
                  {!isSidebarCollapsed && item.subItems?.map((subItem) => (
                    <button
                      key={subItem}
                      className={
                        activeMenu === subItem ? 'menu-item submenu active' : 'menu-item submenu'
                      }
                      onClick={() => {
                        setActiveMenu(subItem)
                        setIsMobileNavOpen(false)
                      }}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
            {!isSidebarCollapsed && (
              <div className="sidebar-footer">
                <small>Employee Portal Demo</small>
                <span>SRHU UI concept for client preview</span>
              </div>
            )}
          </aside>

          <section className="dashboard-content">
            <header className="topbar">
              <div>
                <p className="eyebrow">Himshikhar</p>
                <h2>{activeMenu}</h2>
              </div>
              <div className="topbar-actions">
                <button
                  className="icon-btn mobile-nav-trigger"
                  onClick={() => setIsMobileNavOpen((prev) => !prev)}
                  title={isMobileNavOpen ? 'Close navigation' : 'Open navigation'}
                >
                  <span className="icon-glyph" aria-hidden="true">
                    {isMobileNavOpen ? 'x' : '='}
                  </span>
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                  title={isSidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
                >
                  <span className="icon-glyph" aria-hidden="true">
                    {isSidebarCollapsed ? '>' : '<'}
                  </span>
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setActiveMenu('Notifications')}
                  title="Notifications"
                >
                  <span className="icon-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="icon-svg">
                      <path
                        d="M12 3a6 6 0 0 0-6 6v3.2c0 .8-.3 1.5-.8 2.1L4 16h16l-1.2-1.7a3.4 3.4 0 0 1-.8-2.1V9a6 6 0 0 0-6-6Zm0 18a2.8 2.8 0 0 0 2.7-2h-5.4A2.8 2.8 0 0 0 12 21Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/* <span className="icon-label">Notifications</span> */}
                  <span className="count-badge">
                    {notifications.filter((item) => !item.read).length}
                  </span>
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setActiveMenu('Announcements')}
                  title="Announcements"
                >
                  <span className="icon-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="icon-svg">
                      <path
                        d="M3 11.8v.4a1.8 1.8 0 0 0 1.8 1.8H6l1.1 4.1a1.3 1.3 0 0 0 2.5-.7L8.7 14h2.8l6.1 3.1c1 .5 2.4-.2 2.4-1.4V8.3c0-1.2-1.3-2-2.4-1.4L11.5 10H4.8A1.8 1.8 0 0 0 3 11.8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/* <span className="icon-label">Announcements</span> */}
                </button>
                <button
                  className="icon-btn"
                  onClick={() => setActiveMenu('Profile')}
                  title="Profile"
                >
                  <span className="icon-glyph" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="icon-svg">
                      <path
                        d="M12 3a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 12 3Zm0 11c-4 0-7.5 2-7.5 4.5V21h15v-2.5C19.5 16 16 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsMobileNavOpen(false)
                  }}
                >
                  Logout
                </button>
              </div>
            </header>
            {renderMainContent()}
          </section>
        </main>
      )}
      {isMobileNavOpen && isLoggedIn && (
        <button
          className="mobile-nav-overlay"
          onClick={() => setIsMobileNavOpen(false)}
          aria-label="Close menu"
        />
      )}
      {isLeaveFlyoutOpen && (
        <>
          <button
            className="flyout-overlay"
            onClick={() => setIsLeaveFlyoutOpen(false)}
            aria-label="Close leave flyout"
          />
          <aside className="leave-flyout">
            <div className="leave-flyout-head">
              <h3>Apply Leave</h3>
              <button className="ghost-btn" onClick={() => setIsLeaveFlyoutOpen(false)}>
                Close
              </button>
            </div>
            <p className="helper-text">Selected date: {selectedCalendarDate}</p>
            <form className="profile-form" onSubmit={submitLeaveRequest}>
              <label>
                Leave Type
                <select value={leaveType} onChange={(event) => setLeaveType(event.target.value)}>
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                </select>
              </label>
              <label>
                Leave Date / Range
                <input
                  value={leaveDates}
                  onChange={(event) => setLeaveDates(event.target.value)}
                  placeholder="2026-04-18 or 2026-04-18 to 2026-04-20"
                />
              </label>
              <label>
                Reason
                <input
                  value={leaveReason}
                  onChange={(event) => setLeaveReason(event.target.value)}
                  placeholder="Brief reason for leave"
                />
              </label>
              <button className="primary-btn" type="submit">
                Submit Leave Request
              </button>
            </form>
          </aside>
        </>
      )}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  )
}

export default App
