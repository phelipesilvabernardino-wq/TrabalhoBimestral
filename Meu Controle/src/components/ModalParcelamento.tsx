import React, { useState } from 'react';

export default function ModalParcelamento({ onClose, onSave }: { onClose: () => void, onSave: (d: any) => void }) {
  const [cat, setCat] = useState('📱 Eletrônicos');
  const [loja, setLoja] = useState('');
  const [prod, setProd] = useState('');
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('12');
  const [pagas, setPagas] = useState('0');

  const handleSalvar = () => {
    if(!loja || !prod || !valor || !parcelas) return alert('Preencha os campos!');
    const icone = cat.substring(0, 2).trim();

    onSave({
      icone,
      loja,
      produto: prod,
      valorTotal: Number(valor.replace(',', '.')),
      totalParcelas: Number(parcelas),
      parcelasPagas: Number(pagas),
      status: Number(pagas) >= Number(parcelas) ? 'Quitado' : 'Em dia'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="cartao cartao-amarelo modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>✦ NOVO PARCELAMENTO</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
        </div>

        <label className="label-neo">Categoria</label>
        <select className="input-neo" value={cat} onChange={e => setCat(e.target.value)}>
          <option>📱 Eletrônicos</option>
          <option>👕 Roupas</option>
          <option>🏠 Casa</option>
          <option>🏋️ Saúde e bem-estar</option>
          <option>✈️ Viagem</option>
          <option>🛍️ Outro</option>
        </select>

        <label className="label-neo">Loja / Estabelecimento</label>
        <input className="input-neo" type="text" value={loja} onChange={e => setLoja(e.target.value)} />

        <label className="label-neo">Produto / Serviço</label>
        <input className="input-neo" type="text" value={prod} onChange={e => setProd(e.target.value)} />

        <label className="label-neo">Valor Total (R$)</label>
        <input className="input-neo" type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label className="label-neo">Nº Parcelas</label>
            <input className="input-neo" type="number" value={parcelas} onChange={e => setParcelas(e.target.value)} />
          </div>
          <div>
            <label className="label-neo">Já Pagas</label>
            <input className="input-neo" type="number" value={pagas} onChange={e => setPagas(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
          <button className="botao-contorno" onClick={onClose}>CANCELAR</button>
          <button className="botao-azul" onClick={handleSalvar}>SALVAR</button>
        </div>
      </div>
    </div>
  );
}
