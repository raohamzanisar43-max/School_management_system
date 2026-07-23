import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, BookOpen, GraduationCap, DollarSign, Plus, Check, CreditCard, 
  Layers, UserCheck, FileText, ArrowRight, ShieldCheck, LogOut
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout, switchRole } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // New Invoice Form state
  const [selectedStudent, setSelectedStudent] = useState(3); // default to Zayd
  const [invoiceAmount, setInvoiceAmount] = useState('12000.00');
  const [invoiceDueDate, setInvoiceDueDate] = useState('2026-08-15');

  useEffect(() => {
    const fetchData = async () => {
      const progs = await api.getPrograms();
      const crs = await api.getCourses();
      const invs = await api.getInvoices();
      const sals = await api.getSalaries();
      setPrograms(progs);
      setCourses(crs);
      setInvoices(invs);
      setSalaries(sals);
    };
    fetchData();
  }, []);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    const newInv = {
      id: invoices.length + 1,
      student: selectedStudent,
      student_name: selectedStudent === 3 ? 'Zayd Ahmed Bilal' : 'Other Student',
      amount: invoiceAmount,
      status: 'UNPAID',
      due_date: invoiceDueDate,
      issue_date: new Date().toISOString().split('T')[0],
      payment_method: 'PENDING'
    };
    
    // Simulate API create and update state
    setInvoices([newInv, ...invoices]);
    alert('Invoice generated successfully for ' + newInv.student_name);
  };

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      await api.payInvoice(invoiceId, 'BANK_TRANSFER');
      setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, status: 'PAID', payment_method: 'BANK_TRANSFER' } : inv));
    } catch (e) {
      console.error(e);
    }
  };

  // Helper calculation for total revenue
  const totalInvoiced = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const totalPaid = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const totalUnpaid = invoices.filter(inv => inv.status === 'UNPAID').reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-outfit tracking-tight">Bright Future</h1>
            <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-semibold">Admin Workspace</p>
          </div>
        </div>

        {/* User profile & Role switcher */}
        <div className="flex items-center gap-6">
          {/* Quick role-switch for grading/evaluating */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-xl text-xs">
            <span className="px-2 text-slate-500 font-semibold">Quick View:</span>
            <button onClick={() => switchRole('TEACHER')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-emerald-400 font-medium cursor-pointer">Teacher</button>
            <button onClick={() => switchRole('STUDENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-amber-400 font-medium cursor-pointer">Student</button>
            <button onClick={() => switchRole('PARENT')} className="px-2.5 py-1 hover:bg-slate-800 hover:text-white rounded-lg transition text-pink-400 font-medium cursor-pointer">Parent</button>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role.toLowerCase()}</p>
            </div>
            <button 
              onClick={logout} 
              className="p-2 bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/30 rounded-xl text-slate-400 hover:text-red-400 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 p-6 flex flex-col gap-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">Management</p>
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <ShieldCheck className="h-5 w-5" />
            Overview Dashboard
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'curriculum' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <BookOpen className="h-5 w-5" />
            Programs & Courses
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'billing' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <DollarSign className="h-5 w-5" />
            Billing & Invoicing
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'}`}
          >
            <Users className="h-5 w-5" />
            Platform Directory
          </button>
        </aside>

        {/* Dashboard View */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Tab 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">System Overview</h2>
                <p className="text-slate-400 text-sm mt-1">Real-time homeschooling operations, admissions, and financial analytics.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass p-6 rounded-2xl flex items-center justify-between hover-trigger transition-all duration-300">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Students</p>
                    <h3 className="text-2xl font-bold font-outfit text-white mt-1">12</h3>
                    <p className="text-[10px] text-emerald-400 font-medium mt-1">+8% from last month</p>
                  </div>
                  <div className="p-3.5 bg-indigo-500/10 rounded-xl text-indigo-400 hover-target transition-all duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl flex items-center justify-between hover-trigger transition-all duration-300">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Teachers</p>
                    <h3 className="text-2xl font-bold font-outfit text-white mt-1">4</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Full-time tutors</p>
                  </div>
                  <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-400 hover-target transition-all duration-300">
                    <UserCheck className="h-6 w-6" />
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl flex items-center justify-between hover-trigger transition-all duration-300">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Revenue Collected</p>
                    <h3 className="text-2xl font-bold font-outfit text-emerald-400 mt-1">Rs. {totalPaid.toLocaleString()}</h3>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">From total tuition bills</p>
                  </div>
                  <div className="p-3.5 bg-emerald-500/10 rounded-xl text-emerald-400 hover-target transition-all duration-300">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl flex items-center justify-between hover-trigger transition-all duration-300">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Outstanding</p>
                    <h3 className="text-2xl font-bold font-outfit text-rose-400 mt-1">Rs. {totalUnpaid.toLocaleString()}</h3>
                    <p className="text-[10px] text-rose-400 font-medium mt-1">Requires follow-up</p>
                  </div>
                  <div className="p-3.5 bg-rose-500/10 rounded-xl text-rose-400 hover-target transition-all duration-300">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Graphical representation / Analytics visualizer */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Financial chart (SVG representation) */}
                <div className="glass p-6 rounded-2xl lg:col-span-2">
                  <h3 className="text-base font-bold font-outfit text-white mb-4">Monthly Tuition Invoicing Analytics</h3>
                  <div className="h-48 flex items-end justify-between gap-4 pt-6 border-b border-slate-800">
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-800/80 rounded-t-lg h-24 relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 h-1/2 group-hover:h-3/4 transition-all duration-300"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">May 2026</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-800/80 rounded-t-lg h-36 relative overflow-hidden group">
                        <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 h-2/3 group-hover:h-5/6 transition-all duration-300"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Jun 2026</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-800/80 rounded-t-lg h-44 relative overflow-hidden group">
                        {/* Highlighting current month */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-indigo-400 h-[80%]"></div>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-bold">Jul 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-indigo-500 rounded-sm"></span>
                      <span className="text-slate-400">Monthly Target</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-slate-800 rounded-sm"></span>
                      <span className="text-slate-400">Total Unbilled Cap</span>
                    </div>
                  </div>
                </div>

                {/* Enrollment distribution */}
                <div className="glass p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-outfit text-white mb-4">Program Share</h3>
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-indigo-400">Montessori Development</span>
                          <span>35%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-emerald-400">Primary Education</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-amber-400">GED & O-Levels</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-800/80 pt-3 mt-4">
                    Values correspond to active student classroom registrations.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-extrabold font-outfit text-white">Programs & Courses</h2>
                  <p className="text-slate-400 text-sm mt-1">Manage standard homeschooling tracks and educational plans.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Programs List */}
                <div className="glass p-6 rounded-2xl lg:col-span-1 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-400" />
                    Offered Programs
                  </h3>
                  <div className="space-y-3">
                    {programs.map(prog => (
                      <div key={prog.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                        <h4 className="text-sm font-bold text-white tracking-wide">{prog.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{prog.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses List */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-400" />
                    Active Courses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="p-4 bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-xl transition">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md uppercase tracking-wider">{course.code}</span>
                          <span className="text-xs text-slate-500">Prog ID: {course.program}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-2">{course.name}</h4>
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">{course.syllabus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Billing & Fee Management</h2>
                <p className="text-slate-400 text-sm mt-1">Issue tuition receipts, monitor fee payments, and view payroll expenses.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to create Invoice */}
                <div className="glass p-6 rounded-2xl lg:col-span-1">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center gap-2 mb-4">
                    <Plus className="h-5 w-5 text-indigo-400" />
                    Generate New Invoice
                  </h3>
                  <form onSubmit={handleCreateInvoice} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Student</label>
                      <select 
                        value={selectedStudent} 
                        onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value={3}>Zayd Ahmed Bilal (Grade 1)</option>
                        <option value={5}>Esa Noor (Montessori)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Billing Amount (Rs.)</label>
                      <input 
                        type="number"
                        required
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Due Date</label>
                      <input 
                        type="date"
                        required
                        value={invoiceDueDate}
                        onChange={(e) => setInvoiceDueDate(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-700 bg-slate-900 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 border border-transparent rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none hover-glow transition cursor-pointer"
                    >
                      Generate Bill
                    </button>
                  </form>
                </div>

                {/* List of Invoices */}
                <div className="glass p-6 rounded-2xl lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-400" />
                      Invoice Billing Log
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Total: {invoices.length} invoices</span>
                  </h3>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    {invoices.map(inv => (
                      <div key={inv.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white">{inv.student_name}</p>
                          <div className="flex items-center gap-2.5 text-xs text-slate-400">
                            <span>Due: {inv.due_date}</span>
                            <span>•</span>
                            <span>Issued: {inv.issue_date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-extrabold text-white">Rs. {parseFloat(inv.amount).toLocaleString()}</p>
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                              {inv.status}
                            </span>
                          </div>

                          {inv.status === 'UNPAID' && (
                            <button
                              onClick={() => handleMarkAsPaid(inv.id)}
                              className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition cursor-pointer"
                              title="Mark as Paid"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: DIRECTORY */}
          {activeTab === 'users' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-extrabold font-outfit text-white">Platform Directory</h2>
                <p className="text-slate-400 text-sm mt-1">View registered active students, teachers, and system administrators.</p>
              </div>

              <div className="glass p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold font-outfit text-white border-b border-slate-800/80 pb-3">Active Users Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Hardcoded seed users for clean representation */}
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Ustadh Ahmed Bilal</h4>
                      <p className="text-xs text-emerald-400 mt-0.5">Teacher Persona</p>
                      <p className="text-[10px] text-slate-500 mt-1">ahmed@brightfuture.edu.pk</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-semibold">Tutor</span>
                  </div>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Zayd Ahmed Bilal</h4>
                      <p className="text-xs text-amber-400 mt-0.5">Student Persona</p>
                      <p className="text-[10px] text-slate-500 mt-1">zayd@brightfuture.edu.pk</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-semibold">Primary</span>
                  </div>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Ahmed Bilal Senior</h4>
                      <p className="text-xs text-pink-400 mt-0.5">Parent Persona</p>
                      <p className="text-[10px] text-slate-500 mt-1">ahmed_parent@gmail.com</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-semibold">Guardian</span>
                  </div>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">System Admin</h4>
                      <p className="text-xs text-indigo-400 mt-0.5">Administrator Persona</p>
                      <p className="text-[10px] text-slate-500 mt-1">admin@brightfuture.edu.pk</p>
                    </div>
                    <span className="text-[10px] bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md font-semibold">Super</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
