import DashboardPage from "../pages/Dashboard/DashboardPage";
import AssessmentPage from "../pages/Assessment/AssessmentPage";
import FilingsPage from "../pages/Filings/FilingsPage";
import ReviewPage from "../pages/Review/ReviewPage";
import AdminMappingsPage from "../pages/Admin/AdminMappingsPage";
import AdminFilingsPage from "../pages/Admin/AdminFilingsPage";
import AdminSectionsPage from "../pages/Admin/AdminSectionsPage";
import AdminGuidancePage from "../pages/Admin/AdminGuidancePage";
import SettingsPage from "../pages/Settings/SettingsPage";

export const routes = {
  dashboard: DashboardPage,
  assessment: AssessmentPage,
  filings: FilingsPage,
  settings: SettingsPage,
  reviewForm: ReviewPage,
  "admin-mappings": AdminMappingsPage,
  "admin-filings": AdminFilingsPage,
  "admin-sections": AdminSectionsPage,
  "admin-guidance": AdminGuidancePage,
};
