"use client"
import { useEffect, useState } from "react";
import { IArmario } from '../models/Armario';
import CriarArmario from '@/components/CriarArmario';
import ArmarioOcupado from '@/components/ArmarioOcupado';
import mongoose, { Types } from "mongoose";
import axios from "axios";

type ArmariosPorPredio = {
    [key in `predio${"A" | "B" | "C" | "D"}`]?: IArmario[];
};


const Dashbord = () => {

    const [armarios, setArmarios] = useState<ArmariosPorPredio>({})
    const [armariosPredioAtual, setArmariosPredioAtual] = useState<IArmario[] | undefined>([]);
    const [predioSelecionado, setPredioSelecionado] = useState("A");
    const [idArmario, setIdArmario] = useState<Types.ObjectId>();
    const [armario, setArmario] = useState<IArmario>();

    const [criarArmarioModal, setCriarArmarioModal] = useState(false);
    const [armarioOcupadoModal, setArmarioOcupadoModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const resp = await axios.get("/api/armarios");
            const data = resp.data;
    
            // Ordena os armários de cada prédio
            const armariosOrdenados = Object.keys(data).reduce((acc: any, predio) => {
                // Ordena os armários do prédio pelo campo 'numero'
                acc[predio] = data[predio].sort((a: any, b: any) => a.numero - b.numero);
                return acc;
            }, {});
    
            // Atualiza os estados com os dados ordenados
            setArmarios(armariosOrdenados);
            setArmariosPredioAtual(armariosOrdenados.predioA);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };    

    const handlePredioAtual = (e: any) => {
        setPredioSelecionado(e.target.value);
        switch(e.target.value){
            case 'A':
                setArmariosPredioAtual(armarios.predioA);
                break;
            case 'B':
                setArmariosPredioAtual(armarios.predioB);
                break;
            case 'C':
                setArmariosPredioAtual(armarios.predioC);
                    break;
            case 'D':
                setArmariosPredioAtual(armarios.predioD);
                    break;
        }
    }

    const classeArmario = (armario : IArmario): string => {
        
        if(armario.ocupado){
            const prazo = armario.data_prazo ? new Date(armario.data_prazo) : null;
            const hoje = new Date();
            if(prazo){
                return hoje > prazo ? "armario armario-irregular" : "armario armario-ocupado"
            }
        }
        return "armario armario-livre";
    }

    const handleClick = (armario: IArmario): void => {
        if(armario.ocupado){
            setArmarioOcupadoModal(true);
            setArmario(armario);
            setIdArmario(armario._id);
        }
    }

    return (
        <div className="main">
            {criarArmarioModal && 
                <CriarArmario
                    closeModal={() => setCriarArmarioModal(false)}
                    predioSelecionado={predioSelecionado}
                    setArmariosPredioAtual={setArmariosPredioAtual}
                    handlePredioAtual={handlePredioAtual}
                    armarios={armarios} setArmarios={setArmarios}
                />
            }
            {armarioOcupadoModal &&
                <ArmarioOcupado
                    closeModal={() => setArmarioOcupadoModal(false)}
                    armario={armario}
                    armarios={armarios}
                    setArmarios={setArmarios}
                    idArmario={idArmario}
                    handlePredioAtual={handlePredioAtual}
                    setArmariosPredioAtual={setArmariosPredioAtual}
                    predioSelecionado={predioSelecionado}
                />
            }
            <div className="armarios-header">
                <select className="armarios-select" aria-label="Default select example" onChange={handlePredioAtual}>
                    <option value="A"selected>Predio A</option>
                    <option value="B">Predio B</option>
                    <option value="C">Predio C</option>
                    <option value="D">Predio D</option>
                </select>
                <button className="btn-criar" onClick={() => setCriarArmarioModal(true)}>
                    Adicionar armário
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>
            <div className="armarios">
                {armariosPredioAtual?.map(armario => (
                    <div 
                        className={classeArmario(armario)}
                        onClick={() => handleClick(armario)}
                    >   
                        {armario.numero}
                    </div>
                ))}
                {armariosPredioAtual?.length === 0 && 
                    <label className="my-3">Sem armários por aqui...</label>
                }
            </div>
        </div>
    )
}

export default Dashbord;