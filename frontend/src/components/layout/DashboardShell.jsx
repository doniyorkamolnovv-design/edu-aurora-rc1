import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { GraduationCap, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ROLE_LABELS } from '../../constants/roleLabels'
import RealtimeMessageToast from '../common/RealtimeMessageToast'
import { useUnreadChat } from '../../hooks/useUnreadChat'

export default function DashboardShell({ navItems }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [more, setMore] = useState(false)
  const { unreadCount } = useUnreadChat()
  const main = navItems.slice(0, 4)
  const rest = navItems.slice(4)
  const name = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email?.split('@')[0] || 'Foydalanuvchi'
  const role = ROLE_LABELS[user?.role] || 'Foydalanuvchi'
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'U'
  const signOut = () => { logout(); navigate('/login', { replace: true }) }

  return <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <RealtimeMessageToast />

    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-[#E2E8F0] bg-[#0F172A] xl:flex xl:flex-col">
      <div className="flex h-20 items-center gap-3 px-5 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#14B8A6]"><GraduationCap size={22}/></div>
        <div><p className="text-sm font-black tracking-tight">EDU PLATFORM</p><p className="text-[10px] font-medium text-white/45">Ta’lim boshqaruvi</p></div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {navItems.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} className={({isActive}) => `mb-1 flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[13px] font-bold transition ${isActive ? 'bg-white text-[#0F172A]' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}><div className="relative"><Icon size={18}/>{label === 'Xabarlar' && unreadCount > 0 && <span className="absolute -right-2.5 -top-2.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#F43F5E] px-1 text-[9px] font-black leading-none text-white ring-2 ring-[#0F172A]">{unreadCount > 99 ? '99+' : unreadCount}</span>}</div><span>{label}</span></NavLink>)}
      </nav>
      <div className="border-t border-white/10 p-3"><button onClick={signOut} className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-bold text-white/55 hover:bg-white/5 hover:text-white"><LogOut size={18}/>Chiqish</button></div>
    </aside>

    <div className="min-h-screen xl:pl-[264px]">
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 xl:hidden"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F172A] text-white"><GraduationCap size={18}/></div><div><p className="text-xs font-black leading-none">EDU</p><p className="mt-1 text-[9px] font-semibold text-[#64748B]">{role}</p></div></div>
          <div className="hidden xl:block"><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#94A3B8]">{role}</p><p className="mt-0.5 text-sm font-extrabold">{name}</p></div>
          <button onClick={() => setMore(true)} className="flex items-center gap-2 rounded-2xl p-1.5 hover:bg-white"><div className="hidden text-right sm:block"><p className="text-xs font-extrabold">{name}</p><p className="text-[10px] text-[#64748B]">{role}</p></div><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CCFBF1] text-xs font-black text-[#0F766E]">{initials}</div></button>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-5 pb-28 sm:px-6 sm:py-7 xl:pb-9"><Outlet/></main>
    </div>

    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E2E8F0] bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_35px_rgba(15,23,42,.06)] backdrop-blur-xl xl:hidden">
      <div className="mx-auto flex h-[70px] max-w-xl items-center px-1">
        {main.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} className="flex h-full flex-1 flex-col items-center justify-center gap-1">{({isActive}) => <><div className={`flex h-8 w-12 items-center justify-center rounded-xl transition ${isActive ? 'bg-[#CCFBF1] text-[#0F766E]' : 'text-[#94A3B8]'}`}><div className="relative"><Icon size={19} strokeWidth={isActive?2.5:2}/>{label === 'Xabarlar' && unreadCount > 0 && <span className="absolute -right-3 -top-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#F43F5E] px-1 text-[8px] font-black leading-none text-white ring-2 ring-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}</div></div><span className={`max-w-[72px] truncate text-[9px] font-extrabold ${isActive?'text-[#0F766E]':'text-[#94A3B8]'}`}>{label}</span></>}</NavLink>)}
        <button onClick={()=>setMore(true)} className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-[#94A3B8]"><div className="flex h-8 w-12 items-center justify-center rounded-xl"><Menu size={20}/></div><span className="text-[9px] font-extrabold">Menyu</span></button>
      </div>
    </nav>

    {more && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0F172A]/45 backdrop-blur-[3px] xl:hidden" onMouseDown={()=>setMore(false)}><div onMouseDown={e=>e.stopPropagation()} className="w-full max-w-xl rounded-t-[30px] bg-white p-4 pb-[calc(18px+env(safe-area-inset-bottom))] shadow-2xl [animation:sheetUp_.2s_ease-out]">
      <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CCFBF1] font-black text-[#0F766E]">{initials}</div><div><p className="text-sm font-extrabold">{name}</p><p className="text-xs text-[#64748B]">{role}</p></div></div><button onClick={()=>setMore(false)} className="rounded-xl bg-[#F1F5F9] p-2.5 text-[#64748B]"><X size={18}/></button></div>
      <div className="max-h-[52vh] overflow-y-auto rounded-2xl border border-[#E2E8F0]">{rest.map(({to,label,icon:Icon})=><NavLink onClick={()=>setMore(false)} key={to} to={to} className="flex items-center gap-3 border-b border-[#E2E8F0] px-4 py-3.5 last:border-0"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0FDFA] text-[#0F766E]"><div className="relative"><Icon size={18}/>{label === 'Xabarlar' && unreadCount > 0 && <span className="absolute -right-2.5 -top-2.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#F43F5E] px-1 text-[8px] font-black text-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}</div></div><span className="flex-1 text-sm font-bold">{label}</span><ChevronRight size={17} className="text-[#CBD5E1]"/></NavLink>)}</div>
      <button onClick={signOut} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F172A] py-3.5 text-sm font-bold text-white"><LogOut size={17}/>Hisobdan chiqish</button>
    </div></div>}
  </div>
}
