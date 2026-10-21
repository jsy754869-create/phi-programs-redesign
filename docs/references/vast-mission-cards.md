# Vast — Haven-1 미션 카드 측정값

URL: https://www.vastspace.com/haven-1 (Government / Private astronaut missions, Payload missions 카드 3장)
측정 환경: 1512 × 797 뷰포트, 2026-10-21

## 구조
- 카드 3장, 가로로 양 끝 정렬(space-between), 각 약 415 × 448px(정사각형에 가까움, aspect-ratio 1:1 기준), 모서리 0.
- 기본 상태: 사진이 카드를 꽉 채우고(object-fit cover), 제목만 흰색 20px / 굵기 500으로 왼쪽 24px, **세로 가운데**에 얹혀 있다. 설명은 보이지 않는다.
- 오버레이: 따뜻한 회색(#ECE8E3) 면 위에 짙은 글자. 제목 + 불릿 3개(14px / 21px). 패딩 32px 40px 32px 24px.

## 인터랙션 (hover)
- 오버레이가 **아래에서 위로 닦아 올라오듯** 덮는다: clip-path `inset(100% 0 0)` → `inset(0)`, **0.5s, cubic-bezier(0.62, 0.05, 0.01, 0.99)**.
- 동시에 사진 영역이 **0.95배로 줄어든다**: transform scale(0.95), **0.65s**, 같은 커브.
- 줄어든 카드 바깥, 원래 카드의 네 모서리에 **"+" 모양 크로스헤어 4개**(16px SVG)가 나타난다. 같은 0.65s 커브로 움직인다.
- 마우스를 떼면 반대로 돌아간다.
- 아래쪽 TRAINING / LAUNCH / IN ORBIT / HOMECOMING 탭은 별개의 컴포넌트다.
