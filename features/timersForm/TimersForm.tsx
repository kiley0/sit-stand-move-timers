import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export interface ITimersFormData {
  sitDuration: string;
  standDuration: string;
  moveDuration: string;
}

function TimersForm(props: { onSubmit(data: ITimersFormData): void }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ITimersFormData>({
    defaultValues: {
      sitDuration: "20",
      standDuration: "8",
      moveDuration: "2",
    },
  });

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  return (
    <Stack as="form" onSubmit={onSubmit}>
      <Heading>Sit Stand Move Timers</Heading>
      <Text fontSize="sm">
        Based on the recommendations of researchers at Cornell University
        Ergonomics, the optimal regimen for an 8-hour workday is to sit for 20
        minutes, stand for 8 minutes, and move for 2 minutes. Read the{" "}
        <ChakraLink
          href="https://ergo.human.cornell.edu/CUESitStand.html"
          target="_blank"
          textDecoration="underline"
        >
          recommendations and research
        </ChakraLink>
        .
      </Text>
      <Divider />
      <Text fontWeight="semibold">
        Enter a duration for each timer in minutes
      </Text>
      <Stack direction="row">
        <FormControl>
          <FormLabel htmlFor="sitDuration">Sit</FormLabel>
          <Input id="sitDuration" type="text" {...register("sitDuration")} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="standDuration">Stand</FormLabel>
          <Input
            id="standDuration"
            type="text"
            {...register("standDuration")}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="moveDuration">Move</FormLabel>
          <Input id="moveDuration" type="text" {...register("moveDuration")} />
        </FormControl>
      </Stack>
      <Button type="submit" colorScheme="green">
        Start
      </Button>
    </Stack>
  );
}

export default TimersForm;
