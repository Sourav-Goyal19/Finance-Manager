import { db } from "@/db/drizzle";
import getSession from "./getSessions";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email));

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
