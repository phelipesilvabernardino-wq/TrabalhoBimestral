import React, { useState, useEffect } from 'react';

export default function ModalContaFixa({ onClose, onSave, itemEditando }: { onClose: () => void, onSave: (d: any) => void, itemEditando?: any }) {
  const [conta, setConta] = useState('💧  Água');
  const [valor, setValor] = useState('');
  const [dia, setDia] = useState('10');

  useEffect(() => {
    if (itemEditando) {
      setConta(`${itemEditando.icone}  ${itemEditando.nome}`);
      setValor(itemEditando.valor);
      setDia(itemEditando.diaVencimento);
    }
  }, [itemEditando]);

  const handleSalvar = () => {
    if(!valor || !dia) return;
    const icone = conta.substring(0, 2).trim();
    const nome = conta.substring(2).trim();
    
    onSave({
      icone,
      nome,
      valor: Number(String(valor).replace(',', '.')),
      diaVencimento: Number(dia),
      status: 'Em dia'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="cartao cartao-amarelo modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>
            {itemEditando ? 'EDITAR CONTA FIXA' : 'NOVA CONTA FIXA'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
        </div>

        <label className="label-neo">Conta</label>
        <select className="input-neo" value={conta} onChange={e => setConta(e.target.value)}>
          <option>💧  Água</option>
          <option>💡  Luz / Energia</option>
          <option>🌐  Internet</option>
          <option>🔥  Gás</option>
          <option>🎓  Faculdade</option>
          <option>🏠  Aluguel</option>
          <option>💳  Financiamento</option>
        </select>

        <label className="label-neo">Valor (R$)</label>
        <input className="input-neo" type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} placeholder="0.00" />

        <label className="label-neo">Dia de Vencimento todo mês</label>
        <input className="input-neo" type="number" min="1" max="31" value={dia} onChange={e => setDia(e.target.value)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
          <button className="botao-contorno" onClick={onClose}>CANCELAR</button>
          <button className="botao-azul" onClick={handleSalvar}>{itemEditando ? 'ATUALIZAR' : 'SALVAR'}</button>
        </div>
      </div>
    </div>
  );
}
