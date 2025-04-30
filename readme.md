# Into the Math

📘 **Into the Math**는 누구나 수학을 공부할 수 있는 위키 형식 프로젝트입니다.  
Next.js 기반의 정적 사이트로 제작되었으며, 누구나 수학 지식을 체계적으로 정리하고 습득할 수 있도록 돕습니다.

🔗 [배포 사이트 바로가기](https://into-the-math.vercel.app/ko)

---
<img src="./public/thumbnail.png" />

## ✨ 주요 기능

- 🧠 **수학 위키**: 기초수학부터 대학수학까지 체계적으로 구성된 콘텐츠
- 📝 **Markdown 기반 문서 작성**: 수식, 코드, 표 등을 쉽게 작성 가능
- 🌐 **다국어 지원**: 한국어 / 영어를 모두 지원 (국제화 기능)
- 📚 **사이드바 + TOC**: 좌측 목차와 우측 목차를 통한 빠른 탐색
- 📊 **수식 지원**: KaTeX를 통한 수학 표현식 렌더링
- 🌙 **다크 모드 지원**: 사용자 환경에 맞는 테마 제공
- 🎨 **반응형 디자인**: 모든 디바이스에서 최적화된 UI
- ⚡ **빠른 페이지 로딩**: Next.js의 SSG 방식을 통한 최적화된 성능
- 💬 **댓글 기능(Giscus)**: 깃허브 이슈 기반의 댓글 기능으로 피드백 수용 가능
- ⚙️ **커스터마이징된 개발 환경**: MDX, Remark 플러그인, 코드블록 렌더링 등

---

## 🛠️ 기술 스택

| 기술 | 설명 |
|------|------|
| [Next.js](https://nextjs.org/) | 정적 페이지 생성 및 라우팅 |
| [MDX](https://mdxjs.com/) | Markdown + JSX 문법으로 유연한 문서 구성 |
| [Tailwind CSS](https://tailwindcss.com/) | 유틸리티 기반 CSS 프레임워크 |
| [lucide-react](https://github.com/ruicide) | 깔끔하고 일관된 오픈소스 아이콘 라이브러리 |
| [next-intl](https://github.com/amannn/next-intl) | 다국어 번역 및 로컬라이징 처리 |
| [KaTeX](https://katex.org/) | 빠르고 깔끔한 수식 렌더링 |
| [Shiki](https://shiki.style/) | 코드 하이라이팅 엔진 |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown 메타데이터 파싱 |
| [remark plugins](https://github.com/remarkjs/remark) | Markdown 처리(TOC 생성, 자동 링크, 수식 파싱 등) |
| [Utterances](https://utteranc.es/) | GitHub Issues 기반 댓글 시스템 |
| [Vercel](https://vercel.com/) | 정적 웹사이트 호스팅 및 배포 |

---

## 📁 폴더 구조

```bash
.
├── app/                  # 라우팅 및 국제화 페이지
     ├── [locale]  
            ├── [category] 
                    ├── [...slug] 
                            ├── page.tsx # 개별 포스팅 페이지
                    ├── page.tsx # 카테고리 별 인덱스 페이지
            ├── page.tsx # 메인 페이지
            ├── layout.tsx # 공통 레이아웃 페이지
├── components/           # 공통 UI 컴포넌트
     ├── ui/
     ├── post/
├── constants/            # 전역 상수값 및 설정 정의 (과목, 아이콘 등)
├── i18n/                 # 국제화 관련 설정 및 유틸리티 함수
├── lib/                  # 유틸리티 함수 및 핵심 로직 (MDX 파싱)
├── messages/             # 다국어 번역 메시지 파일 모음
├── posts/                # 실제 수학 콘텐츠(MDX 파일) 
     ├── en/
     ├── ko/
├── public/               # 정적 파일 (이미지, 아이콘 등)
├── mdx-components.tsx    # MDX 컴포넌트 커스터마이징 설정 파일
├── middleware.ts         # 로케일 리디렉션 설정 및 요청 처리 미들웨어
├── next.config.mjs       # Next.js 구성 파일 (플러그인, 환경 설정 등)
└── package.json          # 프로젝트 의존성 및 스크립트 정의 파일
```

## 🧑‍💻 기여 방법
1. 이 프로젝트를 fork 합니다.
2. 새로운 브랜치를 만듭니다. (git switch -c feature/your-feature)
3. 변경사항을 커밋합니다. (git add . 후 git commit -m "Add your feature")
4. 브랜치를 푸시합니다. (git push -u origin feature/your-feature)
5. Pull Request를 생성합니다.

> 수학 콘텐츠 기여 또는 번역 제안도 환영합니다! 모든 문서는 .mdx 형식으로 작성되며, posts/ 디렉토리에 추가해주세요.

### 📄 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
자세한 내용은 LICENSE 파일을 참고해주세요.

### 🙌 제작자
개발 및 기획: @kangdy25

기여자 여러분 환영합니다! 🙏
오타 수정, 콘텐츠 추가, 스타일 개선 등 모든 형태의 기여가 소중합니다.