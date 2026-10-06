import { useState } from "react";
import "./Sidebar.css";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  GitBranch,
  Plus,
  CircleHelp,
  ChevronLeft,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import juristaxLogo from "../../assets/logo.png";
import ConfigIcon from "../icons/configIcon";

const Item = ({ page, label, icon: Icon, child = false }) => {
  const { page: current, navigate, role } = useApp();
  const allowed =
    (role === "preparer" &&
      ["dashboard", "assessment", "filings"].includes(page)) ||
    (role === "approver" && ["dashboard", "filings"].includes(page)) ||
    (role === "admin" &&
      [
        "dashboard",
        "admin-mappings",
        "admin-filings",
        "admin-sections",
        "admin-guidance",
        "settings",
      ].includes(page));

  if (!allowed) return null;

  return (
    <button
      className={`sb-item tooltip ${child ? "sb-child" : ""} ${current === page ? "active" : ""}`}
      data-tooltip={label}
      onClick={() => navigate(page)}
    >
      <Icon size={child ? 17 : 19} />
      <span className="lbl">{label}</span>
    </button>
  );
};

const ROLE_OPTIONS = [
  ["preparer", "User"],
  ["approver", "Approver"],
  ["admin", "Admin"],
];

const roleLabel = (role) =>
  role === "preparer"
    ? "Compliance Preparer"
    : role === "approver"
      ? "Compliance Approver"
      : "Administrator";

export default function Sidebar({ onChangeRole }) {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    role,
    profileOpen,
    setProfileOpen,
  } = useApp();
  const [configureOpen, setConfigureOpen] = useState(true);

  return (
    <nav className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sb-head tooltip" data-tooltip={"Open sidebar"}>
        <div className="sb-logo">
          {" "}
          <img src={juristaxLogo} alt="sidebar icon" />
        </div>

        <div className="sb-title">Business Risk Assessment</div>
        <button
          className="sb-toggle"
          onClick={() => setSidebarCollapsed((v) => !v)}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="sb-nav ">
        <Item page="dashboard" label="Dashboard" icon={LayoutDashboard} />
        {role === "preparer" && (
          <Item
            page="assessment"
            label="New Assessment"
            icon={ClipboardCheck}
          />
        )}
        <Item
          page="filings"
          label={role === "approver" ? "Review Queue" : "Filings"}
          icon={FileText}
        />
        {role === "admin" && (
          <>
            <Item page="admin-mappings" label="Mappings" icon={GitBranch} />
            <Item page="admin-filings" label="Filings" icon={FileText} />
            <div className="sb-cat">
              <button
                type="button"
                className="sb-cat-label configure-toggle tooltip"
                onClick={() => setConfigureOpen((prev) => !prev)}
                data-tooltip={"Configure"}
              >
                <ConfigIcon
                  className="configure-icon"
                  // size={24}
                  color="currentColor"
                />

                <span className="lbl">CONFIGURE</span>

                <ChevronDown
                  size={13}
                  className={`configure-arrow ${configureOpen ? "open" : ""}`}
                />
              </button>

              {configureOpen && (
                <>
                  <Item
                    child
                    page="admin-sections"
                    label="Sections & Questions"
                    icon={Plus}
                  />

                  <Item
                    child
                    page="admin-guidance"
                    label="Guidance"
                    icon={CircleHelp}
                  />

                  <Item
                    child
                    page="settings"
                    label="Settings"
                    icon={Settings}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="sb-bottom">
        <div className="role-switch" aria-label="Demo role switcher">
          {ROLE_OPTIONS.map(([value, label]) => (
            <button
              key={value}
              className={role === value ? "active" : ""}
              onClick={() => onChangeRole?.(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="profile-block">
          <button
            className="profile-btn"
            aria-label="Open profile menu"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <span className="profile-avatar">KA</span>
            <span className="profile-text">
              <span className="profile-name">Kiran Alvarez</span>
              <span className="profile-role">{roleLabel(role)}</span>
            </span>
          </button>

          {profileOpen && (
            <div className="profile-menu show">
              <button
                className="logout-btn"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={15} style={{ margin: " 0 0 0 -6px" }} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
