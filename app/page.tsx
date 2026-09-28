"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Bell, BookOpen, CalendarDays, Check, CheckCheck, ChevronRight, CircleHelp, ClipboardList, Clock3, CreditCard, FileText, GraduationCap, House, LayoutGrid, LogIn, MapPin, Megaphone, Plus, School, ShieldCheck, Sparkles, UserRound, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const lessons = [
  { subject: "Mathematics", topic: "Linear equations", teacher: "Ms. Priya Sharma", time: "09:00", end: "09:45", room: "Room 204", icon: Plus },
  { subject: "English", topic: "The art of storytelling", teacher: "Mr. Arjun Mehta", time: "10:00", end: "10:45", room: "Room 204", icon: BookOpen },
  { subject: "Science", topic: "Light and reflection", teacher: "Ms. Neha Rao", time: "11:00", end: "11:45", room: "Science lab", icon: Sparkles },
  { subject: "Social Studies", topic: "Our constitution", teacher: "Mr. Rohan Das", time: "13:00", end: "13:45", room: "Room 204", icon: Users },
  { subject: "Computer Science", topic: "Introduction to algorithms", teacher: "Ms. Ananya Shah", time: "14:00", end: "14:45", room: "Computer lab", icon: LayoutGrid },
];
const homework = [
  { id: 1, subject: "Mathematics", title: "Practice makes progress", description: "Complete exercise 4.2, questions 1–10 on linear equations in your notebook.", due: "Tomorrow", icon: Plus },
  { id: 2, subject: "Science", title: "Explore light & reflection", description: "Draw and label a ray diagram for a plane mirror. Write three examples of reflection in everyday life.", due: "23 Sep", icon: Sparkles },
  { id: 3, subject: "English", title: "A story worth telling", description: "Write a 300-word short story about an unexpected adventure. Include a title and a clear beginning, middle, and ending.", due: "24 Sep", icon: BookOpen },
];
const notices = [
  { title: "Parent–teacher meet", category: "School update", date: "26 Sep", text: "Meet your child's teachers on Saturday, 26 September, from 9:00 AM to 12:00 PM in the school auditorium. Please bring the student diary.", icon: Users },
  { title: "A little curiosity goes a long way", category: "Science exhibition", date: "30 Sep", text: "Our annual science exhibition is on 30 September from 10:00 AM. Class 8 students can present a working model in teams of two. Register with Ms. Neha Rao by 24 September.", icon: Sparkles },
  { title: "Library books, new adventures", category: "Library", date: "21 Sep", text: "The September reading collection is here. Visit the library during your lunch break and borrow up to two books with your student ID.", icon: BookOpen },
];
const nav = [{ name: "Home", icon: House }, { name: "Timetable", icon: CalendarDays }, { name: "Homework", icon: BookOpen }, { name: "More", icon: LayoutGrid }];
type Role = "Principal" | "Teacher" | "Student";

const roleCopy: Record<Role, { eyebrow: string; title: string; name: string; subtitle: string; icon: LucideIcon }> = {
  Principal: { eyebrow: "PRINCIPAL SPACE", title: "Lead with clarity.", name: "Dr. Meera Kapoor", subtitle: "Greenwood Public School · Academic year 2026–27", icon: School },
  Teacher: { eyebrow: "TEACHER SPACE", title: "Your classroom, connected.", name: "Ms. Priya Sharma", subtitle: "Class 8 · Section A · Mathematics", icon: Users },
  Student: { eyebrow: "STUDENT SPACE", title: "A good day to learn.", name: "Aarav Sharma", subtitle: "Class 8 · Section A · Roll no. 12", icon: GraduationCap },
};

function IconTile({ icon: Icon, dark = false }: { icon: LucideIcon; dark?: boolean }) {
  return <span className={`icon-tile ${dark ? "dark" : ""}`}><Icon size={22} strokeWidth={1.8} /></span>;
}
function Section({ title, action, onClick, children }: { title: string; action?: string; onClick?: () => void; children: ReactNode }) {
  return <section className="section"><div className="section-heading"><h2>{title}</h2>{action && <Button variant="ghost" onClick={onClick} className="text-link">{action}<ArrowRight size={15} /></Button>}</div>{children}</section>;
}
function ListRow({ icon, title, subtitle, end, onClick }: { icon: LucideIcon; title: string; subtitle: string; end?: ReactNode; onClick?: () => void }) {
  return <Button variant="ghost" className="list-row" onClick={onClick}><IconTile icon={icon} /><span className="row-text"><strong>{title}</strong><small>{subtitle}</small></span>{end || <ChevronRight size={18} />}</Button>;
}

function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onLogin(role); };
  return <div className="login-screen">
    <div className="login-brand"><span className="brand-icon"><GraduationCap size={23} /></span><span>schoolday<span className="brand-dot">.</span><small>GREENWOOD PUBLIC SCHOOL</small></span></div>
    <Card className="login-card"><div className="login-mark"><LogIn size={22} /></div><p className="eyebrow">WELCOME BACK</p><h1>School, connected.</h1><p className="login-copy">Sign in to your school space and pick up where you left off.</p>
      <form onSubmit={submit} className="login-form"><label>Email or username<input value={email} onChange={event => setEmail(event.target.value)} placeholder="any username" autoComplete="username" /></label><label>Password<input value={password} onChange={event => setPassword(event.target.value)} placeholder="any password" type="password" autoComplete="current-password" /></label><label>Sign in as<select value={role} onChange={event => setRole(event.target.value as Role)}><option>Student</option><option>Teacher</option><option>Principal</option></select></label><Button type="submit" className="full-button login-button">Continue as {role}<ArrowRight size={17} /></Button></form>
      <p className="demo-hint"><ShieldCheck size={14} />Demo access · Any credentials work</p>
    </Card>
    <p className="login-footer">A little more connected, every day.<br /><span>Demo workspace · Sample data</span></p>
  </div>;
}

function RoleDashboard({ role, go, openNotices }: { role: Role; go: (target: string) => void; openNotices: () => void }) {
  const copy = roleCopy[role];
  const RoleIcon = copy.icon;
  if (role === "Student") return null;
  const principal = role === "Principal";
  return <>
    <div className="greeting"><div><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>Good morning, {copy.name.split(" ").slice(-1)[0]}.</span></div><Avatar className="student-avatar"><AvatarFallback>{principal ? "MK" : "PS"}</AvatarFallback></Avatar></div>
    <Card className="student-card role-card"><div className="student-card-top"><Badge className="student-badge"><RoleIcon size={13} /> {copy.eyebrow}</Badge><span>2026–27</span></div><div className="student-card-main"><div><h2>{copy.name}</h2><p>{copy.subtitle}</p></div><Button size="icon" className="student-arrow" aria-label="View profile" onClick={() => go("Profile")}><ArrowRight size={21} /></Button></div><div className="student-card-footer"><ShieldCheck size={15} /><span>{principal ? "Every decision shapes a better school day." : "Your students are ready to learn."}</span></div></Card>
    <div className="summary-grid"><Button variant="outline" className="summary-card" onClick={() => go(principal ? "Attendance" : "Timetable")}><span><CheckCheck size={19} />{principal ? "Attendance" : "Today"}<ArrowRight size={14} /></span><strong>{principal ? "92.4" : "05"}<span>{principal ? "%" : " classes"}</span></strong><small>{principal ? "Whole school this week" : "Your planned periods"}</small><Progress value={principal ? 92.4 : 80} aria-label="Role summary" /></Button><Button variant="outline" className="summary-card" onClick={openNotices}><span><Megaphone size={19} />Updates<ArrowRight size={14} /></span><strong>{principal ? "08" : "03"}<span> new</span></strong><small>{principal ? "Needs your attention" : "School notices to review"}</small><div className="task-markers"><span /><span /><span className="done" /></div></Button></div>
    <Section title={principal ? "School overview" : "Your teaching day"}><div className="quick-grid">{(principal ? [{ label: "Attendance", icon: CheckCheck, page: "Attendance" }, { label: "Notices", icon: Megaphone, page: "Notices" }, { label: "Fees", icon: CreditCard, page: "Fees" }, { label: "Profile", icon: UserRound, page: "Profile" }] : [{ label: "Timetable", icon: CalendarDays, page: "Timetable" }, { label: "Homework", icon: BookOpen, page: "Homework" }, { label: "Notices", icon: Megaphone, page: "Notices" }, { label: "Profile", icon: UserRound, page: "Profile" }]).map(item => <Button key={item.label} variant="ghost" className="quick-action" onClick={() => item.label === "Notices" ? openNotices() : go(item.page)}><IconTile icon={item.icon} /><span>{item.label}</span></Button>)}</div></Section>
    <Section title={principal ? "Needs your attention" : "Next in your day"} action="View all" onClick={openNotices}><Card className="next-class"><div className="next-class-top"><Badge variant="secondary">{principal ? "SCHOOL UPDATE" : "PERIOD 01"}</Badge><span><Clock3 size={14} />{principal ? "This week" : "09:00 – 09:45 AM"}</span></div><div className="class-details"><IconTile icon={principal ? ClipboardList : Plus} dark /><div><h3>{principal ? "Attendance review" : "Mathematics · Class 8A"}</h3><p>{principal ? "Review attendance trends before Friday." : "Linear equations · Room 204"}</p></div><ChevronRight size={18} /></div><div className="class-footer"><span><UserRound size={14} />{principal ? "Academic office" : "24 students"}</span><span><MapPin size={14} />{principal ? "Main office" : "Room 204"}</span></div></Card></Section>
    <Section title={principal ? "Latest notice" : "Classroom reminders"}><Card className="notice-preview"><span className="notice-date">26<small>SEP</small></span><div><Badge variant="secondary">SCHOOL UPDATE</Badge><h3>{principal ? "Parent–teacher meet" : "Submit weekly lesson plan"}</h3><p>{principal ? "A conversation about the term ahead." : "Due by Thursday · Staff room"}</p></div><Button variant="ghost" size="icon" aria-label="Read notice" onClick={openNotices}><ChevronRight /></Button></Card></Section>
  </>;
}

export default function SchoolApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("Student");
  const [page, setPage] = useState("Home");
  const [day, setDay] = useState("21");
  const [filter, setFilter] = useState("Pending");
  const [completed, setCompleted] = useState<number[]>([]);
  const [paid, setPaid] = useState(false);
  const [dialog, setDialog] = useState<{ title: string; description: string; kind?: string; id?: number } | null>(null);
  const [read, setRead] = useState(false);
  const pending = homework.filter(h => !completed.includes(h.id));
  const openTask = (h: typeof homework[number]) => setDialog({ title: h.title, description: h.description, kind: "homework", id: h.id });
  const go = (target: string) => { setPage(target); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const activeNav = nav.some(n => n.name === page) ? page : "More";
  const openNotices = () => { setRead(true); go("Notices"); };
  if (!loggedIn) return <div className="prototype-stage"><div className="desktop-brand"><GraduationCap size={24} /><span>schoolday<span className="brand-dot">.</span></span><Badge variant="outline">INTERACTIVE PROTOTYPE</Badge></div><LoginScreen onLogin={nextRole => { setRole(nextRole); setLoggedIn(true); setPage("Home"); }} /></div>;

  function taskCard(h: typeof homework[number]) {
    return <Card key={h.id} className="task-card"><button className="task-content" onClick={() => openTask(h)}><div className="task-top"><span className="subject-label"><h.icon size={15} />{h.subject}</span><span className="due">{completed.includes(h.id) ? "Completed" : `Due ${h.due.toLowerCase()}`}</span></div><h3>{h.title}</h3><div className="task-bottom"><span>Class 8 · Section A</span><ArrowRight size={17} /></div></button></Card>;
  }

  return <div className="prototype-stage">
    <div className="desktop-brand"><GraduationCap size={24} /><span>schoolday<span className="brand-dot">.</span></span><Badge variant="outline">INTERACTIVE PROTOTYPE</Badge></div>
    <div className="app-shell">
      <header className="app-header"><button className="school-brand" onClick={() => go("Home")} aria-label="Schoolday home"><span className="brand-icon"><GraduationCap size={23} /></span><span>schoolday<span className="brand-dot">.</span><small>GREENWOOD PUBLIC SCHOOL</small></span></button><div className="header-actions"><Badge variant="secondary" className="role-pill">{role}</Badge><Button size="icon" variant="outline" className="notification-button" aria-label="View notifications" onClick={openNotices}><Bell size={20} />{!read && <span className="notification-dot" />}</Button><Button variant="ghost" className="sign-out" onClick={() => setLoggedIn(false)}>Sign out</Button></div></header>
      <main>
        {page === "Home" ? <>
          <RoleDashboard role={role} go={go} openNotices={openNotices} />
          {role === "Student" && <>
          <div className="greeting"><div><p>MONDAY, 21 SEPTEMBER</p><h1>A good day to learn.</h1><span>Let’s make it a great one, Aarav.</span></div><button aria-label="Open student profile" onClick={() => go("Profile")}><Avatar className="student-avatar"><AvatarFallback>AS</AvatarFallback></Avatar></button></div>
          <Card className="student-card"><div className="student-card-top"><Badge className="student-badge"><GraduationCap size={13} /> STUDENT SPACE</Badge><span>2026–27</span></div><div className="student-card-main"><div><h2>Aarav Sharma</h2><p>Class 8 <span>·</span> Section A <span>·</span> Roll no. 12</p></div><Button size="icon" className="student-arrow" onClick={() => go("Profile")} aria-label="View student details"><ArrowRight size={21} /></Button></div><div className="student-card-footer"><ShieldCheck size={15} /><span>A little progress, every day.</span></div></Card>
          <div className="summary-grid"><Button variant="outline" className="summary-card" onClick={() => go("Attendance")}><span><CheckCheck size={19} />Attendance<ArrowRight size={14} /></span><strong>95.2<span>%</span></strong><small>20 of 21 school days</small><Progress value={95.2} aria-label="Attendance 95.2 percent" /></Button><Button variant="outline" className="summary-card" onClick={() => go("Homework")}><span><ClipboardList size={19} />Homework<ArrowRight size={14} /></span><strong>{String(pending.length).padStart(2, "0")}<span> tasks</span></strong><small>{pending.length ? "A little focus goes a long way" : "You’re all caught up!"}</small><div className="task-markers">{homework.map(h => <span key={h.id} className={completed.includes(h.id) ? "done" : ""} />)}</div></Button></div>
          <Section title="Your school, one tap away"><div className="quick-grid">{[{ label: "Timetable", icon: CalendarDays }, { label: "Attendance", icon: CheckCheck }, { label: "Fees", icon: CreditCard }, { label: "Notices", icon: Megaphone }].map(item => <Button key={item.label} variant="ghost" className="quick-action" onClick={() => item.label === "Notices" ? openNotices() : go(item.label)}><IconTile icon={item.icon} /><span>{item.label}</span></Button>)}</div></Section>
          <Section title="Up next" action="Full timetable" onClick={() => go("Timetable")}><Card className="next-class"><div className="next-class-top"><Badge variant="secondary">PERIOD 01</Badge><span><Clock3 size={14} />09:00 – 09:45 AM</span></div><div className="class-details"><IconTile icon={Plus} dark /><div><h3>Mathematics</h3><p>Linear equations</p></div><Button variant="ghost" size="icon" onClick={() => setDialog({ title: "Mathematics · Period 01", description: "Linear equations with Ms. Priya Sharma. Monday, 21 September, 09:00–09:45 AM in Room 204. Bring your textbook and mathematics notebook." })} aria-label="View mathematics class"><ChevronRight /></Button></div><div className="class-footer"><span><UserRound size={14} />Ms. Priya Sharma</span><span><MapPin size={14} />Room 204</span></div></Card></Section>
          <Section title="A little homework" action="View all" onClick={() => go("Homework")}>{pending.length ? <div className="task-stack">{pending.slice(0, 2).map(taskCard)}</div> : <Card className="empty-state"><CheckCheck /><h3>All done for now.</h3><p>Enjoy a well-earned break.</p></Card>}</Section>
          <Section title="Around the school" action="All notices" onClick={openNotices}><Card className="notice-preview"><span className="notice-date">26<small>SEP</small></span><div><Badge variant="secondary">SCHOOL UPDATE</Badge><h3>Parent–teacher meet</h3><p>A conversation about your progress.</p></div><Button variant="ghost" size="icon" aria-label="Read parent-teacher notice" onClick={() => setDialog({ title: notices[0].title, description: notices[0].text })}><ChevronRight /></Button></Card></Section>
          </>}
        </> : <>
          <div className="page-heading"><Button variant="outline" size="icon" onClick={() => go("Home")} aria-label="Back to home"><ArrowLeft /></Button><div><p>YOUR STUDENT SPACE</p><h1>{page}</h1></div></div>
          {page === "Timetable" && <><div className="intro-line"><h2>September 2026</h2><Badge variant="secondary">5 classes a day</Badge></div><Tabs value={day} onValueChange={setDay}><TabsList className="week-selector">{["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => <TabsTrigger key={d} value={String(21 + i)}><span>{d}</span><strong>{21 + i}</strong></TabsTrigger>)}</TabsList></Tabs><div className="timeline">{lessons.map((_, i) => { const lesson = lessons[(i + Number(day) - 21) % lessons.length]; return <div className="timeline-item" key={i}><div className="time-label"><strong>{lessons[i].time}</strong><span>{lessons[i].end}</span></div><Card className="lesson-card"><span className="subject-label">PERIOD {String(i + 1).padStart(2, "0")}</span><h3>{lesson.subject}</h3><p>{lesson.topic}</p><small>{lesson.teacher} · {lesson.room}</small></Card></div>; })}</div><p className="footnote"><Clock3 size={15} />Lunch break · 12:00 – 1:00 PM</p></>}
          {page === "Homework" && <><p className="page-intro">Small steps. Stronger understanding.</p><Tabs value={filter} onValueChange={setFilter}><TabsList className="filter-tabs"><TabsTrigger value="Pending">Pending ({pending.length})</TabsTrigger><TabsTrigger value="Completed">Completed ({completed.length})</TabsTrigger></TabsList></Tabs><div className="task-stack homework-list">{homework.filter(h => filter === "Pending" ? !completed.includes(h.id) : completed.includes(h.id)).map(taskCard)}{(filter === "Pending" ? pending.length === 0 : completed.length === 0) && <Card className="empty-state"><BookOpen /><h3>{filter === "Pending" ? "You’re all caught up!" : "Your progress starts here."}</h3><p>{filter === "Pending" ? "No homework left to complete." : "Open a task and mark it complete when you’re done."}</p></Card>}</div></>}
          {page === "Attendance" && <><Card className="attendance-summary"><IconTile icon={CheckCheck} /><span>SEPTEMBER ATTENDANCE</span><strong>95.2<small>%</small></strong><p>You’re showing up for your future.</p><Progress value={95.2} aria-label="Attendance 95.2 percent" /><div><span><b>20</b> Present</span><span><b>1</b> Absent</span><span><b>21</b> School days</span></div></Card><Section title="September 2026"><Card className="calendar"><div className="calendar-grid">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span className="calendar-day" key={`day-${i}`}>{d}</span>)}<span />{Array.from({ length: 30 }, (_, i) => { const n = i + 1; const weekend = [5, 6].includes((n + 1) % 7) || n === 30; return <span key={n} className={`calendar-date ${weekend ? "weekend" : n === 10 ? "absent" : "present"}`}>{n}</span>; })}</div><div className="calendar-legend"><span><i />Present</span><span><i className="absent" />Absent</span><span><i className="weekend" />Holiday</span></div></Card><p className="footnote">Sample monthly record · 10 Sep: absent · 30 Sep: holiday</p></Section></>}
          {page === "Fees" && <><Card className="fee-summary"><span>TERM 2 · SEPTEMBER – DECEMBER</span><h2>{paid ? "All settled." : "₹12,500"}</h2><p>{paid ? "Your demo payment has been recorded." : "Due by 30 September 2026"}</p><Badge variant="secondary">{paid ? "Paid · Demo" : "Payment pending"}</Badge></Card><Section title="Fee breakdown"><Card className="breakdown">{[["Tuition fee", "₹10,000"], ["Activity fee", "₹1,500"], ["Library & resources", "₹1,000"]].map(([title, amount]) => <div key={title}><span>{title}</span><strong>{amount}</strong></div>)}<div className="total"><span>Total</span><strong>₹12,500</strong></div></Card></Section><Button className="full-button" onClick={() => setDialog({ title: paid ? "Payment receipt" : "Try a demo payment", description: paid ? "Receipt DEMO-2026-002 · Aarav Sharma · Class 8 A · Term 2 · ₹12,500. This is a simulated payment receipt." : "Record a simulated payment of ₹12,500 for Term 2. No money will be charged and no payment details are needed.", kind: paid ? undefined : "payment" })}>{paid ? <FileText /> : <CreditCard />}{paid ? "View demo receipt" : "Pay ₹12,500 · Demo"}</Button><p className="footnote"><ShieldCheck size={15} />Prototype only. No real payments.</p></>}
          {page === "Notices" && <><p className="page-intro">The latest from your school community.</p><div className="task-stack">{notices.map(n => <Card key={n.title} className="notice-card"><div className="task-top"><span className="subject-label"><n.icon size={16} />{n.category}</span><small>{n.date}</small></div><h3>{n.title}</h3><p>{n.text}</p><Button variant="ghost" className="text-link" onClick={() => setDialog({ title: n.title, description: n.text })}>Read notice<ArrowRight size={15} /></Button></Card>)}</div></>}
          {page === "More" && <><Card className="profile-preview"><Avatar className="student-avatar"><AvatarFallback>AS</AvatarFallback></Avatar><h2>Aarav Sharma</h2><p>Class 8 · Section A</p><Button variant="outline" onClick={() => go("Profile")}>View profile<ArrowRight size={15} /></Button></Card><Section title="School essentials"><Card className="menu-card">{[{ title: "Attendance", subtitle: "Every school day counts", icon: CheckCheck }, { title: "Fees", subtitle: paid ? "Term 2 paid · Demo" : "Term 2 payment details", icon: CreditCard }, { title: "Notices", subtitle: "Stay in the school loop", icon: Megaphone }, { title: "Profile", subtitle: "Your student information", icon: UserRound }].map(item => <ListRow key={item.title} {...item} onClick={() => go(item.title)} />)}</Card></Section><Section title="Here to help"><Card className="menu-card"><ListRow icon={CircleHelp} title="School office" subtitle="Contact and office hours" onClick={() => setDialog({ title: "School office", description: "Greenwood Public School · Monday–Friday, 8:00 AM–4:00 PM. Demo contact: office@greenwood.example. Please visit the reception for help with attendance, fees, or student records." })} /></Card></Section></>}
          {page === "Profile" && <><Card className="profile-preview"><Avatar className="student-avatar"><AvatarFallback>AS</AvatarFallback></Avatar><h2>Aarav Sharma</h2><Badge variant="secondary">STUDENT · 2026–27</Badge></Card><Section title="Student details"><Card className="breakdown">{[["Student ID", "GPS-2026-0812"], ["Class & section", "8 A"], ["Roll number", "12"], ["Class teacher", "Ms. Priya Sharma"], ["Parent / guardian", "Ravi Sharma"], ["School", "Greenwood Public School"]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</Card></Section><p className="footnote">These are sample student details for the prototype.</p></>}
        </>}
        <footer className="app-footer"><GraduationCap size={16} /><span>A little more connected, every day.</span><small>Demo workspace · Sample data</small></footer>
      </main>
      <nav className="bottom-nav" aria-label="Main navigation">{nav.map(({ name, icon: Icon }) => <Button key={name} variant="ghost" className={activeNav === name ? "active" : ""} aria-current={activeNav === name ? "page" : undefined} onClick={() => go(name)}><Icon size={22} strokeWidth={activeNav === name ? 2.2 : 1.7} /><span>{name}</span>{activeNav === name && <i />}</Button>)}</nav>
    </div>
    <div className="desktop-caption"><span>MOBILE WEB EXPERIENCE</span><span>Made for the everyday school day.</span></div>
    <Dialog open={!!dialog} onOpenChange={open => !open && setDialog(null)}><DialogContent className="detail-dialog"><DialogHeader><IconTile icon={dialog?.kind === "payment" ? CreditCard : dialog?.kind === "homework" ? BookOpen : FileText} /><DialogTitle>{dialog?.title}</DialogTitle><DialogDescription>{dialog?.description}</DialogDescription></DialogHeader>{dialog?.kind === "homework" && <><p className="dialog-meta">Your progress is kept for this demo session.</p><Button className="full-button" onClick={() => { const id = dialog.id!; setCompleted(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); setDialog(null); }}>{completed.includes(dialog.id!) ? "Move back to pending" : <><Check />Mark as complete</>}</Button></>}{dialog?.kind === "payment" && <Button className="full-button" onClick={() => { setPaid(true); setDialog({ title: "Payment recorded", description: "Your demo payment of ₹12,500 is complete. Receipt DEMO-2026-002 is available on the Fees screen. No real payment was made." }); }}><ShieldCheck />Confirm demo payment</Button>}</DialogContent></Dialog>
  </div>;
}
