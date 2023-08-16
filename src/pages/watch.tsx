import Watch from "@feature/Watch";
import { useRouter } from "next/router";

function WatchIndex() {
  const router = useRouter();
  const { show, episode, time } = router.query;
  const showId = parseInt(show as string);
  const episodeId = parseInt(episode as string);
  const startTime = parseInt(time as string);

  return <Watch showId={showId} episodeId={episodeId} startTime={startTime} />;
}

export default WatchIndex;
