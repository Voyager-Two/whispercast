import { Card, Col, Grid, Link as NextUILink, Text } from "@nextui-org/react";
import { Layout } from "@app/features/Layout";
import { IEpisode } from "@app/modules/types";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import clsx from "clsx";

interface IComponentProps {
  pageInput: string;
}

// TODO: improve pagination
// TODO: test out whisper locally
// TODO: add ability to link youtube video

const Explore = ({ pageInput }: IComponentProps) => {
  // console.log({ shows, episodes });
  const router = useRouter();

  const { data: showApiData } = useSWR(`/api/shows?id=1`);
  const { data: episodeApiData, error } = useSWR(
    `https://whispercast.io/cf-api/explore?page=${pageInput}`
  );

  const show = showApiData?.data;
  const showId = show?.show_id ?? 1;
  const episodes = episodeApiData?.data?.episodes;

  return (
    <Layout>
      <Grid.Container className="space-y-8" justify="center" direction="column" alignItems="center">
        {router.pathname === "/" && (
          <Grid xs={10} md={8} lg={5} className="flex justify-center w-full">
            <Text
              className="rounded-2xl my-1 p-0 italic font-sexy text-secondary group-hover:text-highlight tracking-normal leading-relaxed text-center whitespace-normal"
              size={25}
              weight="extrabold"
            >
              Search captions of podcasts & videos.
            </Text>
          </Grid>
        )}
        <Grid xs={10} md={9} lg={6} className="flex justify-center w-full">
          <div className="flex flex-col w-[90%] items-center inline-flex mt-1 space-y-6">
            {/*{!episodes && (*/}
            {/*  <Text*/}
            {/*    className="rounded-2xl my-1 p-0 italic font-sexy text-highlight group-hover:text-highlight tracking-normal leading-relaxed text-center whitespace-normal"*/}
            {/*    size={22}*/}
            {/*    weight="extrabold"*/}
            {/*  >*/}
            {/*    Loading...*/}
            {/*  </Text>*/}
            {/*)}*/}
            {episodes &&
              episodes.map((episode: IEpisode) => (
                <Link
                  key={episode.episode_id}
                  href={`/watch?show=${showId}&episode=${episode.episode_id}`}
                >
                  <a className="flex justify-center w-full">
                    <Card
                      className="group m-0 p-0 px-0 bg-primary-card border-0 border-solid border-primary-border active:animate-scale-down"
                      css={{ h: "$auto" }}
                      variant="flat"
                      isPressable={false}
                      isHoverable
                      disableRipple
                    >
                      <Card.Body className="overflow-hidden whitespace-normal relative flex flex-row items-center w-full h-full">
                        <Col className="px-4 py-2 space-y-4">
                          <Text
                            className="rounded-2xl m-0 p-0 text-highlight group-hover:text-highlight tracking-normal leading-tight text-left whitespace-normal"
                            size={25}
                            weight="bold"
                          >
                            {episode?.title}
                          </Text>
                          <Text
                            className="rounded-2xl m-0 p-0 text-secondary group-hover:text-secondary tracking-normal leading-tight text-left whitespace-normal"
                            size={17}
                            weight="extrabold"
                          >
                            {show?.name} | Episode {episode?.episode_id}
                          </Text>
                        </Col>
                        {/*<Col className="absolute left-[100%] mt-2.5 group-hover:left-[85%] transition-all ease-in-out duration-300">*/}
                        {/*  <PlayCircleIcon className="text-white h-32 w-32 opacity-[5%]" />*/}
                        {/*</Col>*/}
                      </Card.Body>
                    </Card>
                  </a>
                </Link>
              ))}
          </div>
        </Grid>
        {episodes && (
          <div className="flex flex-inline space-x-8 items-center">
            <Link href={`/explore?page=${parseInt(pageInput) - 1}`} shallow={true} scroll={true}>
              <NextUILink
                animated={false}
                css={{ fontSize: "1.15rem", padding: "0", border: "none" }}
                className={`${
                  parseInt(pageInput) === 1 ? "hidden" : "block"
                } py-3 h-13 font-extrabold mt-4 mb-24 px-6 bg-primary-card text-secondary rounded-2xl cursor-pointer hover:animate-scale-up active:animate-scale-down transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:animate-none`}
              >
                Back
              </NextUILink>
            </Link>
            <Link href={`/explore?page=${parseInt(pageInput) + 1}`} shallow={true} scroll={true}>
              <NextUILink
                animated={false}
                css={{ fontSize: "1.35rem", padding: "0", border: "none" }}
                className={`${
                  episodes?.length < 15 ? "hidden" : "block"
                } mt-4 mb-24 py-3 font-extrabold px-6 bg-primary-card text-highlight rounded-2xl cursor-pointer hover:animate-scale-up active:animate-scale-down disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:animate-none`}
              >
                Next page
              </NextUILink>
            </Link>
          </div>
        )}
      </Grid.Container>
    </Layout>
  );
};

export default Explore;
