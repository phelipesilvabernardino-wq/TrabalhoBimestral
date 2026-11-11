import React, { useState, useEffect } from 'react';
import { API_URL, formatCurrency } from '../utils/api';
import ModalContaMes from '../components/ModalContaMes';

export default function ContasMesPg({ onNavigate }: { onNavigate: (rota: string) => void }) {
  const [contas, setContas] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const carregarContas = async () => {
    const res = await fetch(`${API_URL}/contas-mes`);
    setContas(await res.json());
  };

  useEffect(() => { carregarContas(); }, []);

  const salvarConta = async (dados: any) => {
    await fetch(`${API_URL}/contas-mes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    setModalOpen(false);
    carregarContas();
  };

  const deletarConta = async (id: number) => {
    await fetch(`${API_URL}/contas-mes/${id}`, { method: 'DELETE' });
    carregarContas();
  };

  const total = contas.reduce((acc, c) => acc + Number(c.valor), 0);
  const pago = contas.filter(c => c.pago).reduce((acc, c) => acc + Number(c.valor), 0);
  const pendente = total - pago;
  const pctPago = total === 0 ? 0 : Math.round((pago / total) * 100);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      {modalOpen && <ModalContaMes onClose={() => setModalOpen(false)} onSave={salvarConta} />}

      <button className="botao-contorno topo-voltar" onClick={() => onNavigate('inicio')}>
        ← <span style={{ fontStyle: 'italic' }}>VOLTAR</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '64px', border: '2px dashed #1769FF', padding: '10px 20px', borderRadius: '12px' }}>🛒</div>
          <div>
            <h1 style={{ fontSize: '64px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Contas do Mês</h1>
            <p style={{ fontSize: '18px', fontWeight: '800', fontStyle: 'italic', margin: 0 }}>Gastos variáveis que fazem parte do seu dia a dia.</p>
          </div>
        </div>
        <button className="botao-azul" onClick={() => setModalOpen(true)}>+ Adicionar Conta</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' }}>
        <div className="cartao">
          <h2 style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '900', marginBottom: '16px' }}>✦ CONTAS DO MÊS (VALORES VARIÁVEIS)</h2>
          
          <div className="tabela-header" style={{ gridTemplateColumns: '50px 1.5fr 2fr 1.5fr 1.5fr 1.5fr 60px' }}>
            <div></div>
            <div>DATA</div>
            <div>DESCRIÇÃO</div>
            <div>CATEGORIA</div>
            <div>VALOR</div>
            <div>STATUS</div>
            <div style={{ textAlign: 'center' }}>AÇÕES</div>
          </div>

          {contas.map(c => (
            <div key={c.id} className="tabela-linha" style={{ gridTemplateColumns: '50px 1.5fr 2fr 1.5fr 1.5fr 1.5fr 60px' }}>
              <div style={{ fontSize: '20px' }}>{c.icone}</div>
              <div>{c.data.split('-').reverse().join('/')}</div>
              <div>{c.descricao}</div>
              <div>{c.categoria}</div>
              <div style={{fontWeight:'800'}}>{formatCurrency(c.valor)}</div>
              <div><span className={c.pago ? 'badge-verde' : 'badge-azul'}>{c.pago ? 'Pago' : 'Pendente'}</span></div>
              <div className="lixeira" onClick={() => deletarConta(c.id)} style={{ textAlign: 'center', cursor: 'pointer', fontSize: '18px' }}>🗑️</div>
            </div>
          ))}
        </div>

        <div>
          <div className="cartao">
            <h3 style={{ fontStyle: 'italic', fontWeight: '900', margin: '0 0 16px 0' }}>◔ RESUMO DO MÊS</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Total gasto</span><strong>{formatCurrency(total)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Pendente</span><strong>{formatCurrency(pendente)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span>Pago</span><strong style={{ color: '#1FA34A' }}>{formatCurrency(pago)}</strong></div>
            
            <hr style={{ border: '1px dashed #1769FF' }} />
            
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `conic-gradient(#1FA34A 0% ${pctPago}%, #1769FF ${pctPago}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>{pctPago}%</div>
               </div>
               <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#1FA34A' }}>● Pago</div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#1769FF', marginTop: '8px' }}>● Pendente</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
