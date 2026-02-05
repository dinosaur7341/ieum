
import React, { useState } from 'react';
import { View } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AdminAuthProps {
  setView: (view: View) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ setView }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setView('ADMIN_DASHBOARD');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">관리자 인증</h1>
          <p className="text-slate-500 mt-2 text-sm">시스템 관리를 위해 비밀번호를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</p>}
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            접속하기
          </button>
          <button 
            type="button"
            onClick={() => setView('HOME')}
            className="w-full text-slate-400 text-sm hover:text-slate-600 py-2 transition"
          >
            홈으로 돌아가기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;
