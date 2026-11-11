import { useState } from 'react'
import InicioPg from './pages/InicioPg'
import ContasFixasPg from './pages/ContasFixasPg'
import ContasMesPg from './pages/ContasMesPg'
import ParcelamentosPg from './pages/ParcelamentosPg'
import InvestimentosPg from './pages/InvestimentosPg'

function App() {
  const [pagina, setPagina] = useState('inicio')

  const navegarPara = (rota: string) => {
    setPagina(rota)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px 0' }}>
      {pagina === 'inicio' && <InicioPg onNavigate={navegarPara} />}
      {pagina === 'contasfixas' && <ContasFixasPg onNavigate={navegarPara} />}
      {pagina === 'contasmes' && <ContasMesPg onNavigate={navegarPara} />}
      {pagina === 'parcelamentos' && <ParcelamentosPg onNavigate={navegarPara} />}
      {pagina === 'investimentos' && <InvestimentosPg onNavigate={navegarPara} />}
    </div>
  )
}

export default App
