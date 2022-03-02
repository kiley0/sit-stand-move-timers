import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

interface IProps {
  timerName: string;
  durationMinutes: number;
  onCancel(): void;
  onNext(): void;
}

function Timer(props: IProps) {
  const { seconds, minutes, restart, isRunning, pause, resume } = useTimer({
    expiryTimestamp: getDurationDateSeconds(props.durationMinutes),
    onExpire: handleExpired,
  });

  useEffect(() => {
    if (props.durationMinutes) {
      restart(getDurationDateSeconds(props.durationMinutes));
    }
  }, [props.durationMinutes]);

  function handleExpired() {
    props.onNext();
  }

  function getDurationDateSeconds(durationMinutes: number = 1) {
    const time = new Date();
    const durationSeconds = durationMinutes * 60;
    time.setSeconds(time.getSeconds() + durationSeconds);
    return time;
  }

  return (
    <Box textAlign="center">
      <Heading>{props.timerName}</Heading>
      <Text fontSize="6xl" fontWeight="black">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Text>
      {isRunning && (
        <Stack direction="row" justifyContent="center">
          <Button variant="ghost" colorScheme="blue" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={pause}>
            Pause
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={props.onNext}>
            Next
          </Button>
        </Stack>
      )}
      {!isRunning && (
        <Stack direction="row" justifyContent="center">
          <Button variant="ghost" colorScheme="blue" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={resume}>
            Resume
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={props.onNext}>
            Next
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default Timer;
