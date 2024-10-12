import mongoose, { Document } from "mongoose";

export interface IAluno extends Document{
    nome: string,
}

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
});

const Aluno = mongoose.models.Aluno || mongoose.model<IAluno>("Aluno", alunoSchema);

export default Aluno;