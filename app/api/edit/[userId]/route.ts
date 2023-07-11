import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import {
  createUser,
  deleteUserById,
  getUserByUserId,
  getUserByUsername,
  updateUserById,
} from '../../../../database/users';
import { User } from '../../../../migrations/1687334782-createUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type Error = {
  error: string;
};

type UserResponseBodyGet = { user: User } | Error;
export type UserResponseBodyPut = { user: User } | Error;

const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(0),
  genre: z.string().min(1),
  personalDescription: z.string().min(0),
  musicInstrument: z.string().min(0),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyGet>> {
  const userId = Number(params.userId);

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }
  // query the database to get all the animals
  const user = await getUserByUserId(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  if (!userId) {
    return NextResponse.json(
      {
        error: 'User id is not valid',
      },
      { status: 400 },
    );
  }

  console.log(body);

  // zod please verify the body matches my schema
  const result = userSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  // query the database to update the animal
  const user = await updateUserById(
    userId,
    result.data.firstName,
    result.data.lastName,
    result.data.genre,
    result.data.personalDescription,
    result.data.musicInstrument,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    user: user,
  });
}
