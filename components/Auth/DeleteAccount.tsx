"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { useState } from "react";
import { deleteAcount as deleteAcountServer } from "@/lib/actions/auth/delete-account";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Icons } from "../icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function DeleteAccount({ token }: { token: string }) {
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState(false);
  const [isDeleteingAccount, setIsDeleteingAccount] = useState(false);
  const router = useRouter();
  const deleteAccount = async () => {
    try {
      setIsDeleteingAccount(true);
      const { success, message } = await deleteAcountServer({ token });
      if (!success) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
      if (message) {
        toast({ description: message });
        setDeleteAccountSuccess(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Something went wrong! try again later",
        variant: "destructive",
      });
    } finally {
      setIsDeleteingAccount(false);
    }
  };
  return (
    <>
      {!deleteAccountSuccess ? (
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Are you sure you want to delete account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              variant="destructive"
              className="gap-1"
              disabled={isDeleteingAccount}
              onClick={deleteAccount}
            >
              {isDeleteingAccount ? (
                <Icons.Loader className="w-5 h-5 animate-spin stroke-white" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </Button>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
        >
          {" "}
          <Card>
            <CardHeader>
              <CardTitle>Account Deleted</CardTitle>
              <CardDescription>
                Your account deleted successfully
              </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center">
              <Button
                className="gap-1"
                disabled={isDeleteingAccount}
                onClick={() => router.push("/")}
              >
                Go back home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
