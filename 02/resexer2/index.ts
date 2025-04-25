import { promises as fs } from "fs";
import { usuario } from "../models/usuario";
import { error } from "console";
import { json } from "stream/consumers";

const retornaUsuarioDetalhado = async (cpf: string): Promise<usuario | undefined> => {
    try {
        if (!cpf) {
            return undefined;
        }

        const ArquivoLido: string = await fs.readFile("./data/db.json", "utf-8");
        const usuariosNoDb: usuario[] = JSON.parse(ArquivoLido) as usuario[];

        const usuarioProcurado: usuario | undefined = usuariosNoDb.find(x => x.cpf == cpf);

        if (typeof usuarioProcurado === "object") {
            return usuarioProcurado;
        } else {
            return undefined;
        }
    } catch (error) {
        return undefined;
    }
}

const detalhaUsuario = async () => {

    const responseFunc: usuario | undefined = await retornaUsuarioDetalhado("123.456.789-00");

    if (typeof responseFunc === "object") {
        console.log(responseFunc);
    } else {
        console.log("Não foi encontrado um usuario com as informações fornecidas.");
    }

};

const ModificaUsuario = async () => {
    try {
        const CpfQueVaiSerAtualizaod: string = "123.456.789-00"
        const UsuarioQueVaiSerAtualizado: usuario | undefined = await retornaUsuarioDetalhado(CpfQueVaiSerAtualizaod);

        if (typeof UsuarioQueVaiSerAtualizado === 'object') {
            const ArquivoLido: string = await fs.readFile("./data/db.json", 'utf-8');
            const ListaDeUsuarios: usuario[] | undefined = JSON.parse(ArquivoLido);

            if (typeof UsuarioQueVaiSerAtualizado === "object") {
                UsuarioQueVaiSerAtualizado.nome = "Novo Nome Atualizado"
                ListaDeUsuarios?.forEach(x => {
                    if (x.cpf == CpfQueVaiSerAtualizaod) {
                        x.nome = "teste";
                    }
                })

                await fs.writeFile("./data/db.json", JSON.stringify(ListaDeUsuarios));
                console.log(ListaDeUsuarios)
            } else {
                throw error;
            }

        } else {
            console.log("Usuario procurado para ser modificado não foi encontrado.");
        }


    } catch (error) {
        console.log(error);
    }
}



detalhaUsuario();
ModificaUsuario();