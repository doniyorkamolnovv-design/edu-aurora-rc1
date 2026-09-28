import { User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ROLE_LABELS } from '../../constants/roleLabels'
import PageHeader from '../ui/PageHeader'

function ProfileOverview() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title="Profil" description="Hisobingiz haqidagi ma’lumotlar." />
      <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={22} />
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.email}</p>
            <p className="text-sm text-gray-500">{ROLE_LABELS[user?.role]}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Qo‘shimcha profil ma’lumotlari (rasm, telefon va h.k.) keyinroq qo‘shiladi.
        </p>
      </div>
    </div>
  )
}

export default ProfileOverview
