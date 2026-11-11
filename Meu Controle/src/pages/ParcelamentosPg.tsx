import React, { useState, useEffect } from 'react';
import { API_URL, formatCurrency } from '../utils/api';
import ModalParcelamento from '../components/ModalParcelamento';

export default function ParcelamentosPg({ onNavigate }: { onNavigate: (rota: string) => void }) {
  const [parcelas, setParcelas] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState<any>(null);

  const carregarParcelas = async () => {
    const res = await fetch(`${API_URL}/parcelamentos`);
    setParcelas(await res.json());
  };

  useEffect(() => { carregarParcelas(); }, []);

  const abrirModalNovo = () => { setItemEditando(null); setModalOpen(true); };
  const abrirModalEditar = (item: any) => { setItemEditando(item); setModalOpen(true); };

  const salvarParcelamento = async (dados: any) => {
    if(itemEditando) {
      await fetch(`${API_URL}/parcelamentos/${itemEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    } else {
      await fetch(`${API_URL}/parcelamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }
    setModalOpen(false);
    carregarParcelas();
  };

  const deletarItem = async (id: number) => {
    if(window.confirm('Excluir este parcelamento?')) {
      await fetch(`${API_URL}/parcelamentos/${id}`, { method: 'DELETE' });
      carregarParcelas();
    }
  };

  const valorTotalPagar = parcelas.reduce((acc, p) => acc + Number(p.valorTotal), 0);
  const valorJaPago = parcelas.reduce((acc, p) => acc + (Number(p.valorTotal) / p.totalParcelas) * p.parcelasPagas, 0);
  const saldoDevedor = valorTotalPagar - valorJaPago;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      {modalOpen && <ModalParcelamento onClose={() => setModalOpen(false)} onSave={salvarParcelamento} itemEditando={itemEditando} />}

      <button className="botao-contorno topo-voltar" onClick={() => onNavigate('inicio')}>
        ← <span style={{ fontStyle: 'italic' }}>VOLTAR</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', border: '2px dashed #1769FF', padding: '10px 20px', borderRadius: '12px' }}>💳</div>
          <div>
            <h1 style={{ fontSize: '64px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Parcelamentos</h1>
            <p style={{ fontSize: '18px', fontWeight: '800', fontStyle: 'italic', margin: 0 }}>Tudo o que você parcelou, em um só lugar.</p>
          </div>
        </div>
        <button className="botao-azul" onClick={abrirModalNovo}>+ Adicionar Parcelamento</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' }}>
        <div className="cartao">
          <h2 style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '900', marginBottom: '16px' }}>SEUS PARCELAMENTOS</h2>
          
          <div className="tabela-header" style={{ gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.5fr 1.5fr 80px' }}>
            <div>LOJA</div>
            <div>PRODUTO</div>
            <div>TOTAL</div>
            <div>PARC.</div>
            <div>VLR PARCELA</div>
            <div>STATUS</div>
            <div style={{ textAlign: 'center' }}>AÇÕES</div>
          </div>

          {parcelas.map(p => {
            const valParcela = Number(p.valorTotal) / p.totalParcelas;
            return (
            <div key={p.id} className="tabela-linha" style={{ gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1.5fr 1.5fr 80px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span style={{ fontSize: '20px' }}>{p.icone}</span> {p.loja}</div>
              <div>{p.produto}</div>
              <div>{formatCurrency(p.valorTotal)}</div>
              <div>{p.parcelasPagas}/{p.totalParcelas}</div>
              <div style={{fontWeight:'800'}}>{formatCurrency(valParcela)}</div>
              <div>
                <span className={p.status === 'Vencendo' ? 'badge-amarelo' : 'badge-verde'}>{p.status}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                 <div className="icone-acao" onClick={() => abrirModalEditar(p)} title="Editar">✏️</div>
                 <div className="icone-acao lixeira" onClick={() => deletarItem(p.id)} title="Excluir">🗑️</div>
              </div>
            </div>
          )})}
        </div>

        <div>
          <div className="cartao">
            <h3 style={{ fontStyle: 'italic', fontWeight: '900', margin: '0 0 16px 0' }}>RESUMO</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Valor total</span><strong>{formatCurrency(valorTotalPagar)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Valor já pago</span><strong style={{ color: '#1FA34A' }}>{formatCurrency(valorJaPago)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span>Saldo devedor</span><strong style={{ color: '#1769FF' }}>{formatCurrency(saldoDevedor)}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
