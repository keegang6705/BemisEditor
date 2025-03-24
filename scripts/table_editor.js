function main() {
  console.log("BemisEditor:STARTING_PROGRAM");
  let e = selectTable();
  if ("ERR_TABLE_NOT_FOUND" == e) {
    localStorage.setItem("children_table", "ERR_TABLE_NOT_FOUND"),
      alert(
        'ไม่มีข้อมูลตาราง\nโปรดตรวจสอบให้แน่ใจว่าอยู่ในหน้า"แก้ไขบันทึกคะแนน"'
      );
    return;
  }
  console.log(e),
  chrome.storage.local.get("score_array", (data) => {
    const scores = data.score_array || []; 
    for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < scores[i].length; j++) {
          if (scores[i][j] === "" || scores[i][j] === null) {
            scores[i][j] = 0;
          }
        }
      }

    for (let rowIndex = 0; rowIndex < scores.length; rowIndex++) {
      const row = scores[rowIndex];
      var total = 0; 
      var exam = true;
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const score = row[colIndex];

        const subjectInput = document.querySelector(
          `input[name="subjectScoringDetail[${rowIndex}][${colIndex}]"]`
        );

        if (!subjectInput) {
          const examInput = document.querySelector(
            `input[name="examScore[${rowIndex}]"]`
          );
          if (examInput && exam) {
            examInput.value = score;
            exam = false;
            total += parseInt(score);
          } else {
            console.log("BemisEditor:INVALID_EXAM_SCORE");
          }
        } else {
          subjectInput.value = score;
          total += parseInt(score);
        }
      }
      const totalInput = document.querySelector(
        `input[name="totalScore[${rowIndex}]"]`
      );
      totalInput.value = total;
    }
  });
}
function selectTable() {
  console.log("BemisEditor:SELECTING_TABLE");
  let e = document.querySelectorAll("table");
  return e.length > 0
    ? (console.log("BemisEditor:TABLE_FOUND"), e[1])
    : (console.log("BemisEditor:NO_TABLE_FOUND"), "ERR_TABLE_NOT_FOUND");
}
console.log("BemisEditor/scripts/table_editor.js:LOADED"), main();
