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
// import adminService from "@/services/adminService";
// import { BeatLoader } from "react-spinners";

// const formSchema = z.object({
//   country: z
//     .string()
//     .min(2, { message: "Country name must be at least 2 characters." }),
//   town_city: z
//     .string()
//     .min(2, { message: "Town/City must be at least 2 characters." }),
//   postalCode: z
//     .string()
//     .min(1, { message: "Postal code is required." })
//     .regex(/^\d+$/, { message: "Postal code must contain only digits." }),
// });

// type ApiResponseType = {
//   statusCode?: string;
//   error?: string;
// };

// const AddressInfoForm = () => {
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const { showToast } = useToastStore();
//   const { user, loading, setUser } = useUserStore();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       country: user?.country ? user.country : "",
//       town_city: user?.city ? user.city : "",
//       postalCode: user?.postalcode ? String(user.postalcode) : "",
//     },
//   });

//   useEffect(() => {
//     if (user) {
//       form.reset({
//         country: user.country || "",
//         postalCode: user.postalcode ? String(user.postalcode) : "",
//         town_city: user.city || "",
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
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         phone: user.phone as string,
//         Address: user.Address as string,
//         city: values.town_city,
//         country: values.country,
//         postalcode: Number(values.postalCode),
//       })) as ApiResponseType;
//       if (response.error || response.statusCode) {
//         throw Error();
//       }
//       setUser({
//         id: user.id,
//         createdAt: user.createdAt,
//         email: user.email,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         phone: user.phone,
//         Address: user.Address as string,
//         city: values.town_city,
//         country: values.country,
//         postalcode: values.postalCode,
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

//   const fieldStyle =
//     "w-full py-2 text-sm rounded-md border border-transparent focus:outline-none font-semibold";

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex items-center justify-between">
//           <SectionTitle>Address Information</SectionTitle>

//           <div>
//             {isEditing ? (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   type="button"
//                   className="text-red-500 hover:text-gray-700"
//                   onClick={() => {
//                     form.reset(); // reset to original values
//                     setIsEditing(false);
//                   }}
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

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
//           {/* Country */}
//           <FormField
//             control={form.control}
//             name="country"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-muted-foreground">Country</FormLabel>
//                 <FormControl>
//                   {!isEditing ? (
//                     <p className={clsx("border-b text-gray-700", fieldStyle)}>
//                       {field.value}
//                     </p>
//                   ) : (
//                     <Input {...field} placeholder="Enter your country" />
//                   )}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Town / City */}
//           <FormField
//             control={form.control}
//             name="town_city"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-muted-foreground">
//                   Town / City
//                 </FormLabel>
//                 <FormControl>
//                   {!isEditing ? (
//                     <p className={clsx("border-b text-gray-700", fieldStyle)}>
//                       {field.value}
//                     </p>
//                   ) : (
//                     <Input {...field} placeholder="Enter your town/city" />
//                   )}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Postal Code */}
//           <FormField
//             control={form.control}
//             name="postalCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-muted-foreground">
//                   Postal Code
//                 </FormLabel>
//                 <FormControl>
//                   {!isEditing ? (
//                     <p className={clsx("border-b text-gray-700", fieldStyle)}>
//                       {field.value}
//                     </p>
//                   ) : (
//                     <Input
//                       {...field}
//                       type="text"
//                       inputMode="numeric"
//                       placeholder="Enter your postal code"
//                     />
//                   )}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default AddressInfoForm;
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
import adminService from "@/services/adminService";
import { BeatLoader } from "react-spinners";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  country: z
    .string()
    .min(2, { message: "Country name must be at least 2 characters." }),
  town_city: z
    .string()
    .min(2, { message: "Town/City must be at least 2 characters." }),
  postalCode: z
    .string()
    .min(1, { message: "Postal code is required." })
    .regex(/^\d+$/, { message: "Postal code must contain only digits." }),
});

type ApiResponseType = {
  statusCode?: string;
  error?: string;
};

const AddressInfoForm = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showToast } = useToastStore();
  const { user, loading, setUser } = useUserStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: user?.country ? user.country : "",
      town_city: user?.city ? user.city : "",
      postalCode: user?.postalcode ? String(user.postalcode) : "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        country: user.country || "",
        postalCode: user.postalcode ? String(user.postalcode) : "",
        town_city: user.city || "",
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
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone as string,
        Address: user.Address as string,
        city: values.town_city,
        country: values.country,
        postalcode: Number(values.postalCode),
      })) as ApiResponseType;
      if (response.error || response.statusCode) {
        throw Error();
      }
      setUser({
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        Address: user.Address as string,
        city: values.town_city,
        country: values.country,
        postalcode: values.postalCode,
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

  const fieldStyle =
    "w-full py-2 text-sm rounded-md border border-transparent focus:outline-none font-semibold";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
          {/* Country Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Town / City Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Postal Code Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionTitle>Address Information</SectionTitle>

          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-red-500 hover:text-gray-700"
                  onClick={() => {
                    form.reset();
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-lg">
          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">Country</FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input {...field} placeholder="Enter your country" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Town / City */}
          <FormField
            control={form.control}
            name="town_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Town / City
                </FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input {...field} placeholder="Enter your town/city" />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postal Code */}
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Postal Code
                </FormLabel>
                <FormControl>
                  {!isEditing ? (
                    <p className={clsx("border-b text-gray-700", fieldStyle)}>
                      {field.value}
                    </p>
                  ) : (
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter your postal code"
                    />
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

export default AddressInfoForm;