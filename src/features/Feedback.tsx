import { Button, Card, Grid, Text } from "@nextui-org/react";
import { Layout } from "@app/features/Layout";
import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

const Feedback = () => {
  return (
    <Layout>
      <Grid.Container className="px-10" justify="center" direction="column" alignItems="center">
        <Grid
          sm={7}
          md={7}
          lg={6}
          xl={5}
          className="space-y-8 md:space-x-12 text-center sm:text-left justify-items-center items-center w-full mb-10 justify-center"
        >
          <Card className="group m-0 py-2 px-4 bg-primary-card" css={{ h: "$auto" }} variant="flat">
            <Card.Body className="overflow-hidden whitespace-normal relative flex flex-col md:flex-row space-y-4 md:space-x-8 items-center w-full h-full">
              <Text className="font-sexy !m-0 !p-0 text-lg text-primary tracking-normal" weight="normal">
                User feedback is very important to me. If you have any comments,
                questions, or suggestions, please let me know! You can email {" "}
                <a
                  className="text-highlight hover:animate-scale-up active:animate-scale-down"
                  href="mailto:wc@emre.earth"
                >
                  wc@emre.earth
                </a> or use the feedback form.
              </Text>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeljyW0VsuXJcVTa8u6HY6HCe8mUah5NFPDL8Tg0m7VGnqcVw/viewform"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:animate-scale-up-sm"
              >
                <Button
                  animated
                  size="sm"
                  className="py-8 px-8 bg-primary-card text-secondary font-extrabold text-xl hover:text-highlight"
                >
                  Feedback Form
                  <ArrowTopRightOnSquareIcon className="w-7 h-7 ml-2" />
                </Button>
              </a>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default Feedback;
