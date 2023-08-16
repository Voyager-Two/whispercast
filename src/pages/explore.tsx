import Explore from "@feature/Explore";
import { useRouter } from "next/router";

function ExploreIndex() {
  const router = useRouter();
  const { page } = router.query;

  const pageInput = page as string ?? 1;

  return <Explore pageInput={pageInput} />;
}

export default ExploreIndex;
