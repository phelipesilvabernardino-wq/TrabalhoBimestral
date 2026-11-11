import React, { useState, useEffect } from 'react';
import { API_URL, formatCurrency } from '../utils/api';
import ModalInvestimento from '../components/ModalInvestimento';

export default function InvestimentosPg({ onNavigate }: { onNavigate: (rota: string) => void }) {
  const [investimentos, setInvestimentos] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const carregarInvestimentos = async () => {
    const res = await fetch(`${API_URL}/investimentos`);
    setInvestimentos(await res.json());
  };

  useEffect(() => { carregarInvestimentos(); }, []);

  const salvarInvestimento = async (dados: any) => {
    await fetch(`${API_URL}/investimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    setModalOpen(false);
    carregarInvestimentos();
  };

  const deletarItem = async (id: number) => {
    await fetch(`${API_URL}/investimentos/${id}`, { method: 'DELETE' });
    carregarInvestimentos();
  };

  const totalAplicado = investimentos.reduce((acc, i) => acc + Number(i.valorAplicado), 0);
  const totalAtual = investimentos.reduce((acc, i) => acc + Number(i.valorAtual), 0);
  
  const meta = 20000;
  const pctMeta = totalAtual === 0 ? 0 : Math.min(100, Math.round((totalAtual / meta) * 100));

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      {modalOpen && <ModalInvestimento onClose={() => setModalOpen(false)} onSave={salvarInvestimento} />}

      <button className="botao-contorno topo-voltar" onClick={() => onNavigate('inicio')}>
        ← <span style={{ fontStyle: 'italic' }}>VOLTAR</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', border: '2px dashed #1769FF', padding: '10px 20px', borderRadius: '12px' }}>📈</div>
          <div>
            <h1 style={{ fontSize: '64px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Investimentos</h1>
            <p style={{ fontSize: '18px', fontWeight: '800', fontStyle: 'italic', margin: 0 }}>Seu dinheiro trabalhando por você.</p>
          </div>
        </div>
        <button className="botao-azul" onClick={() => setModalOpen(true)}>+ Adicionar Investimento</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' }}>
        <div className="cartao">
          <h2 style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '900', marginBottom: '16px' }}>✦ MEUS INVESTIMENTOS</h2>
          
          <div className="tabela-header" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 60px' }}>
            <div>TIPO</div>
            <div>INSTITUIÇÃO</div>
            <div>APLICADO</div>
            <div>VALOR ATUAL</div>
            <div>RENDIMENTO</div>
            <div style={{ textAlign: 'center' }}>AÇÕES</div>
          </div>

          {investimentos.map(i => {
            const rend = Number(i.valorAtual) - Number(i.valorAplicado);
            const rendPct = (rend / Number(i.valorAplicado)) * 100;
            const isPos = rend >= 0;
            return (
            <div key={i.id} className="tabela-linha" style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 1fr 60px' }}>
              <div>{i.tipo}</div>
              <div>{i.instituicao}</div>
              <div>{formatCurrency(i.valorAplicado)}</div>
              <div style={{ fontWeight: '800' }}>{formatCurrency(i.valorAtual)}</div>
              <div style={{ color: isPos ? '#1FA34A' : '#D32F2F', fontWeight: '800' }}>
                {isPos ? '+' : ''}{rendPct.toFixed(2)}%
              </div>
              <div className="lixeira" onClick={() => deletarItem(i.id)} style={{ textAlign: 'center', cursor: 'pointer', fontSize: '18px' }}>🗑️</div>
            </div>
          )})}
        </div>

        <div>
          <div className="cartao">
            <h3 style={{ fontStyle: 'italic', fontWeight: '900', margin: '0 0 8px 0' }}>🎯 SEU OBJETIVO</h3>
            <div style={{ fontSize: '18px', fontWeight: '900' }}>Liberdade financeira</div>
            <p style={{ fontSize: '13px', fontWeight: '600', margin: '4px 0 16px 0' }}>Junte R$ 20.000,00 para alcançar sua independência.</p>
            
            <div style={{ width: '100%', height: '16px', backgroundColor: '#E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
               <div style={{ width: `${pctMeta}%`, height: '100%', backgroundColor: '#1769FF' }}></div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: '900', marginTop: '4px' }}>{pctMeta}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
