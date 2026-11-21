const estilos = ['cover-lime', 'cover-rose', 'cover-purple', 'cover-blue', 'cover-orenge', 'cover-peach']
export default function Lista({ albuns }) {
    if (!albuns.length) return <p className="empty">Nenhum álbum cadastrado ainda.</p>
    return (
        <ul className="album-grid">
            {albuns.map((album, indice) => (
        <li className="album-card" key={album.id ?? indice}>
          <div className={`album-art ${estilos[indice % estilos.length]}`} aria-hidden="true"><div className="cover-shape"/><span className="cover-monogram">{(album.titulo || '♫').slice(0, 2).toUpperCase()}</span><span className="art-glyph">✳</span></div>
          <div className="album-line"><strong title={album.titulo}>{album.titulo}</strong><span className="rating">★ {Number(album.avaliacao).toFixed(1).replace('.', ',')}</span></div>
          <p>{album.artista} <span>·</span> {album.ano}</p>
        </li>
      ))}
    </ul>
  )
}
