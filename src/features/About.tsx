import { Card, Grid, Text } from "@nextui-org/react";
import { Layout } from "@app/features/Layout";
import React from "react";

const About = () => {
  return (
    <Layout>
      <Grid.Container className="px-10" justify="center" direction="column" alignItems="center">
        <Grid
          sm={7}
          md={7}
          lg={5}
          className="flex flex-col space-y-8 md:space-x-12 text-center sm:text-left justify-items-center items-center w-full mb-10 justify-center"
        >
          <Card className="group m-0 py-2 px-4 bg-primary-card" css={{ h: "$auto" }} variant="flat">
            <Card.Body className="overflow-hidden whitespace-normal relative flex flex-row items-center w-full h-full">
              <Text
                className="font-sexy !m-0 !p-0 text-primary tracking-normal leading-relaxed text-xl"
                weight="normal"
              >
                Podcasts and educational videos are a treasure trove of knowledge. However, much of
                this knowledge is essentially trapped within audio files. It is often unsearchable,
                undiscoverable, and unreadable.
                <br />
                <br />
                This tool aims to move the needle forward by generating and indexing captions of
                audio content. This is newly made possible thanks to{" "}
                <a
                  className="text-secondary hover:underline active:no-underline"
                  href="https://github.com/openai/whisper"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenAI&apos;s Whisper
                </a>{" "}
                technology; which allows for near-human level transcription of audio.
                <br />
                <br />
                But we can take the idea further, so you can also watch embedded videos,
                simply read captions like a book, and skip to exact moments in videos.
                <br />
                <br />
                <div className="text-lg">
                  I can be reached at {" "}
                  <a
                    className="text-secondary hover:underline active:no-underline"
                    href="mailto:wc@emre.earth"
                  >
                    wc@emre.earth
                  </a>{" "}
                  or on Twitter {" "}
                  <a
                    className="text-secondary hover:underline active:no-underline"
                    href="https://twitter.com/emre_earth"
                  >
                    @emre_earth
                  </a>
                  .
                </div>
              </Text>
            </Card.Body>
          </Card>
          <a
            href="https://www.producthunt.com/posts/whispercast?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-whispercast"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=365357&theme=light"
              alt="WhisperCast - Search&#0032;captions&#0032;of&#0032;podcasts&#0032;&#0038;&#0032;videos&#0046; | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default About;
