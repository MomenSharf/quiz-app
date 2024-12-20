"use client";
import { SettingsUser } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ProfileShema, ProfileShemaType } from "@/lib/validations/userShemas";
import { toast } from "../ui/use-toast";
import { Icons } from "../icons";
import { UpdateUserProfile } from "@/lib/actions/user";

export default function ProfileCard({ user }: { user: SettingsUser }) {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const form = useForm<ProfileShemaType>({
    resolver: zodResolver(ProfileShema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      imageUrl: user.imageUrl || "",
    },
  });

  const onSubmit = async (user: ProfileShemaType) => {
    try {
      setIsUpdatingProfile(true);
      const { success, message } = await UpdateUserProfile(user);
      if (!success) {
        return toast({ variant: "destructive", description: message });
      } else {
        toast({ description: "Profile updated successfully" });
      }
    } catch (error) {
      return toast({
        variant: "destructive",
        description: "Error updating profile",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="bg-blue-extra-dark text-white gap-3 py-1 px-3">
        Profile
      </div>
      <div className="p-3 flex gap-3">
        <div>
          {user.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="user avatar"
              width={96}
              height={96}
            />
          ) : (
            <div className="w-24 h-24 flex justify-center items-center bg-rose-500 text-white text-4xl rounded-full">
              {user.name && user.name[0].toUpperCase()}
            </div>
          )}
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1 flex w-full flex-col flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name..."
                      className={cn("transition-all main-background", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("name").error,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1 flex w-full flex-col flex-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username..."
                      className={cn("transition-all main-background", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("name").error,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                </FormItem>
              )}
            />
            <Button className="self-end gap-1" disabled={isUpdatingProfile}>
              {isUpdatingProfile && (
                <Icons.Loader className="w-5 h-5 animate-spin stroke-white" />
              )}
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
