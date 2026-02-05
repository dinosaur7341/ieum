
import React from 'react';
import { SocietyData, View, RegionType } from '../types';
import { REGIONS } from '../constants';

interface HomeProps {
  data: SocietyData;
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ data, setView }) => {
  const standingClubs = data.clubs.filter(c => c.isStandingDirector);
  const nonStandingClubs = data.clubs.filter(c => !c.isStandingDirector);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              {data.logoUrl ? (
                <img 
                  src={data.logoUrl} 
                  alt="Logo" 
                  className="w-10 h-10 rounded object-cover border border-slate-100 shadow-sm"
                />
              ) : (
                <div className="bg-blue-800 text-white p-2 rounded font-bold text-xl w-10 h-10 flex items-center justify-center">국</div>
              )}
              <span className="font-bold text-xl tracking-tight text-blue-900">전국고교인문정치학회</span>
            </div>
            {/* Top Navigation Links Removed as per request */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight whitespace-pre-wrap">
            {data.heroTitle}
          </h1>
          <p className="text-xl text-blue-100 font-light opacity-90">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Supreme Council Section */}
        <section id="governance">
          <h2 className="text-2xl font-bold border-l-4 border-blue-700 pl-4 mb-8">최고위원 및 역대 회장</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">최고위원 명단</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.supremeCouncil.map(member => (
                  <div key={member.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-xs">Profile</div>
                    <div>
                      <div className="font-bold text-md">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.school}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">역대 회장 명단</h3>
              <div className="space-y-3">
                {data.pastPresidents.map(president => (
                  <div key={president.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="font-bold text-blue-900">{president.role}</span>
                    <span className="font-medium">{president.name}</span>
                    <span className="text-xs text-slate-500">{president.term}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Club Categorization Section */}
        <section id="clubs">
          <h2 className="text-2xl font-bold border-l-4 border-blue-700 pl-4 mb-8">소속 동아리 체계</h2>
          
          <div className="space-y-12">
            {/* Standing Directors */}
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                <span className="bg-blue-100 px-3 py-1 rounded mr-2">상임이사 동아리</span>
                <span className="text-sm font-normal text-slate-500 ml-auto">중앙 운영 의사결정 참여</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {standingClubs.map(club => (
                  <div key={club.id} className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                    <h4 className="text-xl font-bold mb-1 text-slate-900">{club.name}</h4>
                    <p className="text-sm text-blue-700 mb-2 font-medium">{club.school}</p>
                    <p className="text-sm text-slate-600">{club.description}</p>
                  </div>
                ))}
                {standingClubs.length === 0 && <p className="text-slate-400 italic">등록된 상임이사 동아리가 없습니다.</p>}
              </div>
            </div>

            {/* Non-Standing Directors */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <span className="bg-slate-100 px-3 py-1 rounded mr-2">비상임이사 동아리</span>
                <span className="text-sm font-normal text-slate-500 ml-auto">일반 회원 활동 및 협력</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nonStandingClubs.map(club => (
                  <div key={club.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-xl font-bold mb-1 text-slate-900">{club.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{club.school}</p>
                    <p className="text-sm text-slate-600">{club.description}</p>
                  </div>
                ))}
                {nonStandingClubs.length === 0 && <p className="text-slate-400 italic">등록된 비상임이사 동아리가 없습니다.</p>}
              </div>
            </div>

            {/* Regional Chapters */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-6">지부별 동아리 현황</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {REGIONS.map(region => {
                  const regionClubs = data.clubs.filter(c => c.region === region);
                  return (
                    <div key={region} className="group">
                      <div className="text-sm font-bold text-blue-900 mb-3 pb-1 border-b-2 border-blue-100 flex justify-between items-center group-hover:border-blue-500 transition">
                        <span>{region}지부</span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-1.5 rounded">{regionClubs.length}</span>
                      </div>
                      <div className="space-y-2">
                        {regionClubs.map(club => (
                          <div key={club.id} className="text-sm text-slate-600 hover:text-blue-600 cursor-default">
                            • {club.name} <span className="text-[10px] text-slate-400 ml-1">({club.school})</span>
                          </div>
                        ))}
                        {regionClubs.length === 0 && <span className="text-xs text-slate-300 italic">활동 동아리 없음</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Minutes Section */}
        <section id="minutes">
          <h2 className="text-2xl font-bold border-l-4 border-blue-700 pl-4 mb-8">학회 회의록</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">일자</th>
                  <th className="px-6 py-4">회의 주제</th>
                  <th className="px-6 py-4 hidden md:table-cell">요약 내용</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.meetingMinutes.sort((a,b) => b.date.localeCompare(a.date)).map(minute => (
                  <tr key={minute.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-500 whitespace-nowrap">{minute.date}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{minute.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{minute.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.meetingMinutes.length === 0 && (
              <div className="p-12 text-center text-slate-400">등록된 회의록이 없습니다.</div>
            )}
          </div>
        </section>

        {/* Yearly Activities */}
        <section id="activities">
          <h2 className="text-2xl font-bold border-l-4 border-blue-700 pl-4 mb-8">연도별 주요 공식활동</h2>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
            {data.activities.sort((a,b) => b.year - a.year).map(activity => (
              <div key={activity.id} className="pl-12 relative">
                <div className="absolute left-3 top-1 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded mb-2">{activity.year}년</span>
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{activity.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <div className="bg-slate-700 text-white p-1 rounded font-bold text-sm">국</div>
              <span className="font-bold text-white tracking-tight">전국고교인문정치학회</span>
            </div>
            <p className="text-sm">대표자: 제4대 학회장단 | 연락처: contact@hps-society.kr</p>
            <p className="text-sm mt-1">© 2024 National High School Humanities & Political Science Society. All Rights Reserved.</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={() => setView('ADMIN_AUTH')}
              className="text-xs text-slate-500 hover:text-white underline transition py-2"
            >
              관리자 페이지 접속
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
