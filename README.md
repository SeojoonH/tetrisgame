# tetrisgame cloncoding
- 바닐라JS 적응 및 응용력 키우기 위한 목적과 더불어, 게임 구동을 위한 JS 코드 간 상호 작용을 이해하는 것에 목표.
---
## 프로젝트 설명
![image](https://github.com/SeojoonH/tetrisgame/assets/119559363/e1e632e9-bd52-4f5d-99ff-2ace15a75579)
![image](https://postfiles.pstatic.net/MjAyMzA3MDdfMTk2/MDAxNjg4NzE4MzIwOTUz.6O-_Vj8fMYdXdmJc1fE_8iSkMBJOx3c6ESB9dGWUNZcg.kMwHNvGqyfNCjTg86GQBjhtFBuPnAeQI3NrXRo__tMog.PNG.seojoonspick/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-07-07_%EC%98%A4%ED%9B%84_5.23.59.png?type=w966)

---
1. 게임 안내

- 실제 사용자가 1인 테트리스 게임을 할 수 있도록 설계
- 빈칸 없이 줄이 생성되면 그 줄은 삭제되고 점수가 오르는 방식

2. JS로 구현
- 캔버스를 주로 이용하지만, JS만으로 할 수 있다는 점에서 흥미가 생김
- JS에 기본적인 동작 구현만 가능한 수준에서 응용력을 키울 수 있을 것으로 예상하고 진행

3. 힘든 점
- 아직까지 완벽하게 JS를 다루기 어려워서 전체 구현하고 이해하는 데 시간이 많이 필요했음
- 위 내용에 이어 오류가 발생했을 때, 해당 오류 디버깅하는 데 긴 시간이 걸림

3-1. 헤결법
- 왜? 라는 물음을 갖고 계속 각 코드 간 상호관계를 파악
- 완성 후 다시 처음부터 하나하나 타고 올라가며 주석 남기는 등 오류 확인

---
## 사용 방법
[테트리스 사용 링크](https://seojoonh.github.io/tetrisgame/)
1. 조작법
- 키보드
  - 방향키 좌: 왼쪽 이동
  - 방향키 우: 오른쪽 이동
  - 방향키 하: 아래로 이동
  - 방향키 상: 블록 방향 변경
  - 스페이스바: 빨리 내리기

- 게임 종료
  - 게임 종료를 알리는 텍스트와 재시작 버튼 활성화

- 스코어 보드
  - 게임 상단에 한 줄 삭제마다 1점 상승 확인 가능

---
## 참고 자료
[데브리 - 추억의 게임! 테트리스 HTML, Javascript로 만들기](https://www.youtube.com/watch?v=1lNy2mhvLFk)

- 해당 영상을 바탕으로 클론 코딩 및 스터디

