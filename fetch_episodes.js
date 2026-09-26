const fs = require('fs');

async function fetchEpisodes() {
  const episodes = [];
  
  for (let i = 1; i <= 10; i++) {
    try {
      console.log(`Fetching episode ${i}...`);
      
      // Step 1: Get player embed URL
      // The embed URL pattern is usually predictable: https://mgeb.top/embed/296206/1/{i}?media_id=35860&site_id=464
      const embedUrl = `https://mgeb.top/embed/296206/1/${i}?media_id=35860&site_id=464`;
      
      // Step 2: Fetch embed HTML
      const response = await fetch(embedUrl);
      const html = await response.text();
      
      // Step 3: Extract the mp4 URL using regex
      const match = html.match(/var sources = \[{"file":"([^"]+)"/);
      
      if (match && match[1]) {
        let mp4Url = match[1];
        // Ensure it's not the fallback/iframe but the real mp4
        episodes.push({
          id: i,
          title: `Episódio ${i}`,
          duration: "45 min",
          videoUrl: mp4Url,
          description: `Episódio ${i} de Agente Kim: Reativado.`
        });
      } else {
        console.log(`Failed to extract mp4 for episode ${i}`);
      }
    } catch (e) {
      console.error(`Error on episode ${i}`, e);
    }
  }
  
  fs.writeFileSync('episodes.json', JSON.stringify(episodes, null, 2));
  console.log("Done!");
}

fetchEpisodes();
