import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.usage.deleteMany();
  await prisma.users.deleteMany();
  await prisma.plans.deleteMany();

  const freePlan = await prisma.plans.create({
    data: {
      planname: "Free",
      maxconversionsperday: 5,
      maxfilesize: 1, // MB
    },
  });

  const standardPlan = await prisma.plans.create({
    data: {
      planname: "Standard",
      maxconversionsperday: 50,
      maxfilesize: 5,
    },
  });

  const premiumPlan = await prisma.plans.create({
    data: {
      planname: "Premium",
      maxconversionsperday: 500,
      maxfilesize: 10,
    },
  });

  const [user1, user2] = await Promise.all([
    prisma.users.create({
      data: {
        name: "test1",
        email: "test1@example.com",
        password: "password1",
        planid: freePlan.planid,
      },
    }),
    prisma.users.create({
      data: {
        name: "test2",
        email: "test2@example.com",
        password: "password2",
        planid: standardPlan.planid,
      },
    }),
  ]);

  await prisma.usage.createMany({
    data: [
      {
        userid: user1.userid,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // acum 2 zile
        conversiontype: "PNG_TO_WEBP",
        status: "success",
        filesize: 19571, // bytes
      },
      {
        userid: user1.userid,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // acum 1 zi
        conversiontype: "JPEG_TO_PNG",
        status: "failed",
        filesize: 584182,
      },
      {
        userid: user1.userid,
        date: new Date(), // acum
        conversiontype: "GIF_TO_WEBP",
        status: "success",
        filesize: 125000,
      },
      {
        userid: user2.userid,
        date: new Date(Date.now() - 3 * 60 * 60 * 1000), // acum 3 ore
        conversiontype: "JPEG_TO_PNG",
        status: "success",
        filesize: 22340,
      },
      {
        userid: user2.userid,
        date: new Date(Date.now() - 1 * 60 * 60 * 1000), // acum 1 oră
        conversiontype: "PNG_TO_AVIF",
        status: "success",
        filesize: 45000,
      },
    ],
  });

  console.log("Seed complet! Datele au fost inserate cu succes.");
}

main()
  .catch((e) => {
    console.error("Eroare la seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
