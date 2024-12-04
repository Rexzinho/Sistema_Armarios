// pages/index.js
import React, { useState } from "react";
import Modal from "../components/Modal";
import CriarArmario from "../components/CriarArmario"; // Caminho atualizado

export default function Home() {
  const [activeModal, setActiveModal] = useState<number | string | null>(null);

  const openModal = (id: number | string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  const boxes = Array.from({ length: 30 }, (_, i) => i + 1); // Números de 1 a 30

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      
      <main>
        <h1 className="text-2xl font-bold mb-4">Prédio A</h1>
        <div className="grid grid-cols-5 gap-4">
          {boxes.map((number) => (
            <button
              key={number}
              onClick={() => openModal(number)}
              className={`p-4 border rounded ${
                number === 13
                  ? "border-red-500 text-red-500"
                  : number % 2 === 0
                  ? "border-blue-500 text-blue-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </main>

      <button
        onClick={() => openModal("add")}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 px-4 rounded-full shadow-lg"
      >
        +
      </button>

      {/* Modais */}
      {boxes.map((number) => (
        <Modal
          key={number}
          isOpen={activeModal === number}
          onClose={closeModal}
          title={`Detalhes do Armário ${number}`}
        >
          <p>Informações sobre o armário {number}.</p>
        </Modal>
      ))}

      <Modal
        isOpen={activeModal === "add"}
        onClose={closeModal}
        title="Adicionar Novo Armário"
      >
        <CriarArmario/>
      </Modal>
    </div>
  );
}
