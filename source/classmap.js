let data = {};
let result = {};

for (let item of data.data.getScoreRecordListPaginate.result) {
    let room = item.roomName.replace("ป.", "");
    if (!(room in result)) {
        result[room] = String(item.schoolClassRoomCode);
    }
}

let json_data = JSON.stringify(result, null, 4);
console.log(json_data);