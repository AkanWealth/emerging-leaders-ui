"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "./page";
import { LoaderCircle, PencilLine } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\d{10,15}$/, {
    message: "Phone number must be 10–15 digits.",
  }),
});

const PersonalInformationForm = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showToast } = useToastStore();
  const { user, loading } = useUserStore();
  console.log(user, "This is the user")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstname ? user.firstname : "",
      lastName: user?.lastname ? user.lastname : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitted:", values); // TODO: remember to remove after integration

      // NOTE: simulating the save action
      await new Promise((res) => setTimeout(res, 1500));

      showToast(
        "success",
        "Changes Saved successfully.",
        "All set! Your information has been updated."
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Error while saving profile:", err); // log for debugging

      showToast(
        "error",
        "Failed to Update Changes.",
        "We couldn't update your information. Please try again later."
      );
    }
  };

  const fieldStyle =
    "w-full py-2 text-sm rounded-md border border-transparent focus:outline-none font-semibold";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header + Edit/Save/Cancel buttons */}
        <div className="flex items-center justify-between">
          <SectionTitle>Personal Information</SectionTitle>

          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-red-500 hover:text-gray-700"
                  onClick={() => {
                    form.reset(); // reset to original values
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={
                    !form.formState.isDirty ||
                    !form.formState.isValid ||
                    form.formState.isSubmitting
                  }
                  className="bg-[#A2185A] hover:bg-[#A2185A]/90"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <LoaderCircle className="size-4 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-3 !px-3 !py-4 rounded-[16px] text-sm font-medium text-muted-foreground hover:bg-gray-100"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <PencilLine className="size-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  First Name
                </FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input {...field} placeholder="Enter your first name" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Last Name
                </FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input {...field} placeholder="Enter your last name" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Email</FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Phone Number
                </FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input {...field} placeholder="Enter your phone number" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default PersonalInformationForm;
