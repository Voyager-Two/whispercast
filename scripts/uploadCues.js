require("dotenv").config();
const path = require("path");
const { readdirSync, readFileSync } = require("fs");
const { WebVTTParser } = require("webvtt-parser");
const { supabase } = require("../src/utils/supabaseClient");

async function run() {
  const dataDir = path.join(process.cwd(), "../../lex-fridman-podcasts-transcriptions");
  const allFileNames = readdirSync(dataDir);
  const parser = new WebVTTParser();
  const showId = 1;

  for (const fileName of allFileNames) {
    if (fileName.includes("large")) {

      const episodeId = parseInt(fileName.split("_")[1]);

      if (episodeId > 310) {
        console.log(`Skipping episode ${episodeId}`);
        continue;
      }
      console.log(`------Uploading episode ${episodeId}`);

      const vttData = readFileSync(dataDir + `/${fileName}`, "utf8");
      const vttParsed = parser.parse(vttData);

      const indexedCues = [];
      const jsonCues = [];
      let cueId = 0;
      vttParsed.cues.forEach((cue) => {
        cueId++;
        indexedCues.push({
          show_id: showId,
          episode_id: episodeId,
          cue_id: cueId,
          start_time: cue.startTime,
          end_time: cue.endTime,
          caption: cue.text.trim(),
        });
        jsonCues.push({
          start_time: cue.startTime,
          end_time: cue.endTime,
          caption: cue.text.trim(),
        });
      });

      console.log({ cueId, episodeId, showId });

      await insertJsonCues({ show_id: showId, episode_id: episodeId, cues: jsonCues });

      await insertIndexedCues(indexedCues);
    }
  }
}

async function insertIndexedCues(inputData) {
  const { data, error } = await supabase.from("cues_index").upsert(inputData);
  console.log("supabase", { data, error });
}

async function insertJsonCues(inputData) {
  const { data, error } = await supabase.from("cues_json").upsert(inputData);
  console.log("supabase", { data, error });
}

run();
