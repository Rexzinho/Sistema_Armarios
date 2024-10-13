import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Armario from "@/app/models/Armario";

// listar armários
export async function GET(){

    await dbConnect();

    try {
        const armariosA = await Armario.find({predio: "A"});
        const armariosB = await Armario.find({predio: "B"});
        const armariosC = await Armario.find({predio: "C"});
        const armariosD = await Armario.find({predio: "D"});
        return NextResponse.json({
            predioA: armariosA,
            predioB: armariosB,
            predioC: armariosC,
            predioD: armariosD
        });
    } 
    catch (error) {
        return NextResponse.json({
            message: "Erro ao listar armários. Tente novamente mais tarde."
        });
    }

}

// adicionar armário
export async function POST(request: Request){

    await dbConnect();

    try {
        const armario = await request.json();

        // verifica se o armário já existe
        const verificaArmario = await Armario.findOne({predio: armario.predio, numero: armario.numero});
        if(verificaArmario){
            return NextResponse.json({
                mensagem: "Este armário já existe."
            }, {
                status: 400
            })
        }

        await Armario.create(armario);
        const armarioCriado = await Armario.findOne({predio: armario.predio, numero: armario.numero});
        return NextResponse.json(armarioCriado);
    } 
    catch (error) {
        return NextResponse.json({
            mensagem: "Requisição incorreta."
        });
    }
}