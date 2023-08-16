import Search from "@feature/Search";
import { useRouter } from "next/router";

export interface IComponentProps {
  queryParam: string;
}

function SearchIndex() {
  const router = useRouter();
  const { query } = router.query;

  const queryParam = query as string ?? "";

  return <Search queryParam={queryParam} />;
}

export default SearchIndex;
