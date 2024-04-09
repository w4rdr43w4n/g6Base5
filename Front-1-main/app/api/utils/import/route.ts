import { db } from "@/app/lib/db";

async function handler(req: Request) {
  const { email, username, type, title } = await req.json();
  console.log(`EMAIL:${email}\nNAME:${username}\nTYPE:${type}`);
  let imports = [];
  const selection =
    title.length > 0
      ? { username: username, email: email, title: title }
      : { username: username, email: email };
  switch (type) {
    case "lr":
      imports = await db.literature.findMany({
        where: selection,
        select: {
          content: true,
          title: true,
          style: true,
        },
      });
      break;
    case "art":
      imports = await db.article.findMany({
        where: selection,
        select: {
          content: true,
          title: true,
          style: true,
        },
      });
      break;
    case "out":
      imports = await db.outline.findMany({
        where: selection,
        select: {
          content: true,
          title: true,
        },
      });
      break;
    case "reflst":
      imports = await db.reflist.findMany({
        where: {
          username: username,
          email: email,
        },
        select: {
          list: true,
          style: true,
        },
      });
      break;
    default:
      return Response.json({ error: "Invalid document type" }, { status: 400 });
  }
  console.log(`IMPORTS:${imports}`);
  return Response.json(
    { message: "Working!", imports: imports },
    { status: 200 }
  );
}

export { handler as GET, handler as POST };
