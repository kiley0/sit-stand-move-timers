import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Divider,
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
      <Heading textAlign="center">Sit Stand Move Timers</Heading>
      <Divider />
      <Text textAlign="center">Enter the duration in minutes</Text>
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
