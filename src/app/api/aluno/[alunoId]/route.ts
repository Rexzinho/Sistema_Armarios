import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Turma from "@/app/models/Turma";

export async function GET(request: Request, context: any) {
    await dbConnect();

    try {
        const { alunoId } = context.params; // `alunoId` vem do contexto
        const turma = await Turma.findOne({ "alunos._id": alunoId }); // Busca a turma que contém o aluno

        if (!turma) {
            return NextResponse.json(
                { mensagem: "Aluno ou turma não encontrado." },
                { status: 404 }
            );
        }

        const aluno = turma.alunos.find((aluno: any) => aluno._id.toString() === alunoId); // Busca o aluno na lista
        if (!aluno) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado." },
                { status: 404 }
            );
        }

        // Retorna as informações do aluno e a turma
        return NextResponse.json({
            aluno,
            turma: {
                codigo: turma.codigo, // Retorna apenas o código da turma
            },
        });
    } catch (error) {
        return NextResponse.json(
            { mensagem: "Requisição incorreta." },
            { status: 400 }
        );
    }
}

export async function PUT(request: Request, context: any) {
    await dbConnect();

    try {
        const { alunoId } = context.params; // `alunoId` vem do contexto
        const { nome, telefone } = await request.json();

        const turma = await Turma.findOne({ "alunos._id": alunoId }); // Busca a turma que contém o aluno

        if (!turma) {
            return NextResponse.json(
                { mensagem: "Aluno ou turma não encontrado." },
                { status: 404 }
            );
        }

        const aluno = turma.alunos.find((aluno: any) => aluno._id.toString() === alunoId); // Busca o aluno na lista
        if (!aluno) {
            return NextResponse.json(
                { mensagem: "Aluno não encontrado." },
                { status: 404 }
            );
        }

        // Atualiza os dados do aluno
        aluno.nome = nome || aluno.nome;
        aluno.telefone = telefone || aluno.telefone;

        await turma.save(); // Salva a atualização

        // Retorna as informações atualizadas do aluno e a turma
        return NextResponse.json({
            mensagem: "Informações do aluno atualizadas com sucesso.",
            aluno,
            turma: {
                codigo: turma.codigo, // Retorna apenas o código da turma
            },
        });
    } catch (error) {
        return NextResponse.json(
            { mensagem: "Requisição incorreta." },
            { status: 400 }
        );
    }
}
