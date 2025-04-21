import { endereco } from './endereco'

export type usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: endereco | null
}