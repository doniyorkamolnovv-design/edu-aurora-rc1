import PageHeader from '../../components/ui/PageHeader'
import TeacherProfileCard from '../../components/teacher/TeacherProfileCard'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/ui/EmptyState'
import { useCurrentTeacher } from '../../hooks/useCurrentTeacher'

function Profile() {
  const { teacher, isLoading } = useCurrentTeacher()

  return (
    <div>
      <PageHeader title="Profil" description="O‘qituvchi profilingiz." />
      {isLoading && <Loader />}
      {!isLoading && !teacher && (
        <EmptyState message="Hisobingiz hali biror o‘qituvchi profiliga biriktirilmagan." />
      )}
      {!isLoading && teacher && <TeacherProfileCard teacher={teacher} />}
    </div>
  )
}

export default Profile
