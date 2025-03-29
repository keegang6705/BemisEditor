function main() {
  console.log("BemisEditor/scripts/table_editorX:OBSERVING");
  document.addEventListener("paste", (event) => {
    console.log("BemisEditor/scripts/table_editorX:PASTE_EVENT_DETECTED");
    tableEditor(event);
  });
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("paste", (event) => {
        console.log("BemisEditor/scripts/table_editorX:PASTE_EVENT_DETECTED(INPUT)");
        tableEditor(event);
    });
});
}

function selectTable() {
  console.log("BemisEditor/scripts/table_editorX:SELECTING_TABLE");
  let e = document.querySelectorAll("table");
  return e.length > 0
    ? (console.log("BemisEditor/scripts/table_editorX:TABLE_FOUND"), e[1])
    : (console.log("BemisEditor/scripts/table_editorX:NO_TABLE_FOUND"), "ERR_TABLE_NOT_FOUND");
}

function tableEditor(event) {
  let e = selectTable();
  if ("ERR_TABLE_NOT_FOUND" == e) {
    localStorage.setItem("children_table", "ERR_TABLE_NOT_FOUND");
    return;
  }
  console.log(e);
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData("text");

  try {
    const scores = pastedText
      .trim()
      .split("\n")
      .map(row => row.split("\t").map(val => val.trim() || "0"));

    for (let i = 0; i < scores.length; i++) {
      for (let j = 0; j < scores[i].length; j++) {
        if (scores[i][j] === "" || scores[i][j] === null) {
          scores[i][j] = "0";
        }
      }
    }

    for (let rowIndex = 0; rowIndex < scores.length; rowIndex++) {
      const row = scores[rowIndex];
      let total = 0;
      let exam = true;

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
            console.log("BemisEditor/scripts/table_editorX:INVALID_EXAM_SCORE");
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
    console.log("BemisEditor/scripts/table_editorX:SCORES_PASTED_SUCCESSFULLY");
  } catch (error) {
    console.error("BemisEditor/scripts/table_editorX:INVALID_CLIPBOARD_DATA", error);
    alert("ข้อมูลในคลิปบอร์ดไม่ถูกต้อง กรุณาตรวจสอบข้อมูลที่คัดลอกจาก Excel");
  }
}

console.log("BemisEditor/scripts/table_editorX.js:LOADED"), main();