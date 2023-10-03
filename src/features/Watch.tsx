import { Card, Grid, Link as NextUILink, Text } from "@nextui-org/react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-use-precision-timer";
import { Layout } from "@app/features/Layout";
import { ICueIndex } from "@module/types";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import clsx from "clsx";

interface IWatchProps {
  showId: number;
  episodeId: number;
  startTime: number;
}

const Watch = ({ showId, episodeId, startTime }: IWatchProps) => {
  const { data: showApiData } = useSWR(showId ? `/api/shows?id=${showId}` : null);
  const { data: episodeApiData } = useSWR(episodeId ? `/api/episodes?id=${episodeId}` : null);
  const { data: cuesApiData } = useSWR(
    showId && episodeId ? `/api/cues?showId=${showId}&episodeId=${episodeId}` : null
  );

  const show = showApiData?.data;
  const episode = episodeApiData?.data;

  const [currentCue, setCurrentCue] = useState<ICueIndex | null>(null);
  const [cues, setCues] = useState<Array<ICueIndex> | null>(null);
  const [videoElement, setVideoElement] = useState<YouTubePlayer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (cuesApiData) {
      setCurrentCue(cuesApiData.data[0]);
      setCues(cuesApiData.data);
    }
  }, [cuesApiData]);

  useEffect(() => {
    if (showApiData && episodeApiData && cuesApiData) {
      setLoading(false);
    }
  }, [showApiData, episodeApiData, cuesApiData]);

  const timer = useTimer({
    delay: 100,
    callback: () => {
      triggerCueChange();
    },
  });

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      accelerometer: 1,
      controls: 1,
      clipboardWrite: 1,
      encryptedMedia: 1,
      pictureInPicture: 1,
      gyroscope: 1,
    },
  };

  const getCurrentTime = () => {
    return Number(videoElement?.target?.getCurrentTime());
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // console.log("onPlayerReady", event);
    setVideoElement(event);
    event.target.pauseVideo();
    if (startTime >= 0) {
      const startTimeBuffer = 3;
      const seekTo = Math.max(startTime - startTimeBuffer, 0);
      event.target.seekTo(seekTo);
    }
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = (event) => {
    // console.log("onPlayerPlay", event);
    timer.start();
  };

  const onPlayerPause: YouTubeProps["onPause"] = (event) => {
    // console.log("onPlayerPause", event);
    timer.pause();
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    triggerCueChange();
    // console.log("onPlayerStateChange", { event, currentTime: getCurrentTime() });
  };

  const triggerCueChange = () => {
    if (!cues || !currentCue) {
      // console.log("triggerCueChange: no cues or currentCue");
      return;
    }
    const cueBeginTime = currentCue.start_time;
    const cueEndTime = currentCue.end_time;
    const currentTime = getCurrentTime();
    // console.log("triggerCueChange", { currentTime, cueBeginTime, cueEndTime });
    if (currentTime > cueEndTime || currentTime < cueBeginTime) {
      // Find cue in the array based on best matching time between start and endtime
      let cueIndex = cues.findIndex((cue) => {
        if (cue.start_time > currentTime) {
          // console.log("determined cue", {
          //   start_time: cue.start_time,
          //   end_time: cue.end_time,
          //   currentTime,
          // });
          return true;
        }
        return false;
      });
      // The actual one is the previous one
      cueIndex = cueIndex - 1;
      if (cueIndex > -1) {
        const nextCue = cues[cueIndex];
        setCurrentCue(nextCue);
        // console.log("Found next cue", { cueIndex, nextCue });
        return;
      }
      // console.log("No cue found", { cueIndex, currentTime, cueEndTime });
    }
  };

  return (
    <Layout>
      <Grid.Container justify="center" className="mb-5 flex flex-col items-center">
        <Grid
          sm={10}
          md={8}
          lg={5}
          className="w-[90%] flex flex-col items-center w-full justify-center"
        >
          <Card
            className="space-y-2 m-0 mb-0 py-6 pb-5 px-8 h-15 bg-transparent border-0 border-solid border-primary-border"
            css={{ h: "$auto" }}
            variant="flat"
          >
            <Text
              h1
              weight="extrabold"
              // css={{ color: "$purple700" }}
              className="mb-1 font-main text-xl md:text-3xl font-extrabold text-highlight text-center tracking-normal leading-normal whitespace-normal lg:truncate"
              title={episode?.title}
            >
              {loading && "Loading..."}
              {!loading && episode?.title}
            </Text>
            <Text
              className="space-x-4 flex flex-row justify-center font-main text-md md:text-xl text-secondary tracking-normal leading-tight text-center whitespace-normal"
              weight="normal"
            >
              <span>
                {show?.name}
              </span>
              <span>|</span>
              <span>Episode {episode?.episode_id}{" "}</span>
              <span>|</span>
              <Link href={`/captions?show=${showId}&episode=${episodeId}`} passHref>
                <NextUILink animated>
                  <Text
                    className="font-main text-secondary tracking-normal leading-normal whitespace-normal items-center flex hover:text-highlight hover:animate-scale-up active:animate-scale-down"
                    size={16}
                    weight="extrabold"
                  >
                    <DocumentTextIcon className="w-5 h-5 mr-1.5" />
                    Read captions
                  </Text>
                </NextUILink>
              </Link>
            </Text>
          </Card>
        </Grid>
      </Grid.Container>

      <Grid.Container justify="center">
        <Grid>
          <Card className="m-0 p-1 bg-transparent" variant="flat">
            <Card.Body className="overflow-hidden p-0 pb-0 rounded-xl ch:w-[380px] ch:h-[214px] md:ch:w-[700px] md:ch:h-[394px] xl:ch:w-[1075px] xl:ch:h-[605px]">
              {episode?.youtube_video_id && (
                <YouTube
                  videoId={episode?.youtube_video_id}
                  opts={opts}
                  onReady={onPlayerReady}
                  onPlay={onPlayerPlay}
                  onPause={onPlayerPause}
                  onStateChange={onPlayerStateChange}
                />
              )}
              {loading && <div></div>}
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Grid.Container className="mt-0 min-h-[250px]" justify="center">
        <Grid xs={10} sm={7} md={6} lg={4} className="">
          {/*<Card className="bg-transparent" variant="flat" css={{ h: "$auto"   }}>*/}
          <Card className="m-0 p-0 bg-transparent" css={{ h: "$auto" }} variant="flat">
            <Card.Body className="">
              <Text
                className={clsx(
                  "px-0 sm:py-2 sm:px-8 m-0 p-0",
                  "bg-transparent text-primary",
                  "rounded-2xl text-2xl md:text-[30px] tracking-tight !leading-tight text-left whitespace-normal"
                )}
                // size={30}
                weight="bold"
                // css={{ color: "$yellow600" }}
              >
                {timer.getElapsedRunningTime() === 0 ? "[ captions ]" : currentCue?.caption}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Watch;
