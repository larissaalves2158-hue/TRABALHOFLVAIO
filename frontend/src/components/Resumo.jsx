export default function Resumo({ resumo }) {
    const media = resumo?.media_avalição 
    const exibida = media === null || media === undefined ? '-' :Number(media).toFixed(2).replace('.', ',')
    return (
        <section id="resumo" className="stats" aria-label="Resumo da coleção">
      <div className="stat-box"><span className="stat-icon stat-icon-lime">▦</span><div><small>TOTAL DE ÁLBUNS</small><strong>{resumo?.total ?? '—'}</strong></div><span className="stat-corner">↗</span></div>
      <div className="stat-box"><span className="stat-icon stat-icon-violet">★</span><div><small>MÉDIA DAS NOTAS</small><strong>{exibida}</strong></div><span className="stat-corner">↗</span></div>
      <div className="stat-box"><span className="stat-icon stat-icon-red">♬</span><div><small>ÁLBUM MAIS BEM AVALIADO</small><strong className="stat-best" title={resumo?.melhor || ''}>{resumo?.melhor || '—'}</strong></div><span className="stat-corner">↗</span></div>
    </section>
  )
}
