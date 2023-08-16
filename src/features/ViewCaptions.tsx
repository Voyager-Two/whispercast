import { Card, Grid, Link as NextUILink, Text } from "@nextui-org/react";
import { Layout } from "@app/features/Layout";
import { ICueJsonItem } from "@app/modules/types";
import React, { useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";
import { getPagination } from "@app/utils/commonUtil";

interface IComponentProps {
  showId: string | null;
  episodeId: string | null;
  pageIndex: string;
}

const ViewCaptions = ({ showId, episodeId, pageIndex }: IComponentProps) => {
  const { data: showApiData } = useSWR(`/api/shows?id=${showId}`);
  const { data: episodeApiData } = useSWR(`/api/episodes?id=${episodeId}`);
  const { data: cuesApiData } = useSWR(`/api/cues?showId=${showId}&episodeId=${episodeId}`);

  const router = useRouter();
  // const [currentPage, setCurrentPage] = pageIndex
  const { to: pageToRange } = getPagination(Number(pageIndex), 100);

  const cuesData = cuesApiData?.data;
  const showData = showApiData?.data;
  const episodeData = episodeApiData?.data;

  const visibleCues = cuesData?.slice(0, pageToRange);

  return (
    <Layout>
      <Grid.Container className="" justify="center" direction="column" alignItems="center">
        <Grid
          sm={10}
          md={8}
          lg={5}
          className="w-[90%] flex flex-col items-center w-full mb-6 justify-center"
        >
          <Card
            className="m-0 mb-6 p-0 px-8 h-15 bg-primary-card border-0 border-solid border-primary-border"
            css={{ h: "$auto" }}
            variant="flat"
          >
            <Text
              h1
              weight="extrabold"
              // css={{ color: "$purple700" }}
              className="mt-6 mb-3 font-sexy font-extrabold text-xl md:text-2xl text-highlight text-center tracking-normal leading-normal whitespace-normal lg:truncate"
              title={episodeData?.title}
            >
              {episodeData?.title ?? "Loading..."}
            </Text>
            <Text
              className="mb-6 font-sexy text-md md:text-lg text-secondary tracking-normal text-center leading-tight whitespace-normal"
              weight="normal"
            >
              <span>
                {showData?.name} | Episode {episodeData?.episode_id}{" "}
              </span>
            </Text>
          </Card>
          <div className="my-2 mb-1">
            <Link
              href={`/watch?show=${showData?.show_id}&episode=${episodeData?.episode_id}`}
              passHref
            >
              <NextUILink animated>
                <Text
                  className="flex items-center text-secondary tracking-tight leading-tight whitespace-normal hover:text-highlight hover:animate-scale-up active:animate-scale-down"
                  size={16}
                  weight="extrabold"
                >
                  <PlayCircleIcon className="w-7 h-7 mr-1" />
                  Watch with captions
                </Text>
              </NextUILink>
            </Link>
          </div>
        </Grid>
        <Grid className="grid grid-cols-1 w-[90%] md:w-[580px]">
          <Card
            className="mt-0 my-2 p-0 px-0 bg-[#dcb698] border-[0px] border-[#ff602473] border-solid"
            css={{ h: "$auto" }}
            variant="flat"
            isPressable={false}
            disableRipple
            isHoverable={false}
          >
            <Card.Body
              className={clsx(
                "relative flex flex-col relative py-7 px-8 overflow-hidden whitespace-normal",
                "space-y-3"
              )}
            >
              {!visibleCues && (
                <Text
                  className={clsx("m-0 p-0 text-[#000000] text-center italic")}
                  size={18}
                  weight="bold"
                >
                  Loading...
                </Text>
              )}
              {visibleCues &&
                visibleCues.length > 0 &&
                visibleCues.map((cue: ICueJsonItem, idx: number) => (
                  <Link
                    key={idx}
                    href={`/watch?show=${showData?.show_id}&episode=${episodeData?.episode_id}&time=${cue.start_time}`}
                  >
                    <a className="relative group">
                      <Text
                        className={clsx(
                          "font-sexy font-bold text-[17px] sm:text-[1.29rem] text-left m-0 p-0 text-[#000000] tracking-normal leading-snug whitespace-normal",
                          "cursor-pointer active:opacity-60 active:animate-scale-down"
                        )}
                      >
                        {cue?.caption}
                      </Text>
                      <div
                        className={`invisible absolute group-hover:visible group-active:opacity-50 inset-y-0 -left-8 w-1.5 bg-[#ec9167]`}
                      />
                    </a>
                  </Link>
                ))}
            </Card.Body>
          </Card>
        </Grid>
        <div>
          <Link
            href={`/captions?show=${showId}&episode=${episodeId}&page=${Number(pageIndex) + 1}`}
            shallow={true}
            scroll={false}
          >
            <NextUILink
              animated={false}
              css={{ fontSize: "1.35rem", padding: "0", border: "none" }}
              className={`${
                cuesData?.length <= pageToRange ? "invisible" : "visible"
              } my-10 mb-24 py-3 font-extrabold px-6 bg-primary-card text-highlight rounded-2xl cursor-pointer hover:animate-scale-up active:animate-scale-down transition-all ease-in-out duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:animate-none"`}
            >
              Load more
            </NextUILink>
          </Link>
        </div>
      </Grid.Container>
    </Layout>
  );
};

export default ViewCaptions;
