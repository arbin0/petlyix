import { Button, Group, TextInput, Text } from "@mantine/core";

import { useForm } from "@mantine/form";

import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { petsApi } from "../../api/pets"; // Import new API
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useParams } from "react-router-dom";
interface AddVetProps {
  closeModal: () => void;
}

export const AddVetForm = ({ closeModal }: AddVetProps) => {
  const queryClient = useQueryClient();
  const { petId }= useParams();
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      phone: "",
      email: "",
      main_doctor: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    validate: {
      name: (value) => (value.length < 2 ? "Name too short" : null),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          // Create FormData for file upload (same logic as before)
          const payload = {
                name: values.name,
                phone: values.phone,
                email: values.email,
                main_doctor: values.main_doctor,
                address_line1: values.address_line1,
                address_line2: values.address_line2,
                city: values.city,
                state: values.state,
                postal_code: values.postal_code,
                country: values.country,
                pets: [petId!], // wrap in array for many=True
              };

          const response = await petsApi.createVets(payload);
          console.log("Vet created:", response);

          // Refetch pets list after success (same as before)
          queryClient.invalidateQueries({ queryKey: ["vets"] });
          closeModal();

          notifications.show({
            title: "Vet is Created!",
            message: "You have created a new Vet.",
            color: "teal",
            icon: checkIcon,
          });

          form.reset();
        } catch (error) {
          console.error("Error submitting form:", error);

          notifications.show({
            title: "Bummer!",
            message: "Something went wrong, please try again later.",
            color: "red",
            icon: xIcon,
          });
        }
      })}
    >
      <TextInput
        withAsterisk
        label="Vet Clinic Name"
        placeholder="Clinic Name..."
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Group>
        <Text size="sm" fw={500} mb={5}>
          Phone Number
        </Text>
        <Text size="sm" c="red" fw={500} mb={5}>
          *
        </Text>
      </Group>
      
      <PhoneInput
        withAsterisk
        placeholder="Enter phone number"
        countryCallingCodeEditable={false}
        label="Phone"
        defaultCountry="CA"
        value={form.values.phone}
        onChange={(value) => form.setFieldValue("phone", value || "")}
      />
      {form.errors.phone && (
        <Text c="red" size="xs" mt={3}>
          {form.errors.phone}
        </Text>
      )}
      <TextInput
        withAsterisk
        label="Clinic's Email"
        placeholder="Vet Clinic Email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Main Doctor"
        placeholder="Main Doctor's Name"
        key={form.key("main_doctor")}
        {...form.getInputProps("main_doctor")}
      /> 
      <Group wrap ="nowrap">
      <TextInput
        withAsterisk
        label="Address Line 1"
        placeholder="Street address, building #"
        key={form.key("address_line1")}
        {...form.getInputProps("address_line1")}
      />
      <TextInput
        label="Address Line 2 (Optional)"
        placeholder="apartment, suite, unit"
        key={form.key("address_line2")}
        {...form.getInputProps("address_line2")}
      />
      
      <TextInput
        withAsterisk
        label="City"
        placeholder="City name..."
        key={form.key("city")}
        {...form.getInputProps("city")}
      />
      </Group>
      <Group wrap ="nowrap">
      <TextInput
        withAsterisk
        label="State/Province"
        placeholder="State/Province Name..."
        key={form.key("state")}
        {...form.getInputProps("state")}
      />
      <TextInput
        withAsterisk
        label="Postal Code"
        placeholder="Postal Code..."
        key={form.key("postal_code")}
        {...form.getInputProps("postal_code")}
      />
      <TextInput
        withAsterisk
        label="Country"
        placeholder="Country Name..."
        key={form.key("country")}
        {...form.getInputProps("country")}
      />
      </Group>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
