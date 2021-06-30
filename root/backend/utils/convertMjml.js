const fs = require("fs");
const path = require("path");
const mjml = require("mjml");

const mjmlFolder = path.join(__dirname, "../views/mjml");

fs.readdir(mjmlFolder, (err, files) => {
    if (err) {
        return console.error(err);
    }
    let hbs;
    let fileContent;

    files.forEach((file) => {
        // console.warn(`Template: ${file}`);
        fileContent = fs.readFileSync(
            path.join(__dirname, "../views/mjml/", file)
        );
        fileContent = mjml(fileContent.toString());
        hbs = path.join(
            __dirname,
            `../views/hbs/${file.replace(".mjml", ".hbs")}`
        );
        fs.writeFileSync(hbs, fileContent.html);
    });
});
