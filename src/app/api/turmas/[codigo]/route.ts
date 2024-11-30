import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Turma from "@/app/models/Turma";
import Aluno from "@/app/models/Turma";

// listar informações da turma / listar alunos da turma
export async function GET(request: Request, context: any){
    
    await dbConnect();

    try {
        const { codigo } = context.params;
        const turma = await Turma.findOne({codigo: codigo});

        if(!turma){
            return NextResponse.json({
                menssagem: "Esta turma não foi encontrada."
            }, {
                status: 404
            });
        }
        
        return NextResponse.json(turma);
    } 
    catch (error) {
        return NextResponse.json({
            mensagem: "Erro ao listar informações da turma. Tente novamente mais tarde."
        }, {
            status: 500
        });
    }
}

// adicionar aluno na turma
export async function POST(request: Request, context: any){

    await dbConnect();

    try {
        const { codigo } = context.params;
        const aluno = await request.json();
        const turma = await Turma.findOne({codigo: codigo});

        if(!turma){
            return NextResponse.json({
                menssagem: "Esta turma não foi encontrada."
            }, {
                status: 404
            });
        }

        if(!turma){
            return NextResponse.json({
                menssagem: "Esta turma não foi encontrada."
            }, {
                status: 404
            });
        }

        const turmaObj = turma.toObject();

        // verificar se o aluno já está na turma
        const verificaAluno = await turmaObj.alunos.find((a: any) => a.nome == aluno.nome);
        if(verificaAluno){
            return NextResponse.json({
                menssagem: "Este aluno já está nesta turma."
            }, {
                status: 400
            });
        }

        const novaTurma = {
            _id: turma.id,
            codigo: turma.codigo,
            alunos: [
                ...turmaObj.alunos,
                aluno
            ],
        }
        await Turma.updateOne(
            {codigo: codigo}, 
            novaTurma, 
        );
        const turmaAtualizada = await Turma.findOne({codigo: codigo});
        return NextResponse.json(turmaAtualizada);
    } 
    catch (error) {
        return NextResponse.json({
            message: "Requisição incorreta."
        }, {
            status: 400
        });
    }
}

//remover aluno da turma
export async function DELETE(request: Request, context: any) {
    await dbConnect();

    try {
        const { codigo } = context.params;
        const { nome } = await request.json();
        
        const turma = await Turma.findOne({ codigo });

        if (!turma) {
            return NextResponse.json({
                mensagem: "Turma não encontrada."
            }, {
                status: 404
            });
        }

        const alunoIndex = turma.alunos.findIndex((aluno: any) => aluno.nome === nome);
        if (alunoIndex === -1) {
            return NextResponse.json({
                mensagem: "Aluno não encontrado na turma."
            }, {
                status: 404
            });
        }

        turma.alunos.splice(alunoIndex, 1);
        await turma.save();

        return NextResponse.json({
            mensagem: "Aluno removido com sucesso.",
            turma
        });
    } catch (error) {
        return NextResponse.json({
            mensagem: "Requisição incorreta."
        }, {
            status: 400
        });
    }
}