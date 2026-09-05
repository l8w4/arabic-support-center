import React, { useState, useEffect, createContext, useContext } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  CalendarCheck,
  ClipboardList,
  Search,
  Plus,
  X,
  Pencil,
  Trash2,
  Check,
  LogOut,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  RotateCcw,
  Languages,
  Eye,
  EyeOff,
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* i18n                                                               */
/* ---------------------------------------------------------------- */

const STRINGS = {
  ar: {
    appName: "مركز الدعم العربي",
    appNameSub: "Arabic Support Center",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    loginBtn: "دخول",
    loginError: "اسم المستخدم أو كلمة المرور غير صحيحة",
    dashboard: "لوحة التحكم",
    students: "الطلاب",
    attendance: "الحضور",
    assessment: "التقييم",
    resetData: "إعادة تعيين البيانات",
    logout: "تسجيل الخروج",
    teacher: "معلم",
    admin: "مسؤول",
    teacherPrefix: "أ. ",
    welcomeBack: "مرحبًا بعودتك، ",
    todaySummary: "هذا ملخص اليوم في المركز",
    presentToday: "الحاضرون اليوم",
    needsAttention: "بحاجة إلى متابعة",
    noAttention: "لا يوجد طلاب بحاجة إلى متابعة اليوم.",
    absentToday: "غائب اليوم",
    lowScore: "درجة تقييم منخفضة",
    viewProfile: "عرض الملف",
    recentActivity: "آخر النشاطات",
    searchPlaceholder: "ابحث بالاسم أو الرقم...",
    addStudent: "إضافة طالب",
    parentLabel: "ولي الأمر",
    edit: "تعديل",
    delete: "حذف",
    editStudentTitle: "تعديل بيانات الطالب",
    addStudentTitle: "إضافة طالب جديد",
    studentNameLabel: "اسم الطالب",
    studentIdLabel: "رقم الطالب",
    gradeLabel: "الصف",
    levelLabel: "المستوى",
    phoneLabel: "رقم الهاتف",
    notesLabel: "ملاحظات",
    save: "حفظ",
    cancel: "إلغاء",
    backToStudents: "رجوع إلى قائمة الطلاب",
    studentInfoTab: "معلومات الطالب",
    attendanceStatusToday: "حالة الحضور اليوم",
    reading: "القراءة",
    writing: "الكتابة",
    dictation: "الإملاء",
    behavior: "السلوك",
    assessmentNotesLabel: "ملاحظات التقييم",
    saveAssessment: "حفظ التقييم",
    generalNotesLabel: "ملاحظات عامة عن الطالب",
    saveNotesBtn: "حفظ الملاحظات",
    pickStudentPrompt: "اختر طالبًا من صفحة الطلاب لعرض ملفه.",
    goToStudents: "الذهاب إلى الطلاب",
    present: "حاضر",
    absent: "غائب",
    excused: "مستأذن",
    confirmReset: "هل أنت متأكد من إعادة تعيين جميع البيانات إلى القيم الافتراضية؟",
    grade1: "الصف الأول",
    grade2: "الصف الثاني",
    grade3: "الصف الثالث",
    grade4: "الصف الرابع",
    grade5: "الصف الخامس",
    grade6: "الصف السادس",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
  },
  en: {
    appName: "Arabic Support Center",
    appNameSub: "مركز الدعم العربي",
    username: "Username",
    password: "Password",
    loginBtn: "Log in",
    loginError: "Incorrect username or password",
    dashboard: "Dashboard",
    students: "Students",
    attendance: "Attendance",
    assessment: "Assessment",
    resetData: "Reset data",
    logout: "Log out",
    teacher: "Teacher",
    admin: "Admin",
    teacherPrefix: "",
    welcomeBack: "Welcome back, ",
    todaySummary: "Here's today's summary for the center",
    presentToday: "Present today",
    needsAttention: "Needs attention",
    noAttention: "No students need attention today.",
    absentToday: "Absent today",
    lowScore: "Low assessment score",
    viewProfile: "View profile",
    recentActivity: "Recent activity",
    searchPlaceholder: "Search by name or ID...",
    addStudent: "Add student",
    parentLabel: "Parent",
    edit: "Edit",
    delete: "Delete",
    editStudentTitle: "Edit student details",
    addStudentTitle: "Add new student",
    studentNameLabel: "Student name",
    studentIdLabel: "Student ID",
    gradeLabel: "Grade",
    levelLabel: "Level",
    phoneLabel: "Phone number",
    notesLabel: "Notes",
    save: "Save",
    cancel: "Cancel",
    backToStudents: "Back to students",
    studentInfoTab: "Student info",
    attendanceStatusToday: "Today's attendance status",
    reading: "Reading",
    writing: "Writing",
    dictation: "Dictation",
    behavior: "Behavior",
    assessmentNotesLabel: "Assessment notes",
    saveAssessment: "Save assessment",
    generalNotesLabel: "General notes about the student",
    saveNotesBtn: "Save notes",
    pickStudentPrompt: "Choose a student from the Students page to view their profile.",
    goToStudents: "Go to Students",
    present: "Present",
    absent: "Absent",
    excused: "Excused",
    confirmReset: "Are you sure you want to reset all data to defaults?",
    grade1: "Grade 1",
    grade2: "Grade 2",
    grade3: "Grade 3",
    grade4: "Grade 4",
    grade5: "Grade 5",
    grade6: "Grade 6",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
};

const LangContext = createContext({ lang: "ar", t: (k) => k, toggleLang: () => {} });
const useLang = () => useContext(LangContext);

/* ---------------------------------------------------------------- */
/* Accounts (demo-grade — a UI gate, not real server security)       */
/* ---------------------------------------------------------------- */

const ACCOUNTS = [
  { username: "iman", password: "Iman@2026", roleKey: "teacher", displayName: { ar: "إيمان", en: "Iman" } },
  { username: "admin", password: "Admin@2026", roleKey: "admin", displayName: { ar: "المسؤول", en: "Admin" } },
];

/* ---------------------------------------------------------------- */
/* Data (grade = 1-6, level = beginner|intermediate|advanced)        */
/* ---------------------------------------------------------------- */

const GRADE_NUMS = [1, 2, 3, 4, 5, 6];
const LEVEL_KEYS = ["beginner", "intermediate", "advanced"];

const emptyStudent = () => ({
  id: null,
  name: "",
  studentId: "",
  grade: 1,
  level: "intermediate",
  parent: "",
  phone: "",
  notes: "",
  attendance: "present",
  scores: { reading: 5, writing: 5, dictation: 5, behavior: 5 },
  assessmentNotes: "",
});

const initialStudents = [
  { id: 1, name: "أحمد الشريف", studentId: "AS-2024-01", grade: 4, level: "intermediate", parent: "محمد الشريف", phone: "0501234567", notes: "يحتاج إلى تدريب إضافي على القراءة الجهرية.", attendance: "present", scores: { reading: 7, writing: 6, dictation: 6, behavior: 8 }, assessmentNotes: "تحسّن ملحوظ في الأسبوعين الماضيين." },
  { id: 2, name: "سارة المصري", studentId: "AS-2024-02", grade: 3, level: "beginner", parent: "ليلى المصري", phone: "0559876543", notes: "خجولة في المشاركة الصفية.", attendance: "absent", scores: { reading: 5, writing: 4, dictation: 5, behavior: 6 }, assessmentNotes: "" },
  { id: 3, name: "يوسف حسن", studentId: "AS-2024-03", grade: 5, level: "advanced", parent: "حسن يوسف", phone: "0533456789", notes: "متفوق في الإملاء، يحتاج متابعة في القراءة.", attendance: "present", scores: { reading: 3, writing: 4, dictation: 5, behavior: 7 }, assessmentNotes: "القراءة أضعف مهارة حاليًا، نحتاج خطة علاجية." },
  { id: 4, name: "لمى عبدالله", studentId: "AS-2024-04", grade: 2, level: "beginner", parent: "عبدالله سالم", phone: "0567891234", notes: "", attendance: "present", scores: { reading: 6, writing: 6, dictation: 7, behavior: 9 }, assessmentNotes: "" },
  { id: 5, name: "خالد النجار", studentId: "AS-2024-05", grade: 6, level: "advanced", parent: "عمر النجار", phone: "0512345678", notes: "قائد إيجابي داخل الصف.", attendance: "present", scores: { reading: 8, writing: 8, dictation: 7, behavior: 8 }, assessmentNotes: "" },
  { id: 6, name: "مريم سالم", studentId: "AS-2024-06", grade: 4, level: "intermediate", parent: "سالم أحمد", phone: "0598765432", notes: "", attendance: "excused", scores: { reading: 6, writing: 5, dictation: 6, behavior: 7 }, assessmentNotes: "" },
  { id: 7, name: "عمر فارس", studentId: "AS-2024-07", grade: 3, level: "beginner", parent: "فارس عمر", phone: "0544567891", notes: "غياب متكرر هذا الشهر.", attendance: "absent", scores: { reading: 4, writing: 3, dictation: 4, behavior: 5 }, assessmentNotes: "يحتاج تواصل مع ولي الأمر بخصوص الحضور." },
  { id: 8, name: "نور الدين", studentId: "AS-2024-08", grade: 5, level: "intermediate", parent: "الدين محمود", phone: "0523456781", notes: "", attendance: "present", scores: { reading: 7, writing: 7, dictation: 8, behavior: 9 }, assessmentNotes: "" },
];

const initialActivity = [
  { id: 1, textAr: "أحمد الشريف أكمل تقييم القراءة", textEn: "Ahmed Al-Sharif completed the reading assessment", time: "قبل ساعة" },
  { id: 2, textAr: "سارة المصري غائبة اليوم", textEn: "Sara Al-Masry is absent today", time: "قبل ساعتين" },
  { id: 3, textAr: "تمت إضافة الطالب نور الدين", textEn: "Student Nour Al-Din was added", time: "أمس" },
];

function needsAttention(s) {
  return s.attendance === "absent" || Object.values(s.scores).some((v) => v <= 3);
}

/* ---------------------------------------------------------------- */
/* Persistent storage                                                 */
/* ---------------------------------------------------------------- */

const STUDENTS_KEY = "asc-students-v2";
const ACTIVITY_KEY = "asc-activity-v2";

function loadOrSeed(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore corrupt/missing data — fall through to seeding
  }
  try {
    localStorage.setItem(key, JSON.stringify(fallback));
  } catch (e) {
    console.error("Storage seed failed", e);
  }
  return fallback;
}

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write failed", e);
  }
}

/* ---------------------------------------------------------------- */
/* Styling                                                            */
/* ---------------------------------------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

.asc-root { font-family: 'Tajawal', sans-serif; background: #16233F; color: #F2F4F8; }
[lang="en"] .asc-root { font-family: 'Inter', sans-serif; }
.asc-display { font-family: 'Cairo', sans-serif; font-weight: 700; }
[lang="en"] .asc-display { font-family: 'Poppins', sans-serif; font-weight: 700; }

.asc-sidebar { width: 220px; background: #101B33; border-left: 1px solid rgba(220,75,57,0.25); display:flex; flex-direction:column; }
[dir="ltr"] .asc-sidebar { border-left:none; border-right: 1px solid rgba(220,75,57,0.25); }
.asc-nav-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; color:#C7CEE0; cursor:pointer; font-size:14px; transition: background .15s, color .15s; }
.asc-nav-item:hover { background: rgba(220,75,57,0.12); color:#F2F4F8; }
.asc-nav-item.active { background: rgba(220,75,57,0.18); color:#F4CD3C; font-weight:600; }

.asc-card { background:#FFFFFF; color:#16233F; border-radius:10px; border:1px solid rgba(220,75,57,0.25); position:relative; padding:18px; }
.asc-card::before { content:''; position:absolute; top:0; right:20px; width:34px; height:7px; background:#DC4B39; border-radius:0 0 4px 4px; }
[dir="ltr"] .asc-card::before { right:auto; left:20px; }

.asc-btn { border-radius:8px; padding:8px 14px; font-size:14px; font-weight:600; cursor:pointer; border:1px solid transparent; transition: opacity .15s, background .15s; display:inline-flex; align-items:center; gap:6px; }
.asc-btn-primary { background:#DC4B39; color:#FFFFFF; }
.asc-btn-primary:hover { opacity:0.9; }
.asc-btn-ghost { background:transparent; color:#F2F4F8; border-color:rgba(242,244,248,0.35); }
.asc-btn-ghost:hover { background:rgba(242,244,248,0.08); }
.asc-btn-dark { background:#16233F; color:#FFFFFF; }
.asc-btn-dark:hover { opacity:0.85; }
.asc-icon-btn { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; border:1px solid rgba(22,35,63,0.15); background:transparent; color:#16233F; }
.asc-icon-btn:hover { background: rgba(22,35,63,0.06); }

.asc-input { width:100%; border-radius:8px; border:1px solid rgba(22,35,63,0.2); padding:8px 12px; font-family:inherit; font-size:14px; background:#FFFFFF; color:#16233F; }
.asc-input:focus { outline:2px solid #DC4B39; outline-offset:1px; }
.asc-input-dark { background:#1E2F52; color:#F2F4F8; border:1px solid rgba(220,75,57,0.3); }
.asc-label { font-size:12px; color:#5B6660; margin-bottom:4px; display:block; }

.asc-badge { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:999px; font-size:12px; font-weight:600; }
.asc-badge-present { background:rgba(94,194,183,0.20); color:#1F6E64; }
.asc-badge-absent { background:rgba(220,75,57,0.15); color:#B23A2B; }
.asc-badge-excused { background:rgba(244,205,60,0.25); color:#8A6A12; }

.asc-tab { padding:8px 16px; border-radius:8px 8px 0 0; font-size:14px; cursor:pointer; color:#C7CEE0; border-bottom:2px solid transparent; }
.asc-tab.active { color:#F4CD3C; border-bottom:2px solid #F4CD3C; font-weight:600; }

.asc-toggle { flex:1; text-align:center; padding:10px; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; border:1px solid rgba(22,35,63,0.15); color:#5B6660; background:#FFFFFF; }
.asc-toggle.on-present { background:rgba(94,194,183,0.20); color:#1F6E64; border-color:#5EC2B7; }
.asc-toggle.on-absent { background:rgba(220,75,57,0.15); color:#B23A2B; border-color:#DC4B39; }
.asc-toggle.on-excused { background:rgba(244,205,60,0.25); color:#8A6A12; border-color:#F4CD3C; }

.asc-lang-btn { display:inline-flex; align-items:center; gap:5px; font-size:12px; padding:5px 10px; border-radius:999px; background:rgba(244,205,60,0.18); color:#F4CD3C; cursor:pointer; border:1px solid rgba(244,205,60,0.4); }
.asc-lang-btn:hover { background:rgba(244,205,60,0.28); }

.asc-eye-btn { position:absolute; background:none; border:none; cursor:pointer; color:#5B6660; display:flex; align-items:center; padding:4px; }

.asc-scroll::-webkit-scrollbar { width:8px; }
.asc-scroll::-webkit-scrollbar-thumb { background: rgba(220,75,57,0.35); border-radius:4px; }

.asc-spinner { width:28px; height:28px; border-radius:50%; border:3px solid rgba(220,75,57,0.25); border-top-color:#DC4B39; animation: asc-spin 0.8s linear infinite; }
@keyframes asc-spin { to { transform: rotate(360deg); } }
`;

/* ---------------------------------------------------------------- */
/* Small building blocks                                             */
/* ---------------------------------------------------------------- */

function LangToggle({ style }) {
  const { lang, toggleLang } = useLang();
  return (
    <button type="button" className="asc-lang-btn" style={style} onClick={toggleLang}>
      <Languages size={13} />
      {lang === "ar" ? "English" : "العربية"}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="asc-card" style={{ flex: 1, minWidth: 160 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: accent + "22", color: accent }}>
          <Icon size={18} />
        </div>
        <span className="asc-label" style={{ margin: 0 }}>{label}</span>
      </div>
      <div className="asc-display" style={{ fontSize: 32, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function AttendanceBadge({ status }) {
  const { t } = useLang();
  return <span className={`asc-badge asc-badge-${status}`}>{t(status)}</span>;
}

function ScoreForm({ initialScores, initialNotes, onSave }) {
  const { t } = useLang();
  const [scores, setScores] = useState(initialScores);
  const [notes, setNotes] = useState(initialNotes || "");
  const fields = [
    { key: "reading", label: t("reading") },
    { key: "writing", label: t("writing") },
    { key: "dictation", label: t("dictation") },
    { key: "behavior", label: t("behavior") },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
      {fields.map((f) => (
        <div key={f.key}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span className="asc-label" style={{ margin: 0 }}>{f.label}</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{scores[f.key]}/9</span>
          </div>
          <input type="range" min={1} max={9} value={scores[f.key]} onChange={(e) => setScores((s) => ({ ...s, [f.key]: Number(e.target.value) }))} style={{ width: "100%", accentColor: "#DC4B39" }} />
        </div>
      ))}
      <div>
        <span className="asc-label">{t("assessmentNotesLabel")}</span>
        <textarea className="asc-input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button className="asc-btn asc-btn-dark" style={{ alignSelf: "flex-start" }} onClick={() => onSave(scores, notes)}>
        <Check size={16} /> {t("saveAssessment")}
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Login                                                              */
/* ---------------------------------------------------------------- */

function LoginScreen({ onLogin }) {
  const { t, lang } = useLang();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const account = ACCOUNTS.find((a) => a.username.toLowerCase() === username.trim().toLowerCase() && a.password === password);
    if (account) {
      setError("");
      onLogin(account);
    } else {
      setError(t("loginError"));
    }
  }

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="asc-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" }}>
      <style>{CSS}</style>
      <LangToggle style={{ position: "absolute", top: 20, insetInlineEnd: 20 }} />
      <form onSubmit={submit} className="asc-card" style={{ width: 340 }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#16233F", color: "#F4CD3C", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <GraduationCap size={28} />
          </div>
          <div className="asc-display" style={{ fontSize: 24, fontWeight: 700 }}>{t("appName")}</div>
          <div style={{ fontSize: 12, color: "#5B6660" }}>{t("appNameSub")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <span className="asc-label">{t("username")}</span>
            <input className="asc-input" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <span className="asc-label">{t("password")}</span>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="asc-input"
                style={{ [lang === "ar" ? "paddingLeft" : "paddingRight"]: 36 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="asc-eye-btn"
                style={{ top: 6, [lang === "ar" ? "left" : "right"]: 6 }}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>
          {error && <div style={{ color: "#DC4B39", fontSize: 13 }}>{error}</div>}
          <button type="submit" className="asc-btn asc-btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>{t("loginBtn")}</button>
        </div>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Sidebar                                                            */
/* ---------------------------------------------------------------- */

function Sidebar({ page, setPage, account, onLogout, onReset }) {
  const { t, lang } = useLang();
  const items = [
    { key: "dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { key: "students", label: t("students"), icon: Users },
    { key: "attendance", label: t("attendance"), icon: CalendarCheck },
    { key: "assessment", label: t("assessment"), icon: ClipboardList },
  ];
  return (
    <div className="asc-sidebar">
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(220,75,57,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <GraduationCap size={22} color="#F4CD3C" />
          <span className="asc-display" style={{ fontSize: 16, fontWeight: 700 }}>{t("appName")}</span>
        </div>
        <div style={{ fontSize: 10, color: "#8891A8", marginBottom: 10 }}>{t("appNameSub")}</div>
        <LangToggle />
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {items.map((it) => (
          <div key={it.key} className={`asc-nav-item ${page === it.key ? "active" : ""}`} onClick={() => setPage(it.key)}>
            <it.icon size={17} />
            {it.label}
          </div>
        ))}
      </div>
      <div style={{ padding: 12, borderTop: "1px solid rgba(220,75,57,0.15)" }}>
        <div style={{ fontSize: 12, color: "#8891A8", marginBottom: 8 }}>
          {account.displayName[lang]} · {t(account.roleKey)}
        </div>
        {account.roleKey === "admin" && (
          <div className="asc-nav-item" onClick={onReset} style={{ marginBottom: 4 }}>
            <RotateCcw size={16} />
            {t("resetData")}
          </div>
        )}
        <div className="asc-nav-item" onClick={onLogout}>
          <LogOut size={17} />
          {t("logout")}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Dashboard                                                          */
/* ---------------------------------------------------------------- */

function Dashboard({ account, total, present, attention, activity, onOpenStudent }) {
  const { t, lang } = useLang();
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div className="asc-display" style={{ fontSize: 22, fontWeight: 700 }}>
          {t("welcomeBack")}{account.roleKey === "teacher" ? t("teacherPrefix") : ""}{account.displayName[lang]}
        </div>
        <div style={{ fontSize: 13, color: "#AFB8CC" }}>{t("todaySummary")}</div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
        <StatCard icon={Users} label={t("students")} value={total} accent="#F4CD3C" />
        <StatCard icon={Check} label={t("presentToday")} value={present} accent="#5EC2B7" />
        <StatCard icon={AlertCircle} label={t("needsAttention")} value={attention.length} accent="#DC4B39" />
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <div className="asc-card" style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{t("needsAttention")}</div>
          {attention.length === 0 && <div style={{ fontSize: 13, color: "#5B6660" }}>{t("noAttention")}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {attention.map((s) => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(22,35,63,0.08)" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#5B6660" }}>{s.attendance === "absent" ? t("absentToday") : t("lowScore")}</div>
                </div>
                <button className="asc-btn asc-btn-dark" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => onOpenStudent(s.id)}>{t("viewProfile")}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="asc-card" style={{ flex: 1, minWidth: 280 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>{t("recentActivity")}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activity.map((a) => (
              <div key={a.id} style={{ fontSize: 13, borderBottom: "1px solid rgba(22,35,63,0.08)", paddingBottom: 6 }}>
                <div>{lang === "ar" ? a.textAr : a.textEn || a.textAr}</div>
                <div style={{ fontSize: 11, color: "#8891A8" }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Students                                                           */
/* ---------------------------------------------------------------- */

function StudentCard({ s, onOpen, onEdit, onDelete }) {
  const { t } = useLang();
  return (
    <div className="asc-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
          <div style={{ fontSize: 12, color: "#5B6660" }}>{s.studentId}</div>
        </div>
        <AttendanceBadge status={s.attendance} />
      </div>
      <div style={{ display: "flex", gap: 6, margin: "10px 0", flexWrap: "wrap" }}>
        <span className="asc-badge" style={{ background: "rgba(22,35,63,0.06)", color: "#16233F" }}>{t("grade" + s.grade)}</span>
        <span className="asc-badge" style={{ background: "rgba(22,35,63,0.06)", color: "#16233F" }}>{t(s.level)}</span>
      </div>
      <div style={{ fontSize: 12, color: "#5B6660", marginBottom: 12 }}>
        {t("parentLabel")}: {s.parent || "—"} · {s.phone || "—"}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="asc-btn asc-btn-dark" style={{ flex: 1, justifyContent: "center", fontSize: 13 }} onClick={() => onOpen(s.id)}>{t("viewProfile")}</button>
        <button className="asc-icon-btn" onClick={() => onEdit(s)} title={t("edit")}><Pencil size={15} /></button>
        <button className="asc-icon-btn" onClick={() => onDelete(s.id)} title={t("delete")}><Trash2 size={15} /></button>
      </div>
    </div>
  );
}

function StudentsPage({ students, query, setQuery, onAdd, onEdit, onDelete, onOpen }) {
  const { t, lang } = useLang();
  const filtered = students.filter((s) =>
    [s.name, s.studentId, t("grade" + s.grade)].join(" ").includes(query)
  );
  const side = lang === "ar" ? "right" : "left";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div className="asc-display" style={{ fontSize: 22, fontWeight: 700 }}>{t("students")}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <Search size={15} style={{ position: "absolute", top: 10, [side]: 10, color: "#8891A8" }} />
            <input className="asc-input asc-input-dark" style={{ [lang === "ar" ? "paddingRight" : "paddingLeft"]: 32, width: 200 }} placeholder={t("searchPlaceholder")} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button className="asc-btn asc-btn-primary" onClick={onAdd}><Plus size={16} /> {t("addStudent")}</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {filtered.map((s) => (
          <StudentCard key={s.id} s={s} onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

function StudentFormModal({ data, onCancel, onSave }) {
  const { t } = useLang();
  const [form, setForm] = useState(data);
  const isEdit = !!data.id;
  const canSave = form.name.trim() && form.studentId.trim();
  const field = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(22,35,63,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }}>
      <div className="asc-card" style={{ width: 420, maxHeight: "85%", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{isEdit ? t("editStudentTitle") : t("addStudentTitle")}</div>
          <button className="asc-icon-btn" onClick={onCancel}><X size={16} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><span className="asc-label">{t("studentNameLabel")}</span><input className="asc-input" value={form.name} onChange={(e) => field("name", e.target.value)} /></div>
          <div><span className="asc-label">{t("studentIdLabel")}</span><input className="asc-input" value={form.studentId} onChange={(e) => field("studentId", e.target.value)} /></div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <span className="asc-label">{t("gradeLabel")}</span>
              <select className="asc-input" value={form.grade} onChange={(e) => field("grade", Number(e.target.value))}>
                {GRADE_NUMS.map((g) => <option key={g} value={g}>{t("grade" + g)}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <span className="asc-label">{t("levelLabel")}</span>
              <select className="asc-input" value={form.level} onChange={(e) => field("level", e.target.value)}>
                {LEVEL_KEYS.map((l) => <option key={l} value={l}>{t(l)}</option>)}
              </select>
            </div>
          </div>
          <div><span className="asc-label">{t("parentLabel")}</span><input className="asc-input" value={form.parent} onChange={(e) => field("parent", e.target.value)} /></div>
          <div><span className="asc-label">{t("phoneLabel")}</span><input className="asc-input" value={form.phone} onChange={(e) => field("phone", e.target.value)} /></div>
          <div><span className="asc-label">{t("notesLabel")}</span><textarea className="asc-input" rows={2} value={form.notes} onChange={(e) => field("notes", e.target.value)} /></div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button className="asc-btn asc-btn-primary" style={{ flex: 1, justifyContent: "center", opacity: canSave ? 1 : 0.5, cursor: canSave ? "pointer" : "not-allowed" }} onClick={() => canSave && onSave(form)}>{t("save")}</button>
          <button className="asc-btn" style={{ flex: 1, justifyContent: "center", background: "transparent", border: "1px solid rgba(22,35,63,0.25)", color: "#16233F" }} onClick={onCancel}>{t("cancel")}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Student profile                                                    */
/* ---------------------------------------------------------------- */

function EmptyProfile({ onBack }) {
  const { t } = useLang();
  return (
    <div className="asc-card" style={{ textAlign: "center" }}>
      <div style={{ marginBottom: 12 }}>{t("pickStudentPrompt")}</div>
      <button className="asc-btn asc-btn-dark" onClick={onBack}>{t("goToStudents")}</button>
    </div>
  );
}

function StudentProfile({ student, tab, setTab, onBack, onEdit, onAttendance, onSaveScores, onSaveNotes }) {
  const { t, lang } = useLang();
  const [notesDraft, setNotesDraft] = useState(student.notes);
  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;
  const tabs = [
    { key: "info", label: t("studentInfoTab") },
    { key: "attendance", label: t("attendance") },
    { key: "assessment", label: t("assessment") },
    { key: "notes", label: t("notesLabel") },
  ];

  return (
    <div>
      <button className="asc-btn asc-btn-ghost" style={{ marginBottom: 14 }} onClick={onBack}><BackIcon size={16} /> {t("backToStudents")}</button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div className="asc-display" style={{ fontSize: 22, fontWeight: 700 }}>{student.name}</div>
          <div style={{ fontSize: 12, color: "#AFB8CC" }}>{student.studentId} · {t("grade" + student.grade)}</div>
        </div>
        <button className="asc-btn asc-btn-dark" onClick={onEdit}><Pencil size={15} /> {t("edit")}</button>
      </div>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid rgba(220,75,57,0.2)", marginBottom: 16 }}>
        {tabs.map((tb) => (
          <div key={tb.key} className={`asc-tab ${tab === tb.key ? "active" : ""}`} onClick={() => setTab(tb.key)}>{tb.label}</div>
        ))}
      </div>

      {tab === "info" && (
        <div className="asc-card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 16 }}>
          <div><div className="asc-label">{t("gradeLabel")}</div><div style={{ fontWeight: 600 }}>{t("grade" + student.grade)}</div></div>
          <div><div className="asc-label">{t("levelLabel")}</div><div style={{ fontWeight: 600 }}>{t(student.level)}</div></div>
          <div><div className="asc-label">{t("parentLabel")}</div><div style={{ fontWeight: 600 }}>{student.parent || "—"}</div></div>
          <div><div className="asc-label">{t("phoneLabel")}</div><div style={{ fontWeight: 600 }}>{student.phone || "—"}</div></div>
        </div>
      )}

      {tab === "attendance" && (
        <div className="asc-card" style={{ maxWidth: 420 }}>
          <div className="asc-label" style={{ marginBottom: 10 }}>{t("attendanceStatusToday")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["present", "absent", "excused"].map((st) => (
              <div key={st} className={`asc-toggle ${student.attendance === st ? `on-${st}` : ""}`} onClick={() => onAttendance(st)}>{t(st)}</div>
            ))}
          </div>
        </div>
      )}

      {tab === "assessment" && (
        <div className="asc-card">
          <ScoreForm initialScores={student.scores} initialNotes={student.assessmentNotes} onSave={onSaveScores} />
        </div>
      )}

      {tab === "notes" && (
        <div className="asc-card" style={{ maxWidth: 480 }}>
          <span className="asc-label">{t("generalNotesLabel")}</span>
          <textarea className="asc-input" rows={5} value={notesDraft} onChange={(e) => setNotesDraft(e.target.value)} />
          <button className="asc-btn asc-btn-dark" style={{ marginTop: 10 }} onClick={() => onSaveNotes(notesDraft)}><Check size={16} /> {t("saveNotesBtn")}</button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Attendance page                                                    */
/* ---------------------------------------------------------------- */

function AttendancePage({ students, onSet, onOpen }) {
  const { t, lang } = useLang();
  const today = new Date().toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <div>
      <div className="asc-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{t("attendance")}</div>
      <div style={{ fontSize: 13, color: "#AFB8CC", marginBottom: 16 }}>{today}</div>
      <div className="asc-card">
        {students.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(22,35,63,0.08)", flexWrap: "wrap" }}>
            <div style={{ cursor: "pointer", minWidth: 140 }} onClick={() => onOpen(s.id)}>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#5B6660" }}>{t("grade" + s.grade)}</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["present", "absent", "excused"].map((st) => (
                <div key={st} className={`asc-toggle ${s.attendance === st ? `on-${st}` : ""}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => onSet(s.id, st)}>{t(st)}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Assessment page                                                    */
/* ---------------------------------------------------------------- */

function AssessmentPage({ students, selectedId, setSelectedId, onSave }) {
  const { t } = useLang();
  const student = students.find((s) => s.id === selectedId) || students[0];
  return (
    <div>
      <div className="asc-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{t("assessment")}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {students.map((s) => (
          <div key={s.id} onClick={() => setSelectedId(s.id)} style={{ padding: "6px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer", background: student && student.id === s.id ? "#F4CD3C" : "rgba(242,244,248,0.08)", color: student && student.id === s.id ? "#16233F" : "#F2F4F8", fontWeight: student && student.id === s.id ? 700 : 400 }}>
            {s.name}
          </div>
        ))}
      </div>
      {student && (
        <div className="asc-card" style={{ maxWidth: 480 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>{student.name} · {t("grade" + student.grade)}</div>
          <ScoreForm key={student.id} initialScores={student.scores} initialNotes={student.assessmentNotes} onSave={(scores, notes) => onSave(student.id, scores, notes)} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Loading screen                                                     */
/* ---------------------------------------------------------------- */

function LoadingScreen() {
  return (
    <div className="asc-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{CSS}</style>
      <div className="asc-spinner" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* App                                                                */
/* ---------------------------------------------------------------- */

export default function ArabicSupportCenterPrototype() {
  const [lang, setLang] = useState("ar");
  const [account, setAccount] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState(initialStudents);
  const [activity, setActivity] = useState(initialActivity);
  const [selectedId, setSelectedId] = useState(null);
  const [profileTab, setProfileTab] = useState("info");
  const [query, setQuery] = useState("");
  const [formStudent, setFormStudent] = useState(null);
  const [assessId, setAssessId] = useState(initialStudents[0].id);

  const t = (key) => (STRINGS[lang] && STRINGS[lang][key]) || key;
  const toggleLang = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  useEffect(() => {
    if (!account || dataLoaded) return;
    const s = loadOrSeed(STUDENTS_KEY, initialStudents);
    const a = loadOrSeed(ACTIVITY_KEY, initialActivity);
    setStudents(s);
    setActivity(a);
    setAssessId(s[0] ? s[0].id : null);
    setDataLoaded(true);
  }, [account, dataLoaded]);

  function persistStudents(list) { setStudents(list); persist(STUDENTS_KEY, list); }
  function persistActivity(list) { setActivity(list); persist(ACTIVITY_KEY, list); }

  function log(textAr, textEn) {
    const newActivity = [{ id: Date.now(), textAr, textEn, time: lang === "ar" ? "الآن" : "Just now" }, ...activity].slice(0, 8);
    persistActivity(newActivity);
  }

  const selected = students.find((s) => s.id === selectedId) || null;

  function openStudent(id) { setSelectedId(id); setProfileTab("info"); setPage("profile"); }

  function saveStudent(data) {
    let newList, msgAr, msgEn;
    if (data.id) {
      newList = students.map((s) => (s.id === data.id ? { ...s, ...data } : s));
      msgAr = `تم تحديث بيانات ${data.name}`;
      msgEn = `Updated ${data.name}'s details`;
    } else {
      const newStudent = { ...emptyStudent(), ...data, id: Date.now() };
      newList = [...students, newStudent];
      msgAr = `تمت إضافة الطالب ${data.name}`;
      msgEn = `Added student ${data.name}`;
    }
    persistStudents(newList);
    log(msgAr, msgEn);
    setFormStudent(null);
  }

  function deleteStudent(id) {
    const s = students.find((x) => x.id === id);
    const newList = students.filter((x) => x.id !== id);
    persistStudents(newList);
    if (s) log(`تم حذف الطالب ${s.name}`, `Removed student ${s.name}`);
    if (selectedId === id) { setSelectedId(null); setPage("students"); }
  }

  function setAttendance(id, status) {
    const s = students.find((x) => x.id === id);
    const newList = students.map((x) => (x.id === id ? { ...x, attendance: status } : x));
    persistStudents(newList);
    if (s) log(`${s.name}: ${STRINGS.ar[status]}`, `${s.name}: ${STRINGS.en[status]}`);
  }

  function saveScores(id, scores, assessmentNotes) {
    const s = students.find((x) => x.id === id);
    const newList = students.map((x) => (x.id === id ? { ...x, scores, assessmentNotes } : x));
    persistStudents(newList);
    if (s) log(`تم حفظ تقييم ${s.name}`, `Saved assessment for ${s.name}`);
  }

  function saveNotes(id, notes) {
    const newList = students.map((x) => (x.id === id ? { ...x, notes } : x));
    persistStudents(newList);
  }

  function resetData() {
    if (window.confirm(t("confirmReset"))) {
      persistStudents(initialStudents);
      persistActivity(initialActivity);
    }
  }

  const present = students.filter((s) => s.attendance === "present").length;
  const attention = students.filter(needsAttention);

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {!account ? (
        <LoginScreen onLogin={setAccount} />
      ) : !dataLoaded ? (
        <LoadingScreen />
      ) : (
        <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="asc-root" style={{ display: "flex", minHeight: "100vh" }}>
          <style>{CSS}</style>
          <Sidebar
            page={page}
            setPage={(p) => { setPage(p); setSelectedId(null); }}
            account={account}
            onLogout={() => { setAccount(null); setDataLoaded(false); }}
            onReset={resetData}
          />
          <main className="asc-scroll" style={{ flex: 1, padding: 24, overflowY: "auto" }}>
            {page === "dashboard" && (
              <Dashboard account={account} total={students.length} present={present} attention={attention} activity={activity} onOpenStudent={openStudent} />
            )}
            {page === "students" && (
              <StudentsPage students={students} query={query} setQuery={setQuery} onAdd={() => setFormStudent(emptyStudent())} onEdit={(s) => setFormStudent(s)} onDelete={deleteStudent} onOpen={openStudent} />
            )}
            {page === "profile" &&
              (selected ? (
                <StudentProfile
                  student={selected}
                  tab={profileTab}
                  setTab={setProfileTab}
                  onBack={() => setPage("students")}
                  onEdit={() => setFormStudent(selected)}
                  onAttendance={(status) => setAttendance(selected.id, status)}
                  onSaveScores={(scores, notes) => saveScores(selected.id, scores, notes)}
                  onSaveNotes={(notes) => saveNotes(selected.id, notes)}
                />
              ) : (
                <EmptyProfile onBack={() => setPage("students")} />
              ))}
            {page === "attendance" && <AttendancePage students={students} onSet={setAttendance} onOpen={openStudent} />}
            {page === "assessment" && <AssessmentPage students={students} selectedId={assessId} setSelectedId={setAssessId} onSave={saveScores} />}
          </main>
          {formStudent && <StudentFormModal data={formStudent} onCancel={() => setFormStudent(null)} onSave={saveStudent} />}
        </div>
      )}
    </LangContext.Provider>
  );
}
