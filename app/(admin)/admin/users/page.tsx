import Link from 'next/link';
import { requireUser } from '@/lib/requireUser';
import { getAllUsers } from '@/app/server-actions/userActions';
import { UserRole } from '@/lib/types/UserRole';
import { formatDateToTurkey } from '@/lib/utils/dateFormatter';
import DeleteUserButton from './DeleteUserButton';
import UpdateUserRoleButton from './UpdateUserRoleButton';

export default async function UsersPage() {
  await requireUser('ADMIN');

  const usersResult = await getAllUsers();
  const users = usersResult.success && usersResult.data ? usersResult.data : [];

  const roleLabels: Record<string, string> = {
    [UserRole.ADMIN]: 'Yönetici',
    [UserRole.USER]: 'Kullanıcı',
  };

  const roleColors: Record<string, string> = {
    [UserRole.ADMIN]: 'bg-red-100 text-red-800 border-red-300',
    [UserRole.USER]: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tüm kullanıcıları görüntüleyin ve yönetin.
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue-dark transition-colors font-medium"
        >
          + Yeni Kullanıcı
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kullanıcı
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                E-posta
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rol
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kayıt Tarihi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!users || users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Henüz hiç kullanıcı bulunmamaktadır.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-blue-dark rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-extrabold text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-primary-blue transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">ID: #{user.id}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UpdateUserRoleButton
                      userId={user.id}
                      currentRole={user.role}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDateToTurkey(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-primary-blue hover:text-primary-blue-dark transition-colors"
                      >
                        Detay
                      </Link>
                      <DeleteUserButton
                        userId={user.id}
                        userName={user.name}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

