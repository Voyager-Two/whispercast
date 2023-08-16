import ViewCaptions from "@feature/ViewCaptions";
import { useRouter } from "next/router";

function ViewCaptionsIndex() {
  const router = useRouter();
  const { show, episode, page } = router.query;

  const showId = show as string ?? null;
  const episodeId = episode as string ?? null;
  const pageIndex = page as string ?? 1;

  return showId && episodeId ? (
    <ViewCaptions showId={showId} episodeId={episodeId} pageIndex={pageIndex} />
  ) : <></>;
}

export default ViewCaptionsIndex;
