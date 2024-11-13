import dbConnect from "@/app/db/dbConnect";
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(request: Request) {
    await dbConnect();

    try {
        // Verifique se a requisição contém o arquivo PDF
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json(
                { mensagem: "Arquivo PDF não enviado ou incorreto." },
                { status: 400 }
            );
        }

        // Converte o Blob para ArrayBuffer, depois para Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extrai o texto do PDF usando pdf-parse
        const pdfData = await pdfParse(buffer);
        const extractedText = pdfData.text;

        return NextResponse.json({
            mensagem: "Texto extraído com sucesso.",
            texto: extractedText
        });
    } catch (error) {
        console.error("Erro ao processar o PDF:", error);
        return NextResponse.json(
            { mensagem: "Erro ao processar o PDF." },
            { status: 500 }
        );
    }
}
