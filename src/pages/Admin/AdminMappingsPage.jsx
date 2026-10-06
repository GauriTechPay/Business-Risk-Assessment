import React from 'react';
import { useApp } from '../../context/AppContext';
import PreparerAssignmentTable from '../../components/admin/PreparerAssignmentTable';
export default function AdminMappingsPage(){const {preparers,filings,setAssignModal}=useApp();return <div className="app-page show"><div className="sub-note" style={{marginBottom:14}}>Assign one approver to each preparer - all of that preparer's filings, current and future, route to their assigned approver.</div><PreparerAssignmentTable preparers={preparers} filings={filings} onAssign={setAssignModal}/></div>}
