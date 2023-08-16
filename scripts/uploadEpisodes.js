require("dotenv").config();
const path = require("path");
const { readFileSync } = require("fs");
const { supabase } = require("../src/utils/supabaseClient");

const showId = 1;

// TODO: upload the rest of the episodes

async function run() {
  const dataDir = path.join(process.cwd(), "data/lex_episodes.txt");
  const episodeData = readFileSync(dataDir, "utf8");
  const episodeDataArray = episodeData.split("\n");

  const playListDir = path.join(process.cwd(), "data/lex_playlist_data.json");
  const playlistData = readFileSync(playListDir, "utf8");
  const playlistDataArray = JSON.parse(playlistData);

  console.log({ episodeDataArray });

  const episodes = [];
  for (const episode of episodeDataArray) {
    // First item in array is the episode number
    const episodeId = Number(episode.split(" ")[0]);

    if (episodeId === 0) {
      // Blank line at end of file
      continue;
    }

    // Find videoId from playlist data by matching episode number in title
    const videoIndex = playlistDataArray.findIndex((video) => video.title.endsWith(`#${episodeId}`));
    // console.log({ hmm: playlistDataArray[0], videoIndex });
    if (videoIndex === -1) {
      throw new Error(`Could not find videoId for episode ${episodeId}`);
    }
    const videoId = playlistDataArray[videoIndex]?.id;

    // Remove the episode number from the string
    let episodeTitle = episode.replace(episodeId, "").trim();
    episodeTitle = episodeTitle.replace(`| Lex Fridman Podcast #${episodeId}`, "").trim();

    episodes.push({
      show_id: showId,
      episode_id: episodeId,
      title: episodeTitle,
      youtube_video_id: videoId,
    });
  }

  console.log({ episodes });

  await insertEpisode(episodes);
}

async function insertEpisode(episode) {
  const { data, error } = await supabase.from("episodes").upsert(episode);
  console.log("supabase", { data, error });
}

run();
