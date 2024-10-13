import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Aluno from "@/app/models/Aluno";

// listar alunos
export async function GET(){

    await dbConnect();

    try {
        const alunos = await Aluno.find({});
        return NextResponse.json(alunos);
    } 
    catch (error) {
        return NextResponse.json({
            mensagem: "Erro ao listar alunos. Tente novamente mais tarde."
        });
    }
}

// adicionar aluno
export async function POST(request: Request){

    await dbConnect();

    try {
        const aluno = await request.json();
        
        // verifica se o aluno já existe
        const verificaAluno = await Aluno.findOne({nome: aluno.nome});
        if(verificaAluno){
            return NextResponse.json({
                message: "Este aluno já existe.",
            })
        }

        await Aluno.create(aluno);
        const alunoCriado = await Aluno.findOne({nome: aluno.nome});
        return NextResponse.json(alunoCriado);
    } 
    catch (error) {
        return NextResponse.json({
            message: "Requisição incorreta.",
        });
    }
}

// teste