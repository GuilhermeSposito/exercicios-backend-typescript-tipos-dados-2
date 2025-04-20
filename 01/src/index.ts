import fs from 'fs';

async function ReadFile() {
    try {
        //function to read a file
        const Result: string = await fs.readFileSync("./data/db.json").toString();
        const JsonContent = JSON.parse(Result);

        if (JsonContent && typeof JsonContent === "object" && 'name' in JsonContent && JsonContent.name !== null)
            console.log("entrou no if");
        else
            console.log("Não entrou no if")

    } catch (error) {
        console.log(error)
    }
};

async function WriteFile(contentToWrite: string) {
    try {
        //function to write in a file
        const pathToTheFile: string = "./data/db.json";

        await fs.writeFileSync(pathToTheFile, contentToWrite)
    } catch (error) {


    }

};

ReadFile();
WriteFile(`{"teste": "Testeeee"}`);