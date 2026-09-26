const fs = require('fs');

const tmdbEpisodes = [{"episode_number":1,"name":"Episódio 1","overview":"Com dificuldades financeiras, Oh Yi-young precisa voltar à vida de residente e acaba cometendo vários erros. Logo, ela enfrenta sua primeira crise com uma paciente.","still_path":"/ozu4s6IQX1L7M4dzAjS45PCMsfY.jpg"},{"episode_number":2,"name":"Episódio 2","overview":"Cansados da rotina difícil do hospital, os residentes do primeiro ano pensam em desistir. Yi-young sofre pressão de todos os lados, e Ku Do-won aparece para defendê-la.","still_path":"/8O8cKj9rHfB7Vt8cpEesvZngoct.jpg"},{"episode_number":3,"name":"Episódio 3","overview":"Episódio 3","still_path":"/qHU4gH5rlxDrRM8SffOxScW4igC.jpg"},{"episode_number":4,"name":"Episódio 4","overview":"Episódio 4","still_path":"/wHnG00Zk5pM9qqGFsETrbNvvPiJ.jpg"},{"episode_number":5,"name":"Episódio 5","overview":"Episódio 5","still_path":"/oEDZ5kPSVsIUBSmnsrDNsnI0RLw.jpg"},{"episode_number":6,"name":"Episódio 6","overview":"Episódio 6","still_path":"/tNmbISQ6YtmxEVJ8c037XdOyq9x.jpg"},{"episode_number":7,"name":"Episódio 7","overview":"Episódio 7","still_path":"/o2ZXngVZNmeJiP8n1Mbcvtm0yhZ.jpg"},{"episode_number":8,"name":"Episódio 8","overview":"Episódio 8","still_path":"/Ah7vCqGkSEDQbFk1VwCBFjPfcrY.jpg"},{"episode_number":9,"name":"Episódio 9","overview":"Episódio 9","still_path":"/1SVU1AZqzNOfCxgxzu0xiiJxCUZ.jpg"},{"episode_number":10,"name":"Episódio 10","overview":"Episódio 10","still_path":"/Aa8I4YHXgibAjwA6nINbr0449wR.jpg"},{"episode_number":11,"name":"Episódio 11","overview":"Episódio 11","still_path":"/swJuUGBVJF1TYiYvN92jPyzKA3r.jpg"},{"episode_number":12,"name":"Episódio 12","overview":"Episódio 12","still_path":"/zZkt3ZYC1oChhAYHdF3Zqa1eJ72.jpg"}];

try {
  const extracted = JSON.parse(fs.readFileSync('playbook_urls.json', 'utf8'));
  const finalEpisodes = tmdbEpisodes.map(ep => {
    const ext = extracted.find(e => e.id === ep.episode_number);
    return {
      id: ep.episode_number,
      title: ep.name,
      duration: "60 min",
      description: ep.overview,
      image: "https://image.tmdb.org/t/p/w500" + ep.still_path,
      videoUrl: ext ? ext.videoUrl : ""
    };
  });
  fs.writeFileSync('playbook_final.json', JSON.stringify(finalEpisodes, null, 2));
  console.log("playbook_final.json saved!");
} catch(e) {
  console.log("waiting...");
}
