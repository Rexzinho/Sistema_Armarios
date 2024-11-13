import mongoose, { Document } from "mongoose";

export interface Aluno{
    nome: string
}

export interface ITurma extends Document{
    codigo: string,
    alunos: Aluno[]
}

const turmaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
    alunos: [
        {
            nome: {
                type: String,
                required: true,
            }
        }
    ]
});

const Turma = mongoose.models.Turma || mongoose.model<ITurma>("Turma", turmaSchema);

export default Turma;