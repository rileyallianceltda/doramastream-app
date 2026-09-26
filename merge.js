const fs = require('fs');

const tmdbEpisodes = [
  {"episode_number":1,"name":"Episódio 1","overview":"O gerente Kim é um trabalhador como qualquer outro, e sua maior preocupação é se conectar com a filha Kim Min-ji. Até que ela desaparece de repente.","still_path":"/j1z8gs6jhJtRzS2Z3dSM5qKtvCM.jpg"},
  {"episode_number":2,"name":"Episódio 2","overview":"Desesperado para encontrar Min-ji, o gerente Kim coloca suas habilidades do passado para jogo. Ele era um agente secreto que nunca teve piedade dos inimigos.","still_path":"/75cFdAXUOmeVX2NhtdDthdJ9276.jpg"},
  {"episode_number":3,"name":"Episódio 3","overview":"Na procura por Min-ji, Kim reencontra Sung Han-soo e Park Jin-cheol, que são amigos do seu pai e ex-agentes secretos.","still_path":"/v8pPQuIbicSgqm2xWW20LZaTQk5.jpg"},
  {"episode_number":4,"name":"Episódio 4","overview":"As ações de Kim o deixam na mira de antigos e novos inimigos. Na hora do perigo, Han-soo e Jin-cheol aparecem para salvar o dia.","still_path":"/2yGGXfQmvcHlxktR17CowgcxVyp.jpg"},
  {"episode_number":5,"name":"Episódio 5","overview":"Episódio 5","still_path":"/eMUfMt3PczKcEuHDczeC1RwXcZz.jpg"},
  {"episode_number":6,"name":"Episódio 6","overview":"Episódio 6","still_path":"/5nn1Dnb4udjJdnNcYNXM8CeFdsN.jpg"},
  {"episode_number":7,"name":"Episódio 7","overview":"Episódio 7","still_path":"/50iNTwCz358iEgJW7dZtugaQ8eA.jpg"},
  {"episode_number":8,"name":"Episódio 8","overview":"Episódio 8","still_path":"/s0NeAeh5x74Gzja767ksNbzh3sz.jpg"},
  {"episode_number":9,"name":"Episódio 9","overview":"Episódio 9","still_path":"/yr9ZDaEz7bNSCFycTZBWftCjL2h.jpg"},
  {"episode_number":10,"name":"Episódio 10","overview":"Episódio 10","still_path":"/ySFDgVK2lKXYkFi4TuORq45TmmF.jpg"}
];

try {
  const extracted = JSON.parse(fs.readFileSync('episodes.json', 'utf8'));
  const finalEpisodes = tmdbEpisodes.map(ep => {
    const ext = extracted.find(e => e.id === ep.episode_number);
    return {
      id: ep.episode_number,
      title: ep.name,
      duration: "45 min",
      description: ep.overview,
      image: "https://image.tmdb.org/t/p/w500" + ep.still_path,
      videoUrl: ext ? ext.videoUrl : ""
    };
  });
  fs.writeFileSync('final_episodes.json', JSON.stringify(finalEpisodes, null, 2));
  console.log("final_episodes.json saved!");
} catch(e) {
  console.log("waiting...");
}
