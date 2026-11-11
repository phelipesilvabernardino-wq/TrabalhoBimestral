import React, { useState } from 'react';

export default function ModalContaMes({ onClose, onSave }: { onClose: () => void, onSave: (d: any) => void }) {
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('🛒 Supermercado');
  const [valor, setValor] = useState('');
  const [pago, setPago] = useState(false);

  const handleSalvar = () => {
    if(!desc || !valor || !data) return alert('Preencha os campos obrigatórios!');
    const icone = cat.substring(0, 2).trim();
    const categoriaTexto = cat.substring(2).trim();

    onSave({
      icone,
      data,
      descricao: desc,
      categoria: categoriaTexto,
      valor: Number(valor.replace(',', '.')),
      pago
    });
  };

  return (
    <div className="modal-overlay">
      <div className="cartao cartao-amarelo modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>✦ CONTA DO MÊS</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
        </div>

        <label className="label-neo">Data</label>
        <input className="input-neo" type="date" value={data} onChange={e => setData(e.target.value)} />

        <label className="label-neo">Descrição</label>
        <input className="input-neo" type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Ex: Compras da semana" />

        <label className="label-neo">Categoria</label>
        <select className="input-neo" value={cat} onChange={e => setCat(e.target.value)}>
          <option>🛒 Supermercado</option>
          <option>🥬 Feira</option>
          <option>🥩 Açougue</option>
          <option>🔧 Mecânica</option>
          <option>💊 Farmácia</option>
          <option>🍽️ Restaurante</option>
          <option>👕 Roupas</option>
        </select>

        <label className="label-neo">Valor (R$)</label>
        <input className="input-neo" type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} placeholder="0.00" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <input type="checkbox" checked={pago} onChange={e => setPago(e.target.checked)} style={{ width: '20px', height: '20px' }} />
          <label className="label-neo" style={{ margin: 0 }}>Esta conta já foi paga</label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
          <button className="botao-contorno" onClick={onClose}>CANCELAR</button>
          <button className="botao-azul" onClick={handleSalvar}>SALVAR</button>
        </div>
      </div>
    </div>
  );
}
