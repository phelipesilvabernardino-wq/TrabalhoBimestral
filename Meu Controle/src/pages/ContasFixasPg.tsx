import React, { useState, useEffect } from 'react';
import { API_URL, formatCurrency } from '../utils/api';
import ModalContaFixa from '../components/ModalContaFixa';

export default function ContasFixasPg({ onNavigate }: { onNavigate: (rota: string) => void }) {
  const [contas, setContas] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemEditando, setItemEditando] = useState<any>(null);

  const carregarContas = async () => {
    const res = await fetch(`${API_URL}/contas-fixas`);
    setContas(await res.json());
  };

  useEffect(() => { carregarContas(); }, []);

  const abrirModalNovo = () => { setItemEditando(null); setModalOpen(true); };
  const abrirModalEditar = (item: any) => { setItemEditando(item); setModalOpen(true); };

  const salvarConta = async (dados: any) => {
    if (itemEditando) {
      await fetch(`${API_URL}/contas-fixas/${itemEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    } else {
      await fetch(`${API_URL}/contas-fixas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
    }
    setModalOpen(false);
    carregarContas();
  };

  const deletarConta = async (id: number) => {
    if(window.confirm('Excluir esta conta?')) {
      await fetch(`${API_URL}/contas-fixas/${id}`, { method: 'DELETE' });
      carregarContas();
    }
  };

  const totalMensal = contas.reduce((acc, c) => acc + Number(c.valor), 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      {modalOpen && <ModalContaFixa onClose={() => setModalOpen(false)} onSave={salvarConta} itemEditando={itemEditando} />}

      <button className="botao-contorno topo-voltar" onClick={() => onNavigate('inicio')}>
        ← <span style={{ fontStyle: 'italic' }}>VOLTAR</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', border: '2px dashed #1769FF', padding: '10px 20px', borderRadius: '12px' }}>🏠</div>
          <div>
            <h1 style={{ fontSize: '64px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Contas Fixas</h1>
            <p style={{ fontSize: '18px', fontWeight: '800', fontStyle: 'italic', margin: 0 }}>Água • Luz • Internet • Gás • Aluguel</p>
          </div>
        </div>
        <button className="botao-azul" onClick={abrirModalNovo}>+ Adicionar Conta</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="cartao">
          <h2 style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '900', marginBottom: '16px' }}>LISTA DAS CONTAS FIXAS</h2>
          
          <div className="tabela-header" style={{ gridTemplateColumns: '3fr 2fr 2fr 2fr 80px' }}>
            <div>CONTA</div>
            <div>VALOR</div>
            <div>VENCIMENTO</div>
            <div>STATUS</div>
            <div style={{ textAlign: 'center' }}>AÇÕES</div>
          </div>

          {contas.length === 0 && <p>Nenhuma conta cadastrada.</p>}

          {contas.map(c => (
            <div key={c.id} className="tabela-linha" style={{ gridTemplateColumns: '3fr 2fr 2fr 2fr 80px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>{c.icone}</span> {c.nome}
              </div>
              <div>{formatCurrency(c.valor)}</div>
              <div>Dia {c.diaVencimento}</div>
              <div><span className="badge-verde">{c.status}</span></div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                 <div className="icone-acao" onClick={() => abrirModalEditar(c)} title="Editar">✏️</div>
                 <div className="icone-acao lixeira" onClick={() => deletarConta(c.id)} title="Excluir">🗑️</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="cartao cartao-amarelo" style={{ borderStyle: 'dashed', borderColor: '#1769FF' }}>
            <h3 style={{ fontStyle: 'italic', fontWeight: '900', margin: '0 0 8px 0' }}>TOTAL DAS CONTAS FIXAS</h3>
            <div style={{ fontSize: '42px', fontWeight: '900' }}>{formatCurrency(totalMensal)}</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>por mês</div>
          </div>
        </div>
      </div>
    </div>
  );
}
