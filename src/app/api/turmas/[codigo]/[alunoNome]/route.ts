import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Turma from "@/app/models/Turma";

export async function GET(request: Request, context: any) {
    await dbConnect();

    try {
        const { codigo, alunoNome } = context.params;
        const turma = await Turma.findOne({ codigo });

        if (!turma) {
            return NextResponse.json({
                mensagem: "Turma não encontrada."
            }, {
                status: 404
            });
        }

        const aluno = turma.alunos.find((aluno: any) => aluno.nome === alunoNome);
        if (!aluno) {
            return NextResponse.json({
                mensagem: "Aluno não encontrado na turma."
            }, {
                status: 404
            });
        }

        return NextResponse.json(aluno);
    } catch (error) {
        return NextResponse.json({
            mensagem: "Requisição incorreta."
        }, {
            status: 400
        });
    }
}

// editar informações do aluno
export async function PUT(request: Request, context: any) {
    await dbConnect();

    try {
        const { codigo, alunoNome } = context.params;
        const { nome, telefone } = await request.json();
        
        const turma = await Turma.findOne({ codigo });

        if (!turma) {
            return NextResponse.json({
                mensagem: "Turma não encontrada."
            }, {
                status: 404
            });
        }

        const aluno = turma.alunos.find((aluno: any) => aluno.nome === alunoNome);
        if (!aluno) {
            return NextResponse.json({
                mensagem: "Aluno não encontrado na turma."
            }, {
                status: 404
            });
        }

        aluno.nome = nome || aluno.nome;
        aluno.telefone = telefone || aluno.telefone;

        await turma.save();

        return NextResponse.json({
            mensagem: "Informações do aluno atualizadas com sucesso.",
            aluno
        });
    } catch (error) {
        return NextResponse.json({
            mensagem: "Requisição incorreta."
        }, {
            status: 400
        });
    }
}