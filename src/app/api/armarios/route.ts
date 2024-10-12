import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Armario from "@/app/models/Armario";

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

export async function POST(request: Request){

    await dbConnect();

    try {
        const armario = await request.json();
        await Armario.create(armario);
        return NextResponse.json(armario);
    } 
    catch (error) {
        return NextResponse.json({
            message: "requisição incorreta."
        });
    }
}