import { IArmario } from "@/app/models/Armario";
import axios from "axios";
import { useEffect, useState } from "react";

const CriarArmario = (props: any) => {

    const {closeModal, idArmario} = props;
    const [armario, setArmario] = useState<IArmario | any>();

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        try {
            console.log(idArmario);
            const resp = await axios.get(`/api/armarios/${idArmario}`);
            const data = resp.data;
            setArmario(data);
            console.log(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };    

    const formatarData = (dataString: string): string => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    return (
        <div className="modal meu-modal" style={{display: "block"}}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{armario?.numero}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                    <p><span className="text-dark-blue">Ocupação:</span> {formatarData(armario?.data_ocupacao)}</p>
                    <p><span className="text-dark-blue">Prazo:</span> {formatarData(armario?.data_prazo)}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                    <button type="button" className="btn btn-outline-primary">Liberar armário</button>
                </div>
                </div>
            </div>
        </div>
  )
}

export default CriarArmario;