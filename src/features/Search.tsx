import { Card, Col, Grid, Input, Link as NextUILink, Text } from "@nextui-org/react";
import { Layout } from "@app/features/Layout";
import { ICueIndex, IShow } from "@app/modules/types";
import { IComponentProps } from "@app/pages/search";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { ArrowPathIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { SendButton } from "@feature/NavBar";
import useSWR from "swr";
import useFocus from "@app/hooks/useFocus";
import Image from "next/image";
import Link from "next/link";

/**
 * TODO: Make loading indicator more apparent
 * TODO: & doesn't work for search
 * TODO: add hints for search operators
 */

const Search = ({ queryParam }: IComponentProps) => {
  // console.log({ query, cues, episodes, shows });

  const [queryInput, setQueryInput] = useState(queryParam ?? "");
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [inputRef, setInputFocus] = useFocus();

  const {
    data: searchResult,
    error,
    isLoading: apiLoading,
  } = useSWR(currentQuery ? `/api/search?query=${currentQuery}` : null, null, {
    keepPreviousData: true,
  });

  const cues = searchResult?.data?.cues;
  const show = searchResult?.data?.shows ? searchResult?.data?.shows[0] : null;
  const showId = show?.show_id ?? 1;

  const router = useRouter();

  useEffect(() => {
    setQueryInput(queryParam ?? "");
    setCurrentQuery(queryParam ?? "");
  }, [queryParam]);

  useEffect(() => {
    // Focus on page load
    setInputFocus();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const query = e.target[0].value;
    if (query && query.length >= 3) {
      setCurrentQuery(query);
      // Update URL parameter
      router.push(`/search?query=${query}`, undefined, { shallow: true, scroll: false });
    }
  };

  return (
    <Layout>
      <Grid.Container className="mb-32" justify="center" direction="column" alignItems="center">
        <Grid
          xs={10}
          md={8}
          lg={6}
          className="flex flex-col items-center w-full mb-10 justify-center"
        >
          <Text
            className="mt-0 mb-7 p-0 font-main text-secondary tracking-normal leading-tight whitespace-normal italic"
            size={23}
            weight="extrabold"
          >
            Caption Search
          </Text>
          <form onSubmit={handleSearch}>
            <Input
              ref={inputRef}
              autoFocus={true}
              // disabled={apiLoading}
              animated={false}
              contentLeft={
                <MagnifyingGlassIcon className="text-primary opacity-90 h-6 w-6 ml-1 -mr-0.5" />
              }
              contentLeftStyling={false}
              size="xl"
              className="w-[350px] md:w-[500px] lg:w-[800px] ch:text-primary"
              css={{
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
                input: {
                  color: "var(--text-to-break-nextui)",
                  fontSize: "1.3rem",
                },
                // transition: "width 0.2s ease-in-out",
              }}
              contentRightStyling={false}
              contentRight={
                <SendButton
                  disabled={queryInput?.length < 3 || apiLoading}
                  className={clsx(
                    queryInput?.length >= 3
                      ? "bg-primary-btn cursor-pointer"
                      : "bg-primary-btn opacity-30 disabled:hover:opacity-30"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {apiLoading ? (
                    <ArrowPathIcon className="w-8 h-8 text-white text-opacity-90 animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className={clsx("w-6 h-6 text-white text-opacity-80")} />
                  )}
                </SendButton>
              }
              aria-placeholder="Search captions"
              value={queryInput}
              name="searchQuery"
              onChange={(e) => setQueryInput(e.target.value)}
            />
          </form>
          <div className={`${apiLoading ? "opacity-50" : ""}`}>
            {cues && cues.length !== 0 && (
              <Text
                className="block mt-6 mb-0 p-0 font-main text-secondary tracking-normal leading-tight whitespace-normal italic"
                size={17}
                weight="normal"
              >
                <strong>{cues.length}</strong> results
              </Text>
            )}
            {cues && cues.length === 0 && (
              <div className="flex flex-col items-center inline-flex mt-0">
                <Text
                  className="block mt-8 mb-4 p-0 font-main text-secondary tracking-normal leading-tight whitespace-normal italic"
                  size={20}
                  weight="bold"
                >
                  No results 💔
                </Text>
                <div className="mt-0 flex flex-row">
                  {/*<div className="mt-0 -mr-1">💔</div>*/}
                  <Image
                    src={"/images/sad-cat-thumbs-up.webp"}
                    width={32}
                    height={32}
                    className="opacity-90"
                  />
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid
          xs={10}
          md={8}
          lg={5}
          className={`flex flex-col -mt-1.5 justify-center w-full ${
            apiLoading ? "opacity-40" : ""
          }`}
        >
          {cues &&
            cues.length > 0 &&
            cues.map((cue: ICueIndex, idx: number) => (
              <Link
                key={idx}
                href={`/watch?show=${showId}&episode=${cue.episode_id}&time=${cue.start_time}`}
              >
                <a className="flex justify-center w-full hover:animate-scale-up-sm">
                  <Card
                    className="group my-2 p-0 px-0 bg-[#dcb698] rounded-none"
                    css={{ h: "$auto" }}
                    variant="flat"
                    isPressable
                    disableRipple
                    isHoverable={false}
                    // onClick={() => handleCardClick(show, cue)}
                  >
                    <Card.Body
                      className={clsx(
                        "py-3 overflow-hidden whitespace-normal relative flex flex-row items-center",
                        "border-0 border-l-[5px] border-[#d8693e] border-solid",
                      )}
                    >
                      <Col className="px-1 py-0">
                        <Text
                          className="m-0 p-0 font-main font-normal text-black tracking-normal leading-tight text-left whitespace-normal"
                          size={20}
                        >
                          {cue?.caption}
                        </Text>
                      </Col>
                    </Card.Body>
                  </Card>
                </a>
              </Link>
            ))}
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Search;
