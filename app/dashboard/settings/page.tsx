'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export default function SettingsPage() {
  const supabase = createClient();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      (await supabase.auth.getUser()).data.user?.email || '',
      {
        redirectTo: `${window.location.origin}/auth/callback?redirect_to=/auth/update-password`,
      }
    );
    
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Revisa tu correo para cambiar la contraseña' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>
        
        {message && (
          <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Seguridad</h3>
            <p className="mt-1 text-sm text-gray-500">Cambia tu contraseña o administra tu cuenta</p>
            <button
              onClick={handleChangePassword}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cambiar contraseña
            </button>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900">Sesiones activas</h3>
            <p className="mt-1 text-sm text-gray-500">Administra tus sesiones activas</p>
            <button
              onClick={() => supabase.auth.signOut()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Cerrar todas las sesiones
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}