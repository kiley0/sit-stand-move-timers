import { Container, Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Timer from "../features/timer/Timer";
import TimersForm, { ITimersFormData } from "../features/timersForm/TimersForm";
import useSound from "use-sound";

const timerDisplayName = {
  sit: "Sit",
  stand: "Stand",
  move: "Move",
};

const Home: NextPage = () => {
  const [currentTimer, setCurrentTimer] = useState<
    "sit" | "stand" | "move" | null
  >(null);
  const [play] = useSound("/sounds/ding1.mp3");

  const [currentDurationMinutes, setCurrentDurationMinutes] = useState<
    number | null
  >(null);
  const [timerDurations, setTimerDurations] = useState({
    sit: 1,
    stand: 1,
    move: 1,
  });
  function handleSubmitTimersForm(data: ITimersFormData) {
    setTimerDurations({
      sit: Number(data.sitDuration),
      stand: Number(data.standDuration),
      move: Number(data.moveDuration),
    });
    setCurrentTimer("sit");
    setCurrentDurationMinutes(Number(data.sitDuration));
  }

  function handleCancel() {
    setCurrentTimer(null);
    setCurrentDurationMinutes(null);
  }

  function handleNext() {
    switch (currentTimer) {
      case "sit":
        setCurrentTimer("stand");
        setCurrentDurationMinutes(timerDurations["stand"]);
        play();
        break;
      case "stand":
        setCurrentTimer("move");
        setCurrentDurationMinutes(timerDurations["move"]);
        play();
        break;
      case "move":
        setCurrentTimer("sit");
        setCurrentDurationMinutes(timerDurations["sit"]);
        play();
        break;

      default:
        setCurrentTimer(null);
        setCurrentDurationMinutes(null);
        break;
    }
  }

  return (
    <Container>
      <Head>
        <title>Sit Stand Move Timers</title>
        <meta name="description" content="Sit, Stand, Move Timers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p="8">
        {!currentTimer && <TimersForm onSubmit={handleSubmitTimersForm} />}
        {currentTimer === "sit" && currentDurationMinutes && (
          <Timer
            timerName={timerDisplayName[currentTimer]}
            durationMinutes={currentDurationMinutes}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        )}
        {currentTimer === "stand" && currentDurationMinutes && (
          <Timer
            timerName={timerDisplayName[currentTimer]}
            durationMinutes={currentDurationMinutes}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        )}
        {currentTimer === "move" && currentDurationMinutes && (
          <Timer
            timerName={timerDisplayName[currentTimer]}
            durationMinutes={currentDurationMinutes}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        )}
      </Box>
    </Container>
  );
};

export default Home;
