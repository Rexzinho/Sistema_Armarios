'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ITurma } from '../models/Turma';
import CriarTurma from '@/components/CriarTurma';
import DetalhesTurma from '@/components/DetalhesTurma';

const Turmas = () => {
  const [turmas, setTurmas] = useState<ITurma[]>([]);
  const [criarTurmaModal, setCriarTurmaModal] = useState(false);
  const [detalhesTurmaModal, setDetalhesTurmaModal] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<ITurma | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('/api/turmas');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar as turmas:', error);
    }
  };

  const handleViewDetails = (codigo: string) => {
    const turma = turmas.find(t => t.codigo === codigo);
    if (turma) {
      setSelectedTurma(turma);
      setDetalhesTurmaModal(true);
    }
  };

  return (
    <div className="main">
      <div className="turmas-header">
        <label className="p-2">Turmas</label>
        <button className="btn-criar" onClick={() => setCriarTurmaModal(true)}>
          Adicionar Turma <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <div className="turmas">
        {turmas.map((turma, index) => (
          <div className="turma" key={index} onClick={() => handleViewDetails(turma.codigo)}>
            {turma.codigo}
          </div>
        ))}
      </div>

      {criarTurmaModal && (
        <CriarTurma closeModal={() => setCriarTurmaModal(false)} getData={getData} />
      )}

      {detalhesTurmaModal && selectedTurma && (
        <DetalhesTurma
          closeModal={() => setDetalhesTurmaModal(false)}
          turma={selectedTurma}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Turmas;