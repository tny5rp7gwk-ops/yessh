// script.js

const words = [
  { english: "executive", korean: "경영진, 임원" },
  { english: "inventory", korean: "재고, 재고 목록" },
  { english: "feature", korean: "특징, 특색" },
  { english: "acknowledge", korean: "수신을 인정하다, 감사를 표현하다" },
  { english: "voucher", korean: "상품권, 바우처" },
  { english: "estimate", korean: "견적서, 평가 / 추산하다" },
  { english: "resume", korean: "이력서 / 재개하다" },
  { english: "issue", korean: "문제, 이슈 / 발행하다" },
  { english: "property", korean: "재산, 부동산" },
  { english: "eligible", korean: "자격이 있는, 적격의" },

  { english: "initiative", korean: "주도권, 새로운 계획" },
  { english: "culinary", korean: "요리의, 음식의" },
  { english: "extensive", korean: "광범위한, 대규모의" },
  { english: "deposit", korean: "예치금, 보증금 / 침전물" },
  { english: "retail", korean: "소매 / 소매의" },
  { english: "affordable", korean: "가격이 알맞은" },
  { english: "grant", korean: "승인하다 / 수여하다" },
  { english: "significantly", korean: "상당히, 현저하게" },
  { english: "reserve", korean: "예약하다 / 보유하다" },
  { english: "application", korean: "신청, 지원서 / 적용, 응용" },

  { english: "address", korean: "주소 / 문제를 다루다" },
  { english: "suppose", korean: "추정하다, 생각하다" },
  { english: "charge", korean: "요금, 책임" },
  { english: "expire", korean: "기한이 만료되다" },
  { english: "refund", korean: "환불 / 환불하다" },
  { english: "promote", korean: "촉진하다 / 승진시키다" },
  { english: "revenue", korean: "수익, 수입" },
  { english: "opportunity", korean: "기회, 적기" },
  { english: "valid", korean: "유효한, 타당한" },
  { english: "confidential", korean: "기밀의, 비밀의" },

  { english: "balance", korean: "균형, 잔액" },
  { english: "account", korean: "계좌, 설명" },
  { english: "proceed", korean: "계속하다, 진행하다" },
  { english: "amenities", korean: "편의시설" },
  { english: "renowned", korean: "유명한" },
  { english: "preserve", korean: "보존하다" },
  { english: "simply", korean: "단순하게, 그저" },
  { english: "presence", korean: "존재, 출석" },
  { english: "laboratory", korean: "실험실" },
  { english: "effective", korean: "효과적인" },

  { english: "enhance", korean: "향상시키다, 강화하다" },
  { english: "insurance", korean: "보험" },
  { english: "spacious", korean: "넓은, 공간이 많은" },
  { english: "ingredient", korean: "재료, 성분" },
  { english: "withdraw", korean: "철회하다, 철수하다" },
  { english: "banquet", korean: "연회, 만찬" },
  { english: "experiment", korean: "실험 / 실험하다" },
  { english: "specific", korean: "구체적인, 특정한" },
  { english: "specialize", korean: "전문화하다" },
  { english: "affect", korean: "영향을 미치다" },

  { english: "commission", korean: "수수료, 위원회" },
  { english: "cover", korean: "덮다, 포함하다" },
  { english: "encourage", korean: "격려하다, 촉진하다" },
  { english: "persuade", korean: "설득하다, 납득시키다" },
  { english: "accompany", korean: "동반하다, 함께 가다" },
  { english: "candidate", korean: "후보자, 지원자" },
  { english: "renew", korean: "갱신하다, 재개하다" },
  { english: "launch", korean: "출시하다, 시작하다" },
  { english: "reliable", korean: "믿을 수 있는" },
  { english: "inform", korean: "알리다, 정보 제공하다" }
];

let currentIndex = 0;
let learnedCount = 0;
let shown = false;

const card = document.getElementById("card");
const english = document.getElementById("english");
const korean = document.getElementById("korean");
const count = document.getElementById("count");
const remain = document.getElementById("remain");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(words);

function renderCard() {
  if (currentIndex >= words.length) {
    english.textContent = "끝!";
    korean.textContent = "오늘 학습 완료";
    card.classList.remove("flipped");
    return;
  }

  const word = words[currentIndex];
  english.textContent = word.english;
  korean.textContent = word.korean;
  card.classList.remove("flipped");
  shown = false;

  count.textContent = learnedCount;
  remain.textContent = words.length - currentIndex;
}

function flipCard() {
  shown = !shown;
  card.classList.toggle("flipped", shown);
}

function nextWord() {
  currentIndex += 1;
  renderCard();
}

function knowWord() {
  learnedCount += 1;
  saveState();
  nextWord();
}

function dontKnowWord() {
  // 모르면 뒤로 다시 보내서 한 번 더 나오게 함
  const word = words[currentIndex];
  words.splice(currentIndex, 1);
  words.push(word);
  saveState();
  renderCard();
}

function saveState() {
  localStorage.setItem("toeic-vocab-progress", JSON.stringify({
    currentIndex,
    learnedCount,
    words
  }));
}

function loadState() {
  const saved = localStorage.getItem("toeic-vocab-progress");
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (Array.isArray(data.words) && typeof data.currentIndex === "number") {
      currentIndex = data.currentIndex;
      learnedCount = data.learnedCount || 0;
      words.length = 0;
      data.words.forEach(w => words.push(w));
    }
  } catch (e) {
    console.warn("저장된 데이터 불러오기 실패");
  }
}

card.addEventListener("click", flipCard);

window.flipCard = flipCard;
window.knowWord = knowWord;
window.dontKnowWord = dontKnowWord;

loadState();
renderCard();