import { Navbar, Text, Grid, Card } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { HandRaisedIcon, InformationCircleIcon } from "@heroicons/react/20/solid";

import { styled } from "@nextui-org/react";

export const SendButton = styled("button", {
  // reset button styles
  background: "transparent",
  border: "none",
  padding: 0,
  // styles
  width: "28px",
  margin: "0 10px",
  dflex: "center",
  borderRadius: "$rounded",
  transition: "opacity 0.25s ease 0s, transform 0.25s ease 0s",
  svg: {
    size: "100%",
    padding: "5px",
    transition: "transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms",
    boxShadow: "0 5px 20px -5px rgba(0, 0, 0, 0.1)",
  },
  "&:hover": {
    opacity: 0.8,
  },
  "&:hover:disabled": {
    opacity: 0.3,
  },
  "&:active": {
    transform: "scale(0.9)",
  },
  "&:active:disabled": {
    transform: "none",
  },
});

// TODO: optimize for mobile

export default function NavBar() {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="container mx-auto px-4 max-w-7xl">
        <Navbar
          className="m-0 mt-1 md:ch:px-9"
          css={{ background: "transparent" }}
          isBordered={false}
          variant="floating"
          disableShadow
          disableBlur
        >
          <Navbar.Content variant="highlight" enableCursorHighlight>
            <Link href="/">
              <Navbar.Link className="group flex items-center py-9 !px-5 ch:text-secondary ch:text-lg ch:sm:text-3xl ch:hover:text-highlight hover:opacity-100 hover:animate-scale-up active:opacity-50 active:animate-scale-down">
                <Text
                  h1
                  className="flex items-center !m-0 !p-0 italic font-sexy"
                  weight="extrabold"
                >
                  WhisperCast
                </Text>
                <Text className="flex items-center ml-2 opacity-100">☕</Text>
              </Navbar.Link>
            </Link>
          </Navbar.Content>
          <Navbar.Content
            variant="highlight"
            activeColor="warning"
            enableCursorHighlight
            className="group ch:font-bold ch:text-secondary text-sm md:text-xl"
          >
            <Link href="/search">
              <Navbar.Link
                className="py-9 lg:!px-6 ch:text-secondary group-hover:ch:text-highlight hover:opacity-100 hover:animate-scale-up hover:opacity-100 active:animate-scale-down"
                href="#"
                isActive={router.pathname === "/search"}
              >
                <MagnifyingGlassCircleIcon className="!h-14 !w-14 -ml-2.5 -mr-2 hidden sm:block" />
                <span>Search</span>
              </Navbar.Link>
            </Link>
          </Navbar.Content>
          <Navbar.Content
            variant="highlight"
            activeColor="warning"
            enableCursorHighlight
            className="ch:font-bold ch:text-secondary text-xs md:text-[0.9rem]"
          >
            <Link href="/feedback">
              <Navbar.Link
                isActive={router.pathname === "/feedback"}
                className="flex items-center py-9 lg:!px-4 ch:text-secondary ch:hover:text-highlight hover:opacity-100 hover:animate-scale-up hover:text-opacity-100 active:animate-scale-down"
              >
                <HandRaisedIcon className="!h-11 !w-11 -ml-2.5 -mr-2 hidden sm:block" />
                <span>Feedback</span>
              </Navbar.Link>
            </Link>
            <Link href="/about">
              <Navbar.Link
                className="flex items-center py-9 lg:!px-4 ch:text-secondary ch:hover:text-highlight hover:opacity-100 hover:animate-scale-up hover:text-opacity-100 active:animate-scale-down"
                href="#"
                isActive={router.pathname === "/about"}
              >
                <InformationCircleIcon className="!h-11 !w-11 -ml-2.5 -mr-2 hidden sm:block" />
                <span>About</span>
              </Navbar.Link>
            </Link>
          </Navbar.Content>
        </Navbar>
        <Grid.Container justify="center" className="mt-4 mb-4">
          <Grid className="w-full mx-[43%]">
            <Card className="m-0 p-0 h-15 bg-transparent" css={{ h: "$auto" }} variant="flat">
              <hr className="h-[2px] bg-[#5a5656] bg-opacity-20" />
            </Card>
          </Grid>
        </Grid.Container>
      </div>
    </React.Fragment>
  );
}
