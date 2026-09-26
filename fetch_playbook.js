const fs = require('fs');

async function fetchEpisodes() {
  const episodes = [];
  
  for (let i = 1; i <= 12; i++) {
    try {
      console.log(`Fetching playbook episode ${i}...`);
      
      const embedUrl = `https://mgeb.top/embed/235355/1/${i}?media_id=55029&site_id=464`;
      const response = await fetch(embedUrl);
      const html = await response.text();
      
      const match = html.match(/var sources = \[{"file":"([^"]+)"/);
      
      if (match && match[1]) {
        episodes.push({
          id: i,
          videoUrl: match[1]
        });
      } else {
        console.log(`Failed to extract mp4 for episode ${i}`);
      }
    } catch (e) {
      console.error(`Error on episode ${i}`, e);
    }
  }
  
  fs.writeFileSync('playbook_urls.json', JSON.stringify(episodes, null, 2));
  console.log("Done!");
}

fetchEpisodes();
