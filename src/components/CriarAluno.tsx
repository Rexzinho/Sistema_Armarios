import axios from "axios";
import { useState } from "react";

const CriarAluno = ({ closeModal, turmaCodigo, getData }: any) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [message, setMessage] = useState("");

  const sendData = async () => {
    try {
      const response = await axios.post(`/api/turmas/${turmaCodigo}`, { nome, telefone });
      setMessage("Aluno adicionado com sucesso!");
      getData(); // Refresh the list of turmas
      closeModal();
    } catch (error) {
      setMessage("Erro ao adicionar aluno.");
    }
  };

  return (
    <div className="modal meu-modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar Aluno</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <label>Nome do Aluno</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label>Telefone do Aluno</label>
            <input
              type="text"
              className="form-control"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            {message && <p className="text-danger mt-3">{message}</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Fechar
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={sendData}>
              Adicionar Aluno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarAluno;