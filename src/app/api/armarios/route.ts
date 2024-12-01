import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Armario from "@/app/models/Armario";

// Listar armários
export async function GET() {
    await dbConnect();

    try {
        const armariosA = await Armario.find({ predio: "A" });
        const armariosB = await Armario.find({ predio: "B" });
        const armariosC = await Armario.find({ predio: "C" });
        const armariosD = await Armario.find({ predio: "D" });

        return NextResponse.json({
            predioA: armariosA,
            predioB: armariosB,
            predioC: armariosC,
            predioD: armariosD,
        });
    } catch (error) {
        console.error("Erro ao listar armários:", error);
        return NextResponse.json(
            { mensagem: "Erro ao listar armários. Tente novamente mais tarde." },
            { status: 500 }
        );
    }
}

// Adicionar armário
export async function POST(request: Request) {
    await dbConnect();

    try {
        const armario = await request.json();

        // Verifica se o armário já existe
        const verificaArmario = await Armario.findOne({
            predio: armario.predio,
            numero: armario.numero,
        });

        if (verificaArmario) {
            return NextResponse.json(
                { mensagem: "Este armário já existe." },
                { status: 400 }
            );
        }

        // Cria o novo armário
        await Armario.create(armario);
        const armarioCriado = await Armario.findOne({
            predio: armario.predio,
            numero: armario.numero,
        });

        return NextResponse.json(armarioCriado);
    } catch (error) {
        console.error("Erro ao adicionar armário:", error);
        return NextResponse.json(
            { mensagem: "Requisição incorreta." },
            { status: 400 }
        );
    }
}

// Remover armário
export async function DELETE(request: Request) {
    try {
        const { predio, numero } = await request.json();

        const armarioRemovido = await Armario.findOneAndDelete({
            predio,
            numero,
        });

        if (!armarioRemovido) {
            return NextResponse.json(
                { mensagem: "Armário não encontrado." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            mensagem: "Armário removido com sucesso.",
        });
    } catch (error) {
        console.error("Erro ao remover armário:", error);
        return NextResponse.json(
            { mensagem: "Requisição incorreta." },
            { status: 400 }
        );
    }
}
