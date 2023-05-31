const apiKey = "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"; // TODO: 환경변수로 관리
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
var cors = require("cors");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* open ai
 *
 */
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

/* cors 이슈 해결
 *
 */

let corsOptions = {
  origin: ["http://localhost:3000"], //요 사이트로 부터 온 요청이 아니면 다 막음
  credentials: true,
};
app.use(cors(corsOptions));

/* express
 *
 */

// post 요청 받을 수 있도록 함 (body에 대한 설정)
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route (post 요청이 왔을 때, 이렇게 돌려주렴) -> api 하나 완성!
// (get으로 하고 서버 실행으로 테스트 빠르게 가능)
app.post("/counselling", async function (req, res) {
  const { journal } = req.body;
  let messages = [
    // 기본 대화값 입력

    // 역할 부여
    {
      role: "system",
      content: "당신은 세계 최고의 심리상담사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 행복이입니다. 행복이라는 이름에서 알 수 있듯이, 당신은 긍정적인 에너지가 넘칩니다. 당신은 사람들의 감정에 잘 공감해주고, 잘 위로해줍니다. 이에 더해 고민에 대한 해결방안을 알려줍니다. 200자 이내로 말해주세요.",
    },
    // 한번 더 가스라이팅
    {
      role: "user",
      content: "당신은 세계 최고의 심리상담사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 행복이입니다. 행복이라는 이름에서 알 수 있듯이, 당신은 긍정적인 에너지가 넘칩니다. 당신은 사람들의 감정에 잘 공감해주고, 잘 위로해줍니다. 이에 더해 고민에 대한 해결방안을 알려줍니다. 200자 이내로 말해주세요.",
    },
    // 대화  이게 계속 반복됨 (assistant - user)
    {
      role: "assistant",
      content: "안녕하세요 저는 행복이예요. 오늘 당신의 일기를 분석하고, 감정적으로 공감해주고 위로해드릴게요. 기분이 좋아질만한 긍정적인 메시지를 보여드릴게요. ",
    },
    {
      role: "user",
      content: journal,
    },
  ];

  // open ai
  const maxRetries = 3; //open ai에서 응답 못받아올 때, 최대 3번까지 재요청 해봄
  let retries = 0;
  let completion;
  while (retries < maxRetries) {
    try {
      completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        // 속성 아래와같이 추가할 수 있음 (temperature ... ) 오른쪽 사이드에 있는 것
        // max_tokens: 100,
        // temperature: 0.5,
      });
      break;
    } catch (error) {
      retries++;
      console.log(error);
      console.log(`error fetching data, retrying (${retries}/${maxRetries}))...`);
    }
  }

  let counselling = completion.data.choices[0].message["content"];
  console.log(counselling);
  res.json({ assistant: counselling }); //"POST request to the homepage" // json형식으로 내주기
});

// 일기 생성
app.post("/journal", async function (req, res) {
  const { content } = req.body;
  const values = [JSON.stringify(content)];

  const query = "INSERT INTO journal (test) VALUES (?)";
  connection.query(query, values, (error, results) => {
    if (error) throw error;

    console.log("성공.", results);
  });
});

// 일기 단건 조회
app.get("/journal/:date", async function (req, res) {
  const requestedDate = req.params.date;

  const query = "SELECT * FROM journal WHERE JSON_EXTRACT(test, '$.date') = ?";
  const values = [requestedDate];

  connection.query(query, values, (error, results) => {
    if (error) throw error;

    if (results.length === 0) {
      console.log("해당 날짜에 작성 된 일기가 없습니다.");
      res.status(404).json({ error: "해당 날짜에 작성 된 일기가 없습니다." });
    } else {
      console.log("해당 날짜의 일기를 불러왔습니다.", results[0].test);
      res.json(results[0].test);
    }
  });
});

// 일기 감정 목록 조회
app.get("/journal/mood/:month", (req, res) => {
  const month = req.params.month;
  const query = `SELECT id, test FROM journal WHERE MONTH(test->"$.date") = ?`;

  connection.query(query, [month], (error, results) => {
    if (error) throw error;

    const journals = results.map((row) => {
      const { id, test } = row;
      const { date, selectedMood } = JSON.parse(test);
      return { id, date, selectedMood };
    });

    res.json(journals);
  });
});

// 일기 삭제
app.delete("/journal/:date", (req, res) => {
  const date = req.params.date;

  const query = `DELETE FROM journal WHERE test ->> '$.date' = ?`;

  connection.query(query, [date], (error, result) => {
    if (error) throw error;

    console.log("dev: 삭제가 잘 되었습니다!");
    res.sendStatus(200);
  });
});

// 일기 수정
app.put("/journal", (req, res) => {
  const { selectedMood, journalText, thanks, counsellingAnswer, date } = req.body;

  const query = 'UPDATE journal SET test = JSON_SET(test, "$.selectedMood", ?, "$.journalText", ?, "$.thanks", CAST(? AS JSON),' + ' "$.counsellingAnswer", ?) WHERE test->"$.date" = ?';

  connection.query(query, [selectedMood, journalText, JSON.stringify(thanks), counsellingAnswer, date], (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "성공" });
    } else {
      res.status(404).json({ message: "실패 (찾지못함)" });
    }
  });
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1", //localhost
  port: "3306",
  user: "root",
  password: "Mysql0512!",
  database: "happy_garden",
});

connection.connect();
