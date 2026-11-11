import React, { useState, useEffect } from 'react';

export default function ModalInvestimento({ onClose, onSave, itemEditando }: { onClose: () => void, onSave: (d: any) => void, itemEditando?: any }) {
  const [tipo, setTipo] = useState('Tesouro Direto');
  const [inst, setInst] = useState('');
  const [aplic, setAplic] = useState('');
  const [atual, setAtual] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (itemEditando) {
      setTipo(itemEditando.tipo);
      setInst(itemEditando.instituicao);
      setAplic(itemEditando.valorAplicado);
      setAtual(itemEditando.valorAtual);
      setData(itemEditando.dataAplicacao);
    }
  }, [itemEditando]);

  const handleSalvar = () => {
    if(!inst || !aplic || !atual || !data) return;

    onSave({
      tipo,
      instituicao: inst,
      valorAplicado: Number(String(aplic).replace(',', '.')),
      valorAtual: Number(String(atual).replace(',', '.')),
      dataAplicacao: data
    });
  };

  return (
    <div className="modal-overlay">
      <div className="cartao cartao-amarelo modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>
            {itemEditando ? 'EDITAR INVESTIMENTO' : 'NOVO INVESTIMENTO'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
        </div>

        <label className="label-neo">Tipo de Investimento</label>
        <select className="input-neo" value={tipo} onChange={e => setTipo(e.target.value)}>
          <option>Tesouro Direto</option>
          <option>CDB</option>
          <option>Ações</option>
          <option>Fundos Imobiliários</option>
          <option>Criptomoedas</option>
        </select>

        <label className="label-neo">Instituição / Corretora</label>
        <input className="input-neo" type="text" value={inst} onChange={e => setInst(e.target.value)} placeholder="Ex: Banco Inter" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label className="label-neo">Valor Aplicado</label>
            <input className="input-neo" type="number" step="0.01" value={aplic} onChange={e => setAplic(e.target.value)} />
          </div>
          <div>
            <label className="label-neo">Valor Atual</label>
            <input className="input-neo" type="number" step="0.01" value={atual} onChange={e => setAtual(e.target.value)} />
          </div>
        </div>

        <label className="label-neo">Data da Aplicação</label>
        <input className="input-neo" type="date" value={data} onChange={e => setData(e.target.value)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
          <button className="botao-contorno" onClick={onClose}>CANCELAR</button>
          <button className="botao-azul" onClick={handleSalvar}>{itemEditando ? 'ATUALIZAR' : 'SALVAR'}</button>
        </div>
      </div>
    </div>
  );
}
