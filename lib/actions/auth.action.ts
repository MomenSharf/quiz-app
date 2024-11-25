"use server";

import bcrypt from "bcrypt";
import { db } from "../db";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";



type Response = {
  success: boolean;
  message: string;
}

type LoginResponse = {
  id: string;
  email: string;
}


export async function registerUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("Registration failed, Please try again later");
    }

    return {
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    };
  } catch {
    throw new Error("Registration failed, Please try again later");
  }

  
}



