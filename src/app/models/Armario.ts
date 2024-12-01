import mongoose, { Document, Schema, Types } from "mongoose";

interface Historico{
    inicio: Date,
    termino: Date,
    motivo?: string,
    aluno_id: Types.ObjectId
}

export interface IArmario extends Document{
    _id: Types.ObjectId,
    predio: "A" | "B" | "C" | "D";
    numero: number,
    ocupado: boolean,
    aluno_id?: Types.ObjectId,
    data_ocupacao?: Date,
    data_prazo?: Date,
    historico?: Historico[]
}

const armarioSchema:Schema = new mongoose.Schema({
    predio: {
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    ocupado: {
        type: Boolean,
        required: true
    },
    aluno_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false
    },
    data_ocupacao: {
        type: Date,
        required: false
    },
    data_prazo: {
        type: Date,
        required: false
    },
    historico: [
        {
            inicio: {
                type: Date,
                required: true,
            },
            termino: {
                type: Date,
                required: true,
            },
            motivo: {
                type: String,
                required: false
            },
            aluno_id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true
            }
        }
    ]
});

const Armario = mongoose.models.Armario || mongoose.model<IArmario>("Armario", armarioSchema);

export default Armario;