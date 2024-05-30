// 검색 창 입력 시 대화 비우기
document.getElementById('textInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      this.value = '';
      event.preventDefault(); // Prevent form submission if inside a form
  }
});

// chat 최근 순서 정렬
function sortChatsByTime() {
  const chatList = document.querySelector('.chatList');
  const chats = Array.from(chatList.querySelectorAll('#chat'));

  chats.sort((a, b) => {
      const timeA = new Date(a.querySelector('.time').textContent);
      const timeB = new Date(b.querySelector('.time').textContent);
      return timeB - timeA;
  });

  // Clear the container and append sorted chats
  chatList.innerHTML = '';
  chats.forEach(chat => chatList.appendChild(chat));
}

// Call the function to sort chat blocks
sortChatsByTime();

// time 변환
function formatTimeElements() {
  const timeElements = document.querySelectorAll('.time');
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식의 오늘 날짜

  timeElements.forEach(el => {
      const timeText = el.textContent;
      const timeDate = new Date(timeText);
      const timeDateString = timeDate.toISOString().split('T')[0];

      if (timeDateString === today) {
          // 시간과 분만 표시
          const hours = timeDate.getHours().toString().padStart(2, '0');
          const minutes = timeDate.getMinutes().toString().padStart(2, '0');
          el.textContent = `${hours}:${minutes}`;
      } else {
          // 날짜만 표시
          const year = timeDate.getFullYear();
          const month = (timeDate.getMonth() + 1).toString().padStart(2, '0');
          const day = timeDate.getDate().toString().padStart(2, '0');
          el.textContent = `${year}-${month}-${day}`;
      }
  });
}

// 시간을 포맷팅하는 함수 호출
formatTimeElements();


// 클릭 이벤트를 추가할 요소 선택
const chatBlocks = document.querySelectorAll('.block');
const personalChat = document.getElementById('personal_chat');
const leftSide = document.querySelector('.leftSide');
const rightSide = document.querySelector('.rightSide');

// 클릭 이벤트 핸들러 정의
function toggleActive() {
    // 현재 클릭된 요소가 이미 active 클래스를 가지고 있는지 확인
    const isActive = this.classList.contains('active');

    // 모든 class="block active" 요소의 active 클래스 제거
    chatBlocks.forEach(block => {
        block.classList.remove('active');
    });

    // 현재 클릭된 요소에 active 클래스를 추가
    if (!isActive) {
        this.classList.add('active');
        personalChat.classList.add('active'); // personal_chat에 active 클래스 추가
        if (window.innerWidth <= 768) {
            leftSide.style.display = 'none'; // leftSide를 숨김
            rightSide.style.display = 'block'; // rightSide를 보이게 함
        }
    } else {
        personalChat.classList.remove('active'); // personal_chat에서 active 클래스 제거
        if (window.innerWidth <= 768) {
            leftSide.style.display = 'block'; // leftSide를 보이게 함
            rightSide.style.display = 'none'; // rightSide를 숨김
        }
    }
}

// 각각의 채팅 블록에 클릭 이벤트 리스너 추가
chatBlocks.forEach(block => {
    block.addEventListener('click', toggleActive);
});

// 윈도우 리사이즈 이벤트 핸들러
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        leftSide.style.display = 'block'; // 윈도우 크기가 768px 이상일 때 leftSide를 항상 보이게 함
        rightSide.style.display = 'block'; // 윈도우 크기가 768px 이상일 때 rightSide를 항상 보이게 함
    } else if (!personalChat.classList.contains('active')) {
        leftSide.style.display = 'block'; // 윈도우 크기가 768px 이하이고 personal_chat이 active가 아닐 때 leftSide를 보이게 함
        rightSide.style.display = 'none'; // 윈도우 크기가 768px 이하이고 personal_chat이 active가 아닐 때 rightSide를 숨김
    } else {
        leftSide.style.display = 'none'; // 윈도우 크기가 768px 이하이고 personal_chat이 active일 때 leftSide를 숨김
        rightSide.style.display = 'block'; // 윈도우 크기가 768px 이하이고 personal_chat이 active일 때 rightSide를 보이게 함
    }
});

// 초기 설정 (768px 이하에서 시작할 때를 대비)
if (window.innerWidth <= 768 && personalChat.classList.contains('active')) {
    leftSide.style.display = 'none';
    rightSide.style.display = 'block';
} else if (window.innerWidth <= 768) {
    leftSide.style.display = 'block';
    rightSide.style.display = 'none';
}

// ESC 키 코드
const ESCAPE_KEY = 27;

// ESC 키를 눌렀을 때 이벤트 핸들러
function handleEscKey(event) {
  // ESC 키인지 확인
  if (event.keyCode === ESCAPE_KEY) {
    // 모든 class="block active" 요소의 active 클래스 제거
    const activeBlocks = document.querySelectorAll('.block.active');
    activeBlocks.forEach(block => {
      block.classList.remove('active');
    });

    // class="personal_chat active" 요소의 active 클래스 제거
    const personalChatActive = document.querySelector('.personal_chat.active');
    if (personalChatActive) {
      personalChatActive.classList.remove('active');
    }

    // max-width가 768px보다 작은 경우 rightSide 숨기고 leftSide 보이기
    if (window.innerWidth <= 768) {
        leftSide.style.display = 'block';
        rightSide.style.display = 'none';
    }
  }
}

// ESC 키 이벤트 리스너 등록
document.addEventListener('keydown', handleEscKey);
