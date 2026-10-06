import { useEffect, useRef} from 'react';
import './Topbar.css'
import { Bell, Settings, X } from 'lucide-react';
import { PAGE_META, NOTIFICATIONS } from '../../data/riskData';
import { useApp } from '../../context/AppContext';

const ADMIN_META = {
  'admin-mappings': ['Mappings', 'Assign approvers to preparers and control routing'],
  'admin-filings': ['Filings', 'Read-only oversight of filing ownership and routing'],
  'admin-sections': ['Sections & Questions', 'Maintain the administrator copy of the assessment form'],
  'admin-guidance': ['Guidance', 'Maintain methodology and legal framework guidance'],
  'admin-mapping': ['Risk Mapping', 'Manage score-to-level mapping used by the workspace'],
};

export default function Topbar() {

  const notifRef = useRef(null);

  const { role, page, notificationsOpen, setNotificationsOpen, navigate, filings, reviewFilingId} = useApp();

  let [title, sub] = PAGE_META[page]?.[role] || ['', ''];

  if (page === 'assessment') {
    title = 'New Assessment';
    sub = 'Complete the business risk assessment';
  }


  if (page === 'reviewForm') {
    const f = filings.find((x) => x.id === reviewFilingId);
    if (f) {
      title = f.entity;
      sub = `${f.type} Assessment · ${f.period} · Prepared by ${f.preparer}`;
    }
  }

  if (page === 'settings') {
    title = 'Settings';
    sub = 'Manage your profile, notifications, and appearance';
  }

  if (ADMIN_META[page]) [title, sub] = ADMIN_META[page];

  const notes = NOTIFICATIONS[role] || [];

  useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      notifRef.current &&
      !notifRef.current.contains(event.target)
    ) {
      setNotificationsOpen(false);
    }
  };

  if (notificationsOpen) {
    document.addEventListener("mousedown", handleOutsideClick);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [notificationsOpen]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-titles">
          <h1 className="page-title">{title}</h1>
          <div className="page-subtitle">{sub}</div>
        </div>

                <div className="topbar-actions">
          {role !== 'admin' && (
            <button className="bell-btn" onClick={() => navigate('settings')} aria-label="Open settings">
              <Settings size={19} style={{color:'black'}} />
            </button>
          )}
          <button className="bell-btn" onClick={() => setNotificationsOpen(v => !v)} aria-label="Notifications">
            <Bell size={21} style={{fill:'var(--pending)'}} />
            <span className="bell-dot" />
          </button>

          {notificationsOpen && (
            <div ref={notifRef} className="notif-panel show">
              <div className="notif-head">
                <h4>Notifications</h4>
                <button className="notif-close" onClick={() => setNotificationsOpen(false)}><X size={14} /></button>
              </div>
              <div className="notif-list">
                {notes.map((n, i) => (
                  <div className={`notif-item type-${n.type}`} key={i}>
                    <span className="dot" />
                    <div className="body">
                      <div className="ttl">{n.title}</div>
                      <div className="desc">{n.desc}</div>
                      <div className="time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
