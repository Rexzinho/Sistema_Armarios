import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Aluno from "@/app/models/Aluno";

export async function GET(){

    await dbConnect();

    try {
        const alunos = await Aluno.find({});
        return NextResponse.json(alunos);
    } 
    catch (error) {
        return NextResponse.json({
            message: "Erro ao listar alunos. Tente novamente mais tarde."
        });
    }
}

export async function POST(request: Request){

    await dbConnect();

    try {
        const aluno = await request.json();
        await Aluno.create(aluno);
        return NextResponse.json(aluno);
    } 
    catch (error) {
        return NextResponse.json({
            message: "requisição incorreta.",
        });
    }
}

// teste