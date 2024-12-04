import axios from "axios";
import { use, useState } from "react";
import { ITurma } from "@/app/models/Turma";
import CriarAluno from "./CriarAluno";
import { useEffect } from "react";

const DetalhesTurma = ({
  turma,
  closeModal,
  getData,
}: {
  turma: ITurma;
  closeModal: () => void;
  getData: () => void;
}) => {
  const [localTurma, setLocalTurma] = useState(turma);
  const [codigo, setCodigo] = useState(turma.codigo);
  const [alunos, setAlunos] = useState(turma.alunos);

  const refreshTurma = async () => {
    try {
      const response = await axios.get(`/api/turmas/${turma.codigo}`);
      setLocalTurma(response.data);
      setCodigo(response.data.codigo);
      setAlunos(response.data.alunos);
    } catch (error) {
      console.error("Erro ao buscar turma:", error);
    }
  }

  useEffect(() => {
    refreshTurma();
  }, []);

  useEffect(() => {
    setCodigo(localTurma.codigo);
    setAlunos(localTurma.alunos);
  }, [localTurma]);

  const [message, setMessage] = useState("");
  const [criarAlunoModal, setCriarAlunoModal] = useState(false);

  const updateTurma = async () => {
    try {
      await axios.patch(`/api/turmas/${turma.codigo}`, {
        novoCodigo: codigo,
      });
      setMessage("Código da turma atualizado com sucesso!");
      getData(); // Recarregar os dados da turma
      refreshTurma();
    } catch (error) {
      setMessage("Erro ao atualizar código da turma.");
    }
  };

  const updateAluno = async (
    alunoId: string,
    nome: string,
    telefone: string
  ) => {
    try {
      await axios.put(`/api/aluno/${alunoId}`, { nome, telefone });
      setMessage("Informações do aluno atualizadas com sucesso!");
      getData(); // Recarregar a lista de alunos após a atualização
      refreshTurma();
    } catch (error) {
      setMessage("Erro ao atualizar informações do aluno.");
    }
  };

  const removeAluno = async (alunoId: string) => {
    try {
      await axios.delete(`/api/aluno/${alunoId}`, {
        data: { codigo: codigo },
      });
      setMessage("Aluno removido com sucesso!");
      getData(); // Recarregar a lista de alunos após a remoção
      refreshTurma();
    } catch (error) {
      setMessage("Erro ao remover aluno.");
    }
  };

  const deleteTurma = async () => {
    try {
      await axios.delete(`/api/turmas/${turma.codigo}`);
      setMessage("Turma removida com sucesso!");
      getData(); // Recarregar lista de turmas após remoção
      closeModal();
      refreshTurma();
    } catch (error) {
      setMessage("Erro ao remover turma.");
    }
  };

  return (
    <div className="modal me</div>u-modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes da Turma</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <label>Código da Turma</label>
            <input
              type="text"
              className="form-control"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <button
              className="btn btn-outline-primary mt-2"
              onClick={updateTurma}
            >
              Atualizar Código
            </button>
            <h5 className="mt-4">Alunos</h5>
            {alunos.map((aluno) => (
              <div key={String(aluno._id)} className="aluno">
                <input
                  type="text"
                  className="form-control"
                  value={aluno.nome}
                  onChange={(e) => {
                    const newAlunos = [...alunos];
                    const updatedAluno = newAlunos.find(
                      (a) => a._id === aluno._id
                    );
                    if (updatedAluno) updatedAluno.nome = e.target.value;
                    setAlunos(newAlunos);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={aluno.telefone || ""}
                  onChange={(e) => {
                    const newAlunos = [...alunos];
                    const updatedAluno = newAlunos.find(
                      (a) => a._id === aluno._id
                    );
                    if (updatedAluno) updatedAluno.telefone = e.target.value;
                    setAlunos(newAlunos);
                  }}
                />
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={() =>
                    aluno._id && updateAluno(aluno._id.toString(), aluno.nome, aluno.telefone)
                  }
                >
                  Atualizar Aluno
                </button>
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={() => aluno._id && removeAluno(aluno._id.toString())}
                >
                  Remover Aluno
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary mt-4"
              onClick={() => setCriarAlunoModal(true)}
            >
              Adicionar Aluno
            </button>
            {message && <p className="text-danger mt-3">{message}</p>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={closeModal}
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={deleteTurma}
            >
              Apagar Turma
            </button>
          </div>
        </div>
      </div>
      {criarAlunoModal && (
        <CriarAluno
          closeModal={() => setCriarAlunoModal(false)}
          turmaCodigo={turma.codigo}
          getData={() => {
            refreshTurma();
          }}
        />
      )}   
    </div>
  );
};

export default DetalhesTurma;
