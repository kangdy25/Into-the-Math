import {
  basic,
  calculus,
  discrete,
  probability,
  matrix,
  topology,
} from '@/constants/icons';

const subjects = [
  {
    name: '기초수학',
    eng: 'Basic Mathematics',
    path: '/basic-mathematics',
    slug: 'basic-mathematics',
    icon: basic,
    descriptionKo: '수학의 기본 개념과 원리를 탐구하는 입문 과정',
    descriptionEng:
      'The Basic course exploring fundamental concepts and principles of mathematics',
  },
  {
    name: '이산수학',
    eng: 'Discrete Mathematics',
    path: '/discrete-mathematics',
    slug: 'discrete-mathematics',
    icon: discrete,
    descriptionKo: '불연속적인 수학적 구조와 이론을 다루는 학문 분야',
    descriptionEng:
      'The field of study dealing with discrete mathematical structures and theories',
  },
  {
    name: '선형대수학',
    eng: 'Linear Algebra',
    path: '/linear-algebra',
    slug: 'linear-algebra',
    icon: matrix,
    descriptionKo: '벡터, 행렬, 선형 변환 등을 다루는 대수학 분야',
    descriptionEng:
      'The area of algebra that deals with vectors, matrices, and linear transformations',
  },
  {
    name: '미분적분학',
    eng: 'Calculus',
    path: '/calculus',
    slug: 'calculus',
    icon: calculus,
    descriptionKo: '변화율과 누적량을 연구하는 수학의 기본 분야',
    descriptionEng:
      'The fundamental field of mathematics that studies rates of change and accumulation',
  },
  {
    name: '위상수학',
    eng: 'Topology',
    path: '/topology',
    slug: 'topology',
    icon: topology,
    descriptionKo: '공간의 연속성과 위상적 성질을 연구하는 수학 분야',
    descriptionEng:
      'The mathematical field studying continuity and topological properties of space',
  },
  {
    name: '확률과 통계',
    eng: 'Probability and Statistics',
    path: '/probability-statistics',
    slug: 'probability-statistics',
    icon: probability,
    descriptionKo: '불확실성과 데이터 분석을 다루는 수학적 접근',
    descriptionEng:
      'The mathematical approach to uncertainty and data analysis',
  },
];

export const getSubjectBySlug = (slug: string) =>
  subjects.find((subject) => subject.slug === slug);

export const getAllSubjectSlugs = () => subjects.map((subject) => subject.slug);

export default subjects;
