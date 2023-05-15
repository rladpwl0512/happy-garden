// 1) 일기 작성 완료 버튼 클릭하면, postCounselling (user message로 일기 input 내용 보냄)
// 2) chat gpt 의 답변에 저장해둠
// 3) chat gpt 화면에서, 답변을 보여줌
// 4) '메인으로' 클릭하면, 백엔드에 그 날짜의 일기 내용 모두 저장

async function postCounselling(text) {
  const journal = text;
  if (journal.trim() === "") {
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/counselling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ journal }),
    });
    const data = await response.json();
    return data.assistant;
  } catch (error) {
    console.error(error);
  }
}

export { postCounselling };
