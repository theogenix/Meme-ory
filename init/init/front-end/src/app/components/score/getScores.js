async function getScores() {
  const response = await fetch("http://localhost:8081/scores", {
    method: "GET",
  });
  const scores = await response.json();
  return scores;
}
export { getScores };
