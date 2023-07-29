//select the data
const data = document.querySelectorAll("body font form table tbody tr");

//create an array of data as a json file
const dataArray = [];
for (i = 3; i < data.length; i++) {
  const dataUnit = data[i].querySelectorAll("td");
  //manage time
  let start;
  let end;
  if (dataUnit[9].textContent.includes("-")) {
    const periodString = dataUnit[9].textContent.split("-");
    start = Number(periodString[0]);
    end = Number(periodString[1]);
  } else {
    start = Number(periodString);
    end = start;
  }
  //mange group
  let group;
  if (dataUnit[11].textContent == "CL") {
    group = 0;
  } else {
    group = Number(dataUnit[11].textContent);
  }

  //check value
    const check = dataArray.findIndex((e) => e.code === dataUnit[4].textContent);
    console.log(check)

  //create new data element
  if (check >= 0) {
    dataArray[check].schedule.push({
      day: dataUnit[8].textContent,
      start: start,
      end: end,
      group: group,
      location: dataUnit[10].textContent,
    });
  } else {
    const newData = {
      title: dataUnit[2].textContent,
      code: dataUnit[4].textContent,
      credits: Number(dataUnit[3].textContent),
      instructor: dataUnit[5].textContent,
      schedule: [
        {
          day: dataUnit[8].textContent,
          start: start,
          end: end,
          group: group,
          location: dataUnit[10].textContent,
        },
      ],
    };
    dataArray.push(newData);
  }
}
console.log(typeof dataArray);
const jsonString = JSON.stringify(dataArray);
const dataBlob = new Blob([jsonString], {
  type: "application/json",
});

// Create a download link.
const a = document.createElement("a");
a.href = window.URL.createObjectURL(dataBlob);
a.download = "data.json";
a.textContent = "download here";

// Display the download link.
document.body.appendChild(a);
// a.click();
