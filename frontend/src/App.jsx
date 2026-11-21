import { useState, useEffect } from "react";
import Formulario from './components/Formulario';
import Lista from './components/Lista';
import Resumo from './components/Resumo';
import './App.css';

const URL_ALBUNS = '/api/albuns/';
const URL_RESUMO = '/api/albuns/resumo/';

export default function App() {
  const [albuns, setAlbuns] = useState([]);
  const [resumo, setResumo] = useState( null );
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [carregando, setCarregando] = useState(true);

  async function atualizarTela() {
    try {
      const resposta = await fetch(URL_ALBUNS);
      if (!resposta.ok) {
        throw new Error('Erro ao buscar álbuns');
      }
      const dados = await resposta.json();
      setAlbuns(dados)
      setAviso('')
    } catch {
      setAviso('Não foi possível buscar os álbuns. Tente novamente mais tarde.');
    }

    try {
      const resposta = await fetch(URL_RESUMO);
      if (!resposta.ok) throw new Error('Falha no resumo');
      setResumo(await resposta.json());
    } catch {
      setResumo(null);
    }
    setCarregando(false);
  }

  useEffect(() => { atualizarTela() }, [])

  async function cadastrarAlbum(dados) {
    try {
      const resposta = await fetch(URL_ALBUNS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })
      if (!resposta.ok) {
        const respostaErro = await resposta.json().catch(() => ({}))
        setErro (respostaErro.erro || 'Erro ao cadastrar álbum');
        return false
      }
      setErro('');
      await atualizarTela()
      return true
    } catch {
      setErro('Erro ao cadastrar álbum');
      return false
    }
  } 

  const albunsFiltrados = albuns.filter(album =>
  (album.titulo || '').toLowerCase().includes(busca.trim().toLowerCase()),
  )

  return (
    
<div className="app-shell">
  <aside className="sidebar" aria-label="Navegação principal">
    <a href="#inicio" className="brand">
      <span className="brand-symbol">
        <span className="brand-ring"></span>
      </span>

      <span className="brand-words">
        <strong>SONORA</strong>
        <small>minha coleção</small>
      </span>
    </a>
      <p className="nav-caption">SEU ESPAÇO</p>
        <nav className="side-nav">
          <a href="#biblioteca" className="nav-link active"><span>▦</span> Biblioteca</a>
          <a href="#novo-album" className="nav-link"><span>✚</span> Adicionar álbum</a>
          <a href="#resumo" className="nav-link"><span>◫</span> Estatísticas</a>
        </nav>
        <div className="sidebar-promo"><span className="tiny-orbit">✦</span><strong>Suas músicas.<br/>Sua história.</strong><small>Um acervo para chamar de seu.</small></div>
      
      </aside>
      <main id="inicio" className="main-content">
        <div className="topbar"><div className="breadcrumb">Minha coleção <span>/</span> <b>Biblioteca</b></div><span className="top-pill"><span className="status-dot"/> ACERVO PESSOAL</span></div>
        <header className="hero">
          <div className="hero-text"><span className="hero-label"><span className="mini-star">✦</span> SEU MUNDO EM ÁLBUNS</span><h1>Sua música.<br/><em>Seu universo.</em></h1><p>Organize seus álbuns favoritos, guarde suas notas e redescubra cada som.</p><a href="#novo-album" className="hero-button">+ Adicionar álbum <span>↗</span></a></div>
          <div className="hero-art" aria-hidden="true"><div className="glow-a"/><div className="hero-cover"><span className="cover-top">THE SOUND OF</span><span className="cover-title">YOUR<br/>STORY.</span><span className="cover-bottom">COLLECTION Nº 01</span></div><div className="vinyl"><div className="vinyl-center"/></div><span className="hero-sparkle sparkle-one">✦</span><span className="hero-sparkle sparkle-two">✳</span></div>
        </header>
 
        <Resumo resumo={resumo} />
        <div className="workspace">
          <section className="library-section" id="biblioteca">
            <div className="section-heading"><div><span className="eyebrow">ACERVO MUSICAL</span><h2>Minha biblioteca <span className="heading-accent">✳</span></h2></div><span className="count-chip">{albunsFiltrados.length} álbuns</span></div>
            <div className="search-wrap"><span className="search-icon" aria-hidden="true">⌕</span><input type="search" aria-label="Buscar álbum pelo título" placeholder="Buscar álbum pelo título..." value={busca} onChange={(evento) => setBusca(evento.target.value)}/><span className="search-hint">BUSCAR</span></div>
            {aviso && <p className="aviso" role="status">{aviso}</p>}
            {carregando ? <p className="empty-state">Carregando álbuns...</p> : <Lista albuns={albunsFiltrados}/>}
            <p className="art-note">As capas são elementos gráficos ilustrativos, não as capas originais dos discos.</p>
          </section>
          <Formulario onCadastrar={cadastrarAlbum} erro={erro}/>
        </div>
        <footer className="footer"><span>SONORA © 2026</span></footer>
      </main>
    </div>
  )
}