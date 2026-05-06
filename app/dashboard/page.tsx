export const dynamic = "force-dynamic";

import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

// Este componente ahora es la versión "cliente" de las estadísticas
async function StatsCardsContent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Bienvenido/a</dt>
                <dd className="text-lg font-medium text-gray-900">{user?.email}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Estado</dt>
                <dd className="text-lg font-medium text-green-600">Activo</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomePanel() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido/a!</h2>
      <p className="mt-2 text-gray-600">
        Este es tu panel de control. Aquí podrás gestionar toda la información de tu cuenta.
      </p>
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Tu sesión está activa. Puedes acceder a todas las funcionalidades protegidas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Este es el componente principal que se exporta
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={
        <div className="bg-white shadow rounded-lg p-5 text-center">
          <p className="text-gray-500">Cargando información del usuario...</p>
        </div>
      }>
        <StatsCardsContent />
      </Suspense>
      
      <WelcomePanel />
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Contenido principal</h3>
        <p className="mt-2 text-gray-600">
          Aquí puedes agregar gráficos, listas o cualquier otro contenido que necesites.
        </p>
      </div>
    </div>
  );
}