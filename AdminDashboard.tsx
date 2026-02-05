
import React, { useState } from 'react';
import { SocietyData, View, Club, Activity, Member, RegionType, MeetingMinute } from '../types';
import { REGIONS } from '../constants';

interface AdminDashboardProps {
  data: SocietyData;
  updateData: (data: SocietyData) => void;
  setView: (view: View) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, updateData, setView }) => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'CLUBS' | 'ACTIVITIES' | 'MINUTES' | 'GOVERNANCE'>('GENERAL');

  // Generic Handlers
  const handleDataUpdate = (field: keyof SocietyData, value: string) => {
    updateData({ ...data, [field]: value });
  };

  const removeItem = <T extends { id: string }>(list: T[], id: string, key: keyof SocietyData) => {
    const newList = list.filter(item => item.id !== id);
    updateData({ ...data, [key]: newList });
  };

  // Club Handlers
  const [newClub, setNewClub] = useState<Partial<Club>>({ region: '경인' as any, isStandingDirector: false });
  const addClub = () => {
    if (!newClub.name || !newClub.school) return alert('동아리 이름과 학교를 입력해주세요.');
    const club: Club = {
      id: Date.now().toString(),
      name: newClub.name!,
      school: newClub.school!,
      region: newClub.region as RegionType,
      description: newClub.description || '',
      isStandingDirector: newClub.isStandingDirector || false,
    };
    updateData({ ...data, clubs: [...data.clubs, club] });
    setNewClub({ region: '경인' as any, isStandingDirector: false });
  };

  // Activity Handlers
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({ year: new Date().getFullYear() });
  const addActivity = () => {
    if (!newActivity.title || !newActivity.content) return alert('활동 제목과 내용을 입력해주세요.');
    const activity: Activity = {
      id: Date.now().toString(),
      year: newActivity.year!,
      title: newActivity.title!,
      content: newActivity.content!,
    };
    updateData({ ...data, activities: [...data.activities, activity] });
    setNewActivity({ year: new Date().getFullYear() });
  };

  // Minutes Handlers
  const [newMinute, setNewMinute] = useState<Partial<MeetingMinute>>({ date: new Date().toISOString().split('T')[0] });
  const addMinute = () => {
    if (!newMinute.title || !newMinute.summary) return alert('회의 주제와 내용을 입력해주세요.');
    const minute: MeetingMinute = {
      id: Date.now().toString(),
      date: newMinute.date!,
      title: newMinute.title!,
      summary: newMinute.summary!,
    };
    updateData({ ...data, meetingMinutes: [...data.meetingMinutes, minute] });
    setNewMinute({ date: new Date().toISOString().split('T')[0] });
  };

  // Governance Handlers
  const [newMember, setNewMember] = useState<Partial<Member>>({ role: '최고위원' });
  const addMember = (type: 'supremeCouncil' | 'pastPresidents') => {
    if (!newMember.name) return alert('이름을 입력해주세요.');
    const member: Member = {
      id: Date.now().toString(),
      name: newMember.name!,
      role: newMember.role!,
      school: newMember.school,
      term: newMember.term,
    };
    updateData({ ...data, [type]: [...data[type], member] });
    setNewMember({ role: type === 'supremeCouncil' ? '최고위원' : '회장' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-1 rounded font-bold text-sm">CMS</div>
          <span className="font-bold tracking-tight">학회 관리 시스템</span>
        </div>
        <nav className="flex-grow py-4 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('GENERAL')}
            className={`w-full text-left px-6 py-3 transition ${activeTab === 'GENERAL' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            기본 정보 관리
          </button>
          <button 
            onClick={() => setActiveTab('GOVERNANCE')}
            className={`w-full text-left px-6 py-3 transition ${activeTab === 'GOVERNANCE' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            지도체제 명단 관리
          </button>
          <button 
            onClick={() => setActiveTab('CLUBS')}
            className={`w-full text-left px-6 py-3 transition ${activeTab === 'CLUBS' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            소속 동아리 관리
          </button>
          <button 
            onClick={() => setActiveTab('MINUTES')}
            className={`w-full text-left px-6 py-3 transition ${activeTab === 'MINUTES' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            학회 회의록 관리
          </button>
          <button 
            onClick={() => setActiveTab('ACTIVITIES')}
            className={`w-full text-left px-6 py-3 transition ${activeTab === 'ACTIVITIES' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            주요 활동 관리
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setView('HOME')}
            className="w-full bg-slate-800 hover:bg-slate-700 py-2 rounded text-sm transition"
          >
            홈페이지 바로가기
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-grow p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {activeTab === 'GENERAL' && '기본 정보 관리'}
            {activeTab === 'CLUBS' && '소속 동아리 관리'}
            {activeTab === 'GOVERNANCE' && '지도체제 및 명단 관리'}
            {activeTab === 'MINUTES' && '학회 회의록 관리'}
            {activeTab === 'ACTIVITIES' && '공식 활동 관리'}
          </h1>
          <div className="text-xs text-slate-500 bg-white px-3 py-1 rounded shadow-sm border border-slate-200">
            실시간 데이터 자동 저장중
          </div>
        </header>

        {/* General Content Management */}
        {activeTab === 'GENERAL' && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">로고 이미지 URL (정사각형 권장)</label>
              <div className="flex items-center space-x-4">
                <input 
                  type="text"
                  value={data.logoUrl}
                  onChange={(e) => handleDataUpdate('logoUrl', e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/logo.png"
                />
                {data.logoUrl && (
                   <img src={data.logoUrl} alt="Preview" className="w-12 h-12 rounded object-cover border" />
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">비어있을 경우 기본 '국' 텍스트 로고가 표시됩니다.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">메인 헤드라인 (HTML 가능)</label>
              <textarea 
                value={data.heroTitle}
                onChange={(e) => handleDataUpdate('heroTitle', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">서브 슬로건</label>
              <textarea 
                value={data.heroSubtitle}
                onChange={(e) => handleDataUpdate('heroSubtitle', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                rows={2}
              />
            </div>
          </div>
        )}

        {/* Clubs Management */}
        {activeTab === 'CLUBS' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">새 동아리 등록</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  placeholder="동아리명" 
                  value={newClub.name || ''} 
                  onChange={e => setNewClub({...newClub, name: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                />
                <input 
                  placeholder="학교명" 
                  value={newClub.school || ''} 
                  onChange={e => setNewClub({...newClub, school: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                />
                <select 
                  value={newClub.region} 
                  onChange={e => setNewClub({...newClub, region: e.target.value as any})}
                  className="px-4 py-2 border rounded-lg"
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <div className="flex items-center space-x-2 px-4 border rounded-lg bg-slate-50">
                  <input 
                    type="checkbox" 
                    id="isStanding"
                    checked={newClub.isStandingDirector} 
                    onChange={e => setNewClub({...newClub, isStandingDirector: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="isStanding" className="text-sm font-bold text-blue-800">상임이사 동아리 여부</label>
                </div>
              </div>
              <textarea 
                placeholder="동아리 활동 요약" 
                value={newClub.description || ''} 
                onChange={e => setNewClub({...newClub, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                rows={2}
              />
              <button onClick={addClub} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">동아리 등록</button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b font-bold text-sm text-slate-600">지부별/유형별 등록 리스트</div>
              <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-200 text-xs text-slate-400 uppercase">
                  <tr>
                    <th className="px-6 py-3 font-bold">구분</th>
                    <th className="px-6 py-3 font-bold">동아리명 / 소속학교</th>
                    <th className="px-6 py-3 font-bold">지부</th>
                    <th className="px-6 py-3 font-bold">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.clubs.map(club => (
                    <tr key={club.id}>
                      <td className="px-6 py-4">
                        {club.isStandingDirector ? (
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Standing</span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Normal</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{club.name}</div>
                        <div className="text-xs text-slate-500">{club.school}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{club.region}지부</td>
                      <td className="px-6 py-4">
                        <button onClick={() => removeItem(data.clubs, club.id, 'clubs')} className="text-red-500 text-xs font-bold hover:bg-red-50 px-2 py-1 rounded transition">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.clubs.length === 0 && <div className="p-8 text-center text-slate-400">등록된 동아리가 없습니다.</div>}
            </div>
          </div>
        )}

        {/* Governance Management */}
        {activeTab === 'GOVERNANCE' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Supreme Council */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">최고위원(지도부) 추가</h3>
                <div className="space-y-3">
                  <input 
                    placeholder="이름" 
                    value={newMember.name || ''} 
                    onChange={e => setNewMember({...newMember, name: e.target.value, role: '최고위원'})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    placeholder="학교 (예: ○○고등학교)" 
                    value={newMember.school || ''} 
                    onChange={e => setNewMember({...newMember, school: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button onClick={() => addMember('supremeCouncil')} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">지도부 명단 추가</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b font-bold text-sm text-slate-600">현직 최고위원 명단</div>
                <ul className="divide-y">
                  {data.supremeCouncil.map(m => (
                    <li key={m.id} className="p-4 flex justify-between items-center bg-white hover:bg-slate-50 transition">
                      <div>
                        <span className="font-bold">{m.name}</span>
                        <span className="text-xs text-slate-500 ml-2">({m.school})</span>
                      </div>
                      <button onClick={() => removeItem(data.supremeCouncil, m.id, 'supremeCouncil')} className="text-red-500 text-xs font-bold">삭제</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Past Presidents */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">역대 회장단 추가</h3>
                <div className="space-y-3">
                  <input 
                    placeholder="역할 (예: 5대 회장)" 
                    value={newMember.role || ''} 
                    onChange={e => setNewMember({...newMember, role: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    placeholder="이름" 
                    value={newMember.name || ''} 
                    onChange={e => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input 
                    placeholder="임기 (예: 2023-2024)" 
                    value={newMember.term || ''} 
                    onChange={e => setNewMember({...newMember, term: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button onClick={() => addMember('pastPresidents')} className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold">역대 회장 등록</button>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b font-bold text-sm text-slate-600">역대 회장단 명단</div>
                <ul className="divide-y">
                  {data.pastPresidents.map(m => (
                    <li key={m.id} className="p-4 flex justify-between items-center bg-white hover:bg-slate-50 transition">
                      <div>
                        <span className="text-blue-700 text-xs font-bold mr-2 uppercase">{m.role}</span>
                        <span className="font-bold">{m.name}</span>
                        <span className="text-xs text-slate-400 ml-2">{m.term}</span>
                      </div>
                      <button onClick={() => removeItem(data.pastPresidents, m.id, 'pastPresidents')} className="text-red-500 text-xs font-bold">삭제</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Minutes Management */}
        {activeTab === 'MINUTES' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">새 회의록 작성</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input 
                  type="date" 
                  value={newMinute.date} 
                  onChange={e => setNewMinute({...newMinute, date: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                />
                <input 
                  placeholder="회의 주제" 
                  value={newMinute.title || ''} 
                  onChange={e => setNewMinute({...newMinute, title: e.target.value})}
                  className="col-span-2 px-4 py-2 border rounded-lg"
                />
              </div>
              <textarea 
                placeholder="회의 주요 의결 사항 및 요약" 
                value={newMinute.summary || ''} 
                onChange={e => setNewMinute({...newMinute, summary: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                rows={3}
              />
              <button onClick={addMinute} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">회의록 등록</button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b font-bold text-sm text-slate-600">전체 회의록 리스트</div>
              <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-200 text-xs text-slate-400 uppercase">
                  <tr>
                    <th className="px-6 py-3 font-bold">일자</th>
                    <th className="px-6 py-3 font-bold">주제</th>
                    <th className="px-6 py-3 font-bold">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.meetingMinutes.sort((a,b) => b.date.localeCompare(a.date)).map(minute => (
                    <tr key={minute.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">{minute.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{minute.title}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => removeItem(data.meetingMinutes, minute.id, 'meetingMinutes')} className="text-red-500 text-xs font-bold">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.meetingMinutes.length === 0 && <div className="p-8 text-center text-slate-400">작성된 회의록이 없습니다.</div>}
            </div>
          </div>
        )}

        {/* Activities Management */}
        {activeTab === 'ACTIVITIES' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4">새 활동 내용 등록</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input 
                  type="number" 
                  value={newActivity.year} 
                  onChange={e => setNewActivity({...newActivity, year: parseInt(e.target.value)})}
                  className="px-4 py-2 border rounded-lg"
                />
                <input 
                  placeholder="활동 제목" 
                  value={newActivity.title || ''} 
                  onChange={e => setNewActivity({...newActivity, title: e.target.value})}
                  className="col-span-2 px-4 py-2 border rounded-lg"
                />
              </div>
              <textarea 
                placeholder="활동 상세 설명" 
                value={newActivity.content || ''} 
                onChange={e => setNewActivity({...newActivity, content: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg mb-4"
                rows={3}
              />
              <button onClick={addActivity} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">활동 게시</button>
            </div>

            <div className="space-y-4">
              {data.activities.sort((a,b) => b.year - a.year).map(act => (
                <div key={act.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-start shadow-sm hover:border-blue-200 transition">
                  <div className="flex-grow">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2 uppercase">{act.year} Year Activity</span>
                    <h4 className="inline font-bold text-lg text-slate-900 ml-1">{act.title}</h4>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{act.content}</p>
                  </div>
                  <button onClick={() => removeItem(data.activities, act.id, 'activities')} className="ml-4 text-red-500 text-xs font-bold border border-red-100 hover:bg-red-50 px-2 py-1 rounded transition">삭제</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
