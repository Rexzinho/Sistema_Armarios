import { IArmario } from "@/app/models/Armario";
import axios from "axios";
import { Types } from "mongoose";
import { useEffect, useState } from "react";

const CriarArmario = (props: any) => {

    const {closeModal, idArmario, armario} = props;
    const [estado, setEstado] = useState("Ocupado");
    const [aluno, setAluno] = useState<any>({});

    const formatarData = (dataString: string): string => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    useEffect(() => {
        if (armario.ocupado) {
            const prazo = armario.data_prazo ? new Date(armario.data_prazo) : null;
            const hoje = new Date();
            if (prazo) {
                if (hoje > prazo) {
                    setEstado("Irregular");
                } else {
                    setEstado("Ocupado");
                }
            }
        }
        getStudentInfo(armario.aluno_id);
    }, [armario]);

    const estadoArmario = (armario : IArmario): string => {
        
        if(armario.ocupado){
            const prazo = armario.data_prazo ? new Date(armario.data_prazo) : null;
            const hoje = new Date();
            if(prazo) return hoje > prazo ? "modal meu-modal modal-irregular" : "modal meu-modal modal-ocupado"
        }
        return "modal meu-modal";
    }

    const getStudentInfo = async (alunoId:Types.ObjectId) => {

        try {
            const resp = await axios.get(`/api/aluno/${alunoId}`);
            const data = resp.data;
            console.log(data);
            setAluno(data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={estadoArmario(armario)} style={{display: "block"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <div className="armario-header">
                        <h5 className="modal-title" style={{color: "var(--modalColor)"}}>{armario?.numero}</h5>
                        <h5 className="estado">{estado}</h5>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                    <p><span className="text-bold">Ocupação:</span> {formatarData(armario?.data_ocupacao)}</p>
                    <p><span className="text-bold">Prazo:</span> {formatarData(armario?.data_prazo)}</p>
                    {aluno.aluno && <>
                        <p><span className="text-bold">Aluno:</span> {aluno.aluno.nome}</p>
                        {aluno.aluno.telefone && <p><span className="text-bold">Telefone:</span> {aluno.aluno.telefone}</p>}
                        <p><span className="text-bold">Turma:</span> {aluno.turma.codigo}</p>
                    </>}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={closeModal}>Fechar</button>
                    <button type="button" className="btn-main">Liberar armário</button>
                </div>
                </div>
            </div>
        </div>
  )
}

export default CriarArmario;