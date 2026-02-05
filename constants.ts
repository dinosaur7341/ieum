
import { SocietyData, RegionType } from './types';

export const ADMIN_PASSWORD = 'ieum73413243';

export const REGIONS: RegionType[] = [
  '경기북부', '경기남부', '경인', '충청', '호남', '영남', '강원', '제주'
];

export const INITIAL_DATA: SocietyData = {
  heroTitle: "미래를 여는 인문학적 성찰, 세상을 바꾸는 정치적 상상력",
  heroSubtitle: "전국고교인문정치학회는 고등학생들의 학술적 교류와 사회적 참여를 응원합니다.",
  logoUrl: "",
  clubs: [
    { id: '1', name: '폴리포니', school: '한국고등학교', region: '경기북부', description: '다양한 목소리를 내는 인문 정치 동아리', isStandingDirector: true },
    { id: '2', name: '아고라', school: '미래고등학교', region: '호남', description: '자유로운 토론의 장을 지향합니다', isStandingDirector: false },
    { id: '3', name: '시사IN', school: '경인예술고', region: '경인', description: '시사 이슈를 깊이 있게 탐구합니다', isStandingDirector: true },
  ],
  activities: [
    { id: '1', year: 2024, title: '제5회 전국 고교생 정치포럼', content: '전국 50개 동아리가 참여하여 청소년 참정권을 주제로 토론 진행' },
    { id: '2', year: 2023, title: '인문학 캠프: 인간과 기술', content: 'AI 시대의 인문학적 가치를 탐구하는 2박 3일 캠프 진행' },
  ],
  meetingMinutes: [
    { id: '1', date: '2024-03-15', title: '제1차 상임이사회의 결과 보고', summary: '올해 연간 활동 계획 및 지부별 동아리 모집 방안 확정' },
    { id: '2', date: '2024-02-10', title: '동계 학술 세미나 회의록', summary: '인문학적 소양 함양을 위한 커리큘럼 논의 및 강사진 섭외 완료' }
  ],
  supremeCouncil: [
    { id: '1', name: '김철수', role: '최고위원', school: '서울고등학교' },
    { id: '2', name: '이영희', role: '최고위원', school: '부산고등학교' },
  ],
  pastPresidents: [
    { id: '1', name: '박지성', role: '1대 회장', term: '2020-2021' },
    { id: '2', name: '손흥민', role: '2대 회장', term: '2021-2022' },
  ]
};
