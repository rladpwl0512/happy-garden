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

async function postJournal(content) {
  try {
    await fetch("http://localhost:3000/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function getJournal(date) {
  try {
    const response = await fetch(`http://localhost:3000/journal/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getJournalMood(month) {
  try {
    const response = await fetch(`http://localhost:3000/journal/mood/${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteJournal(date) {
  try {
    const response = await fetch(`http://localhost:3000/journal/${date}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function updateJournal(content) {
  try {
    const response = await fetch(`http://localhost:3000/journal`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function postChat(userMessages, assistantMessages) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessages, assistantMessages }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { postCounselling, postJournal, getJournal, getJournalMood, deleteJournal, updateJournal, postChat };
