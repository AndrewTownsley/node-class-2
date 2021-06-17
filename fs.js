const fs = require("fs");

let person = "Ben";

fs.rename("classlist.md", "newname.md", (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("renamed");
  }
})

// fs.unlink("open.txt", (err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("deleted file");
//   }
// })

// fs.writeFile("classlist.md", person, function handlePostWrite(err) {
//   if(err) {
//     console.log(err);
//     return;
//   } else {
//     console.log("Success");
//   }
// })