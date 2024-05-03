import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Store, useStore } from "@/zustand";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

const EditProfile = () => {
  const { user, loadCurrentUserData } = useStore() as Store;
  const navigate = useNavigate();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const formData = new FormData();
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          const buffer = reader.result;
          form.setValue("profilepicture", new Blob([buffer]));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    profilepicture: z.instanceof(Blob).optional(),
    bio: z.string().max(160, {
      message: "Bio must be at most 160 characters.",
    }),
    birthdate: z.string(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().optional(),
    website: z.string().url({
      message: "Please enter a valid URL.",
    }),
    gender: z.string().min(1, {
      message: "Please select a Gender.",
    }),
    job: z.string().optional(),
    fullname: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user!.username,
      bio: user!.bio,
      birthdate: user!.birthdate,
      email: user!.email,
      phone: user!.phone,
      website: user!.website,
      gender: user!.gender,
      job: user!.job,
      fullname: user!.fullname,
    },
  });

  const fileRef = useRef(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    formData.append("username", values.username ?? "");
    formData.append("bio", values.bio ?? "");
    formData.append("birthdate", values.birthdate ?? "");
    formData.append("email", values.email ?? "");
    formData.append("phone", values.phone ?? "");
    formData.append("website", values.website);
    formData.append("image", values.profilepicture ?? "");
    formData.append("gender", values.gender ?? "");
    formData.append("job", values.job ?? "");
    formData.append("fullname", values.fullname ?? "");

    await api.patch(`users/${user!._id}`, {
      body: formData,
      credentials: "include",
    });
    loadCurrentUserData();
    navigate("/profile");
  };

  return (
    <>
      <header className="m-10">
        <div className="flex items-center gap-5">
          <a href="http://localhost:5173/profile">
            <img src="../img/arrow.svg" />
          </a>
          <p className="text-3xl font-bold">Edit Profile</p>
        </div>
      </header>
      <main className="flex flex-col items-center gap-6 mt-10 font-bold">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-6 font-bold"
          >
            <FormField
              control={form.control}
              name="profilepicture"
              render={() => (
                <FormItem>
                  <Avatar className="w-40 h-40 border">
                    <AvatarImage
                      src={user!.profilePictureUrl}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback>{user!.username}</AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <div className="z-10 absolute bottom-[0.5rem] left-[72%] w-full">
                      <img
                        src="../img/profile-edit.svg"
                        onClick={handleClick}
                      />
                    </div>
                  </div>
                  <FormControl>
                    <Input
                      type="file"
                      ref={hiddenFileInput}
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Full name</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Username</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Job</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Bio</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Birthdate</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>E-Mail</FormDescription>

                  <FormControl>
                    <Input
                      {...field}
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Phone Number</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="min-w-[300px] bg-black-50 border-none dark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Gender</FormDescription>
                  <Select onValueChange={field.onChange}>
                    <FormControl className="min-w-[300px] bg-black-50 border-none dark:bg-black-500">
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user!.gender?.charAt(0).toUpperCase() +
                            user!.gender?.slice(1)
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-w-[300px] bg-black-50 border-none font-semibold">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Homepage</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      className="min-w-[300px] bg-black-50 border-nonedark:bg-black-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-primary-500 sm:bg-primary-100 rounded-3xl min-w-[300px] mb-6 "
            >
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default EditProfile;
