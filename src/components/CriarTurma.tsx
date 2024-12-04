import axios from "axios";
import { useState } from "react";

const CriarTurma = ({ closeModal, getData }: any) => {
  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("");

  const sendData = async () => {
    try {
      const response = await axios.post("/api/turmas", { codigo });
      setMessage("Turma criada com sucesso!");
      getData(); // Refresh the list of turmas
      closeModal();
    } catch (error) {
      setMessage("Erro ao criar turma.");
    }
  };

  return (
    <div className="modal meu-modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Criar Turma</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <label>Código da Turma</label>
            <input
              type="text"
              className="form-control"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            {message && <p className="text-danger mt-3">{message}</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Fechar
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={sendData}>
              Criar Turma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarTurma;