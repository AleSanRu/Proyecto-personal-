import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';

export const fetchCache = 'force-no-store'; // 👈 Esta línea evita el prerenderizado
export const dynamic = 'force-dynamic';      // 👈 Esta línea fuerza SSR dinámico

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}