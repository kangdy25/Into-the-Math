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
    icon: basic,
  },
  {
    name: '이산수학',
    eng: 'Discrete Mathematics',
    path: '/discrete-mathematics',
    icon: discrete,
  },
  {
    name: '선형대수학',
    eng: 'Linear Algebra',
    path: '/linear-algebra',
    icon: matrix,
  },
  { name: '미분적분학', eng: 'Calculus', path: '/calculus', icon: calculus },
  { name: '위상수학', eng: 'Topology', path: '/topology', icon: topology },
  {
    name: '확률과 통계',
    eng: 'Probability and Statistics',
    path: '/probability-statistics',
    icon: probability,
  },
];

export default subjects;
