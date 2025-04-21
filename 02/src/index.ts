import { promises as fs } from 'fs'
import { usuario } from '../models/usuario';

async function ReadUsers(retornaTodoConteudoParaEscrever?: boolean, procuraUsuarioNome?: string): Promise<usuario | usuario[] | undefined> {
    try {
        //function to read a file
        let usuarioLido: usuario = { nome: "", email: "", cpf: "", profissao: "", endereco: null };
        const Result: string = await fs.readFile("./data/db.json", "utf-8");
        const JsonContent: usuario[] | [] | "" = JSON.parse(Result);

        if (procuraUsuarioNome !== null && procuraUsuarioNome !== "" && typeof JsonContent === 'object') {

            const readedUser = JsonContent.find(x => x.nome == procuraUsuarioNome);

            if (readedUser !== undefined)
                return usuarioLido = readedUser;
        }

        if (retornaTodoConteudoParaEscrever && typeof JsonContent === "object") {
            return JsonContent;
        }

        console.log(JsonContent)
        return usuarioLido;
    } catch (error) {
        console.log(error)
        return undefined;
    }
};

async function registerUser(contentToWrite: usuario) {
    try {
        //function to write in a file
        const pathToTheFile: string = "./data/db.json";
        const LerArquivoTodo: usuario[] | usuario | undefined = await ReadUsers(true);;

        if (typeof LerArquivoTodo === 'object') {
            const ArrayDeUsuarios = LerArquivoTodo as usuario[]


            ArrayDeUsuarios.push(contentToWrite);
            await fs.writeFile(pathToTheFile, JSON.stringify(ArrayDeUsuarios))

            const usuarioCadastrado = await ReadUsers(false, contentToWrite.nome);
            console.log(usuarioCadastrado)
        }
    } catch (error) {
        console.log(error)
    }
};

const novoUsuario: usuario = {
    nome: "Bruna jiu jipsy",
    email: "bruna.costa@email.com",
    cpf: "321.654.987-00",
    profissao: "Designer",
    endereco: {
        cep: "30130-010",
        rua: "Rua da Criatividade",
        complemento: "Sala 205",
        bairro: "Savassi",
        cidade: "Belo Horizonte"
    }
};

registerUser(novoUsuario);
ReadUsers();
