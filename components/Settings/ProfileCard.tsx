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
import ImageManagerTabs from "../ImageManeger/ImageManagerTabs";
import ImageEditor from "../ImageManeger/ImageEditor";
import { ClientUploadedFileData } from "uploadthing/types";
import { VerifyEmailToResetPassword as VerifyEmailToResetPasswordServer } from "@/lib/actions/auth/reset-password";
import { VerifyEmailDeleteAccount as VerifyEmailDeleteAccountServer } from "@/lib/actions/auth/delete-account";
import { Check } from "lucide-react";
import { UserAvatarImage } from "../User/UserAvatar";

export default function ProfileCard({ user }: { user: SettingsUser }) {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isImageMangerOpen, setImageMangerOpen] = useState(false);
  const [isImageEditorOpen, setImageEditorOpen] = useState(false);
  const [files, setFiles] = useState<File[] | string |null>(null);
  const [isSendResetPasswordSuccess, setIsSendResetPasswordSuccess] =
    useState(false);
  const [isSendingResetEmail, setisSendingResetEmail] = useState(false);
  const [isSendDeleteAccountSuccess, setIsSendDeleteAccountSuccess] =
    useState(false);
  const [isSendingDeleteAccount, setisSendingDeleteAccount] = useState(false);

  const form = useForm<ProfileShemaType>({
    resolver: zodResolver(ProfileShema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
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

  const onSelectImage = (acceptedFiles: File[] | string) => {
    setFiles(acceptedFiles);
    setImageMangerOpen(false);
    setImageEditorOpen(true);
  };
  const afterUpload = async (uploadedImage: ClientUploadedFileData<null>[]) => {
    try {
      const { success, message } = await UpdateUserProfile(
        { imageUrl: uploadedImage[0].url , },
        "/settings"
      );
      if (!success) {
        return toast({ variant: "destructive", description: message });
      } else {
        toast({ description: "Image profile updated successfully" });
      }
    } catch (error) {
      return toast({
        variant: "destructive",
        description: "Error updating image profile",
      });
    } finally {
      setImageEditorOpen(false);
    }
  };

  const VerifyEmailToResetPassword = async () => {
    try {
      setisSendingResetEmail(true);
      const res = await VerifyEmailDeleteAccountServer({ email: user.email });

      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res?.success) {
        toast({ description: res.success });
        setIsSendResetPasswordSuccess(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    } finally {
      setisSendingResetEmail(false);
    }
  };
  const VerifyEmailToDeleteAccount = async () => {
    try {
      setisSendingDeleteAccount(true);
      const res = await VerifyEmailDeleteAccountServer({ email: user.email });

      if (res?.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
      }
      if (res?.success) {
        toast({ description: res.success });
        setIsSendDeleteAccountSuccess(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.massege,
        variant: "destructive",
      });
    } finally {
      setisSendingDeleteAccount(false);
    }
  };
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <div className="bg-blue-extra-dark text-white gap-3 py-2 px-3">
        Profile
      </div>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col justify-center items-center gap-2">
              <UserAvatarImage user={user} className="w-24 h-24 text-2xl" />
              <Button
                size="sm"
                variant="secondary"
                className="text-xs gap-1 rounded-full"
                onClick={() => {
                  setImageMangerOpen(true);
                }}
              >
                <Icons.picture className="w-4 h-4 fill-black font-semibold" />
                Upload
              </Button>
            </div>
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
        <div className="flex flex-col gap-1">
          <div className="text-xs">
            <Button
              className="self-end gap-1 p-0 h-auto"
              onClick={VerifyEmailToResetPassword}
              disabled={isSendingResetEmail}
              variant="link"
            >
              {isSendingResetEmail && (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-primary" />
              )}
              Send a password reset link to my email
            </Button>
            {isSendResetPasswordSuccess && (
              <p className="flex gap-1 items-center">
                Password reset link sent to your email{" "}
                <Check className="w-3 h-3 text-black" />
              </p>
            )}
          </div>
          <div className="text-xs">
            <Button
              className="self-end gap-1 h-auto p-0 text-destructive"
              onClick={VerifyEmailToDeleteAccount}
              disabled={isSendingDeleteAccount}
              variant="link"
            >
              {isSendingDeleteAccount && (
                <Icons.Loader className="w-4 h-4 animate-spin stroke-destructive" />
              )}
              Send a delete account link to my email
            </Button>
            {isSendDeleteAccountSuccess && (
              <p className="flex gap-1 items-center">
                Delete account link sent to your email{" "}
                <Check className="w-3 h-3 text-black" />
              </p>
            )}
          </div>
        </div>
      </div>
      <ImageManagerTabs
      tabs={['upload', 'stockPhotos']}
        open={isImageMangerOpen}
        onOpenChange={setImageMangerOpen}
        onSelectImage={onSelectImage}
      />
      <ImageEditor
        open={isImageEditorOpen}
        onOpenChange={setImageEditorOpen}
        afterUpload={afterUpload}
        files={files}
        aspectRatio={1}
      />
    </div>
  );
}
