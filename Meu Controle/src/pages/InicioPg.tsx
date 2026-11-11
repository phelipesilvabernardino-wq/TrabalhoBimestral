import React, { useEffect, useState } from 'react';
import { API_URL, formatCurrency } from '../utils/api';

export default function InicioPg({ onNavigate }: { onNavigate: (rota: string) => void }) {
  const [renda] = useState(4500);
  const [despesas, setDespesas] = useState(0);

  useEffect(() => {
    const fetchTotais = async () => {
      try {
        const [resFixas, resMes] = await Promise.all([
          fetch(`${API_URL}/contas-fixas`),
          fetch(`${API_URL}/contas-mes`)
        ]);
        const fixas = await resFixas.json();
        const mes = await resMes.json();
        
        const totalFixas = fixas.reduce((acc: number, item: any) => acc + Number(item.valor), 0);
        const totalMes = mes.reduce((acc: number, item: any) => acc + Number(item.valor), 0);
        
        setDespesas(totalFixas + totalMes);
      } catch (error) {
        console.error("Erro ao carregar resumo:", error);
      }
    };
    fetchTotais();
  }, []);

  const saldo = renda - despesas;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ fontSize: '16px', fontWeight: '800', fontStyle: 'italic' }}>MEU CONTROLE</div>

      <div style={{ margin: '24px 0 32px 0' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '900', fontStyle: 'italic', margin: 0 }}>Meu dinheiro.</h1>
        <h1 style={{ fontSize: '56px', fontWeight: '900', fontStyle: 'italic', margin: '-10px 0 0 40px' }}>Minhas regras.</h1>
        <p style={{ fontSize: '15px', fontWeight: '600', marginTop: '12px' }}>Um caderno simples para organizar sua vida financeira.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div className="cartao">
          <div className="rotulo-cartao">RENDA DO MÊS</div>
          <div className="valor-cartao">{formatCurrency(renda)}</div>
        </div>
        <div className="cartao cartao-amarelo">
          <div className="rotulo-cartao">DESPESAS ATUAIS</div>
          <div className="valor-cartao">{formatCurrency(despesas)}</div>
        </div>
        <div className="cartao">
          <div className="rotulo-cartao">SALDO DISPONÍVEL</div>
          <div className="valor-cartao" style={{ color: saldo >= 0 ? '#1FA34A' : '#D32F2F' }}>{formatCurrency(saldo)}</div>
        </div>
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '900', fontStyle: 'italic', marginBottom: '16px' }}>SEU CONTROLE FINANCEIRO</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <div className="cartao" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ border: '2px solid #1769FF', borderRadius: '8px', padding: '12px', fontSize: '32px' }}>🏠</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>CONTAS FIXAS</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: '600', maxWidth: '280px' }}>Água • Luz • Internet • Gás • Faculdade • Aluguel • Financiamento</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="botao-contorno" onClick={() => onNavigate('contasfixas')}>Acessar Módulo →</button>
          </div>
        </div>

        <div className="cartao cartao-amarelo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ border: '2px solid #1769FF', borderRadius: '8px', padding: '12px', fontSize: '32px' }}>📈</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>INVESTIMENTOS</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: '600', maxWidth: '280px' }}>Acompanhe o rendimento de suas aplicações financeiras.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="botao-contorno" onClick={() => onNavigate('investimentos')}>Acessar Módulo →</button>
          </div>
        </div>

        <div className="cartao cartao-amarelo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ border: '2px solid #1769FF', borderRadius: '8px', padding: '12px', fontSize: '32px' }}>💳</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>PARCELAMENTOS</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: '600', maxWidth: '280px' }}>Acompanhe as compras parceladas no cartão e as parcelas que faltam.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="botao-contorno" onClick={() => onNavigate('parcelamentos')}>Acessar Módulo →</button>
          </div>
        </div>

        <div className="cartao" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ border: '2px solid #1769FF', borderRadius: '8px', padding: '12px', fontSize: '32px' }}>🛒</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', fontStyle: 'italic' }}>CONTAS DO MÊS</h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', fontWeight: '600', maxWidth: '280px' }}>Gastos variáveis: supermercado, feira, açougue, mecânica, farmácia.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="botao-contorno" onClick={() => onNavigate('contasmes')}>Acessar Módulo →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
