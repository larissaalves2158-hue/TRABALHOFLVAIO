import {useState} from 'react'

const inicial = { titulo: '', artista: '', ano: '', avaliacao: '' }

export default function Formulario({ onCadastrar, erro }) {
  const [campos, setCampos] = useState(inicial)
  const [enviando, setEnviando] = useState(false)

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setCampos((atuais) => ({ ...atuais, [name]: value }))
    }

    async function enviar (evento) {
        evento.preventDefault()
        setEnviando(true)
        const salvo = await onCadastrar({
            titulo: campos.titulo.trim(),
            artista: campos.artista.trim(),
            ano: Number(campos.ano),
            avaliacao: Number(campos.avaliacao.replace(',', '.'))
        })
        if (salvo) setCampos(inicial)
        setEnviando(false)
    }

    return (
        <section id="novo-album" className="new-album-panel">
            <div className="panel-header"><div className="panel-icon">♫</div><span className="panel-kicker">NOVA DESCOBERTA</span><h2>Adicionar álbum<span>.</span></h2><p>Qual álbum merece um espaço na sua coleção?</p></div>
      <form onSubmit={enviar}>
        <label htmlFor="titulo">Título do álbum</label>
        <input id="titulo" name="titulo" type="text" maxLength="100" required placeholder="Ex.: Thriller" value={campos.titulo} onChange={atualizarCampo}/>
        <label htmlFor="artista">Artista</label>
        <input id="artista" name="artista" type="text" maxLength="100" required placeholder="Ex.: Michael Jackson" value={campos.artista} onChange={atualizarCampo}/>
        <div className="field-row"><div><label htmlFor="ano">Ano</label><input id="ano" name="ano" type="number" required placeholder="1982" value={campos.ano} onChange={atualizarCampo}/></div><div><label htmlFor="avaliacao">Sua nota (0–10)</label><input id="avaliacao" name="avaliacao" inputMode="decimal" type="text" required placeholder="9,5" value={campos.avaliacao} onChange={atualizarCampo}/></div></div>
       {erro && <p className="erro" role="alert">{erro}</p>}
        <button className="submit-button" type="submit" disabled={enviando}><span>{enviando ? 'Salvando...' : 'Salvar na coleção'}</span><span className="button-plus">↗</span></button>
      </form>
      <div className="panel-footer"><span>✦</span> Cada álbum conta uma história.</div>
    </section>
  )
}