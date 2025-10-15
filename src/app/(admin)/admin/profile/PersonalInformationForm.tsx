// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { SectionTitle } from "./page";
// import { PencilLine } from "lucide-react";
// import { useEffect, useState } from "react";
// import clsx from "clsx";

// import { useToastStore } from "@/store/toastStore";
// import { useUserStore } from "@/store/userStore";
// import { BeatLoader } from "react-spinners";
// import adminService from "@/services/adminService";

// const formSchema = z.object({
//   firstName: z
//     .string()
//     .min(2, { message: "First name must be at least 2 characters." }),
//   lastName: z
//     .string()
//     .min(2, { message: "Last name must be at least 2 characters." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   phone: z.string().regex(/^\d{10,15}$/, {
//     message: "Phone number must be 10–15 digits.",
//   }),
// });

// type ApiResponseType = {
//   statusCode?: string;
//   error?: string;
// };
// const PersonalInformationForm = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const { showToast } = useToastStore();
//   const { user, loading, setUser } = useUserStore();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//     },
//     mode: "onChange",
//   });

//   // ✅ Update form when user data is ready
//   useEffect(() => {
//     if (user) {
//       form.reset({
//         firstName: user.firstname || "",
//         lastName: user.lastname || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user, form]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       if (!user) {
//         throw Error();
//         return;
//       }
//       console.log("Submitted:", values);
//       await new Promise((res) => setTimeout(res, 1500));
//       const response = (await adminService.editUser(user.id, {
//         email: values.email,
//         firstname: values.firstName,
//         lastname: values.lastName,
//         phone: values.phone,
//         Address: user.Address as string,
//         city: user.city as string,
//         country: user.country as string,
//         postalcode: user.postalcode as string,
//       })) as ApiResponseType;
//       if (response.error || response.statusCode) {
//         throw Error();
//       }
//       setUser({
//         id: user.id,
//         createdAt: user.createdAt,
//         email: values.email,
//         firstname: values.firstName,
//         lastname: values.lastName,
//         phone: values.phone,
//         Address: user.Address as string,
//         city: user.city as string,
//         country: user.country as string,
//         postalcode: user.postalcode as string,
//         isAdmin: user.isAdmin,
//       });
//       showToast(
//         "success",
//         "Changes Saved successfully.",
//         "All set! Your information has been updated."
//       );

//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error while saving profile:", err);
//       showToast(
//         "error",
//         "Failed to Update Changes.",
//         "We couldn't update your information. Please try again later."
//       );
//     }
//   };

//   const handleCancel = () => {
//     // 🔄 Reset to user's current data (not empty fields)
//     if (user) {
//       form.reset({
//         firstName: user.firstname || "",
//         lastName: user.lastname || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//     setIsEditing(false);
//   };

//   const fieldStyle =
//     "w-full py-2 text-sm rounded-md border border-transparent focus:outline-none font-semibold";

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <SectionTitle>Personal Information</SectionTitle>

//           <div>
//             {isEditing ? (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   type="button"
//                   className="text-red-500 hover:text-gray-700"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   type="submit"
//                   disabled={
//                     !form.formState.isDirty ||
//                     !form.formState.isValid ||
//                     form.formState.isSubmitting
//                   }
//                   className={`bg-[#A2185A] ${
//                     form.formState.isSubmitting
//                       ? "cursor-none"
//                       : "cursor-pointer"
//                   }  hover:bg-[#A2185A]/90`}
//                 >
//                   {form.formState.isSubmitting ? (
//                     <span className="flex items-center gap-2">
//                       <BeatLoader size={8} color="#fff" />
//                     </span>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-3 !px-3 !py-4 rounded-[16px] text-sm font-medium text-muted-foreground hover:bg-gray-100"
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//               >
//                 <PencilLine className="size-4" />
//                 Edit
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
//           {["firstName", "lastName", "email", "phone"].map((fieldName) => (
//             <FormField
//               key={fieldName}
//               control={form.control}
//               name={fieldName as keyof z.infer<typeof formSchema>}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-muted-foreground capitalize">
//                     {fieldName === "phone" ? "Phone Number" : fieldName}
//                   </FormLabel>
//                   <FormControl>
//                     {!isEditing ? (
//                       <p className={clsx("border-b text-gray-700", fieldStyle)}>
//                         {field.value}
//                       </p>
//                     ) : (
//                       <Input
//                         {...field}
//                         type={fieldName === "email" ? "email" : "text"}
//                         placeholder={`Enter your ${
//                           fieldName === "phone"
//                             ? "phone number"
//                             : fieldName.replace(/([A-Z])/g, " $1").toLowerCase()
//                         }`}
//                       />
//                     )}
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           ))}
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default PersonalInformationForm;

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
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";
import { BeatLoader } from "react-spinners";
import adminService from "@/services/adminService";
import { Skeleton } from "@/components/ui/skeleton";

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

type ApiResponseType = {
  statusCode?: string;
  error?: string;
};

const PersonalInformationForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToastStore();
  const { user, loading, setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  // ✅ Update form when user data is ready
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) {
        throw Error();
        return;
      }
      console.log("Submitted:", values);
      await new Promise((res) => setTimeout(res, 1500));
      const response = (await adminService.editUser(user.id, {
        email: values.email,
        firstname: values.firstName,
        lastname: values.lastName,
        phone: values.phone,
        Address: user.Address as string,
        city: user.city as string,
        country: user.country as string,
        postalcode: user.postalcode as string,
      })) as ApiResponseType;
      if (response.error || response.statusCode) {
        throw Error();
      }
      setUser({
        id: user.id,
        createdAt: user.createdAt,
        email: values.email,
        firstname: values.firstName,
        lastname: values.lastName,
        phone: values.phone,
        Address: user.Address as string,
        city: user.city as string,
        country: user.country as string,
        postalcode: user.postalcode as string,
        isAdmin: user.isAdmin,
      });
      showToast(
        "success",
        "Changes Saved successfully.",
        "All set! Your information has been updated."
      );

      setIsEditing(false);
    } catch (err) {
      console.error("Error while saving profile:", err);
      showToast(
        "error",
        "Failed to Update Changes.",
        "We couldn't update your information. Please try again later."
      );
    }
  };

  const handleCancel = () => {
    // 🔄 Reset to user's current data (not empty fields)
    if (user) {
      form.reset({
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    setIsEditing(false);
  };

  const fieldStyle =
    "w-full py-2 text-sm rounded-md border border-transparent focus:outline-none font-semibold";

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
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
                  onClick={handleCancel}
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
                  className={`bg-[#A2185A] ${
                    form.formState.isSubmitting
                      ? "cursor-none"
                      : "cursor-pointer"
                  }  hover:bg-[#A2185A]/90`}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <BeatLoader size={8} color="#fff" />
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
          {["firstName", "lastName", "email", "phone"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground capitalize">
                    {fieldName === "phone" ? "Phone Number" : fieldName}
                  </FormLabel>
                  <FormControl>
                    {!isEditing ? (
                      <p className={clsx("border-b text-gray-700", fieldStyle)}>
                        {field.value}
                      </p>
                    ) : (
                      <Input
                        {...field}
                        type={fieldName === "email" ? "email" : "text"}
                        placeholder={`Enter your ${
                          fieldName === "phone"
                            ? "phone number"
                            : fieldName.replace(/([A-Z])/g, " $1").toLowerCase()
                        }`}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </form>
    </Form>
  );
};

export default PersonalInformationForm;
