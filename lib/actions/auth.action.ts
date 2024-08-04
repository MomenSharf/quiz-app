'use server'

import { db } from "../db";
import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import { sendResetPasswordEmail } from "../email";


export async function registerUser({ email, password, name }: { email: string; password: string; name: string }) {
  // Check if user already exists
  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create the new user
  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    throw new Error('Registration failed');
  }

  return {
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  };
}

export async function generateResetToken(email: string) {
  // Find the user by email
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a token
  const token = randomBytes(32).toString('hex');
  const expiresAt = addMinutes(new Date(), 15); // Token valid for 15 minutes

  // Save the token to the database
  await db.resetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  // Send an email with the reset link
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  await sendResetPasswordEmail(email, resetLink);
}
