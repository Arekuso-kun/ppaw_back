-- CreateTable
CREATE TABLE "plans" (
    "planid" SERIAL NOT NULL,
    "planname" VARCHAR(100) NOT NULL,
    "maxconversionsperday" INTEGER NOT NULL,
    "maxfilesize" INTEGER NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("planid")
);

-- CreateTable
CREATE TABLE "usage" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversiontype" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20),
    "filesize" INTEGER NOT NULL,

    CONSTRAINT "usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "planid" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "usage" ADD CONSTRAINT "usage_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_planid_fkey" FOREIGN KEY ("planid") REFERENCES "plans"("planid") ON DELETE NO ACTION ON UPDATE NO ACTION;
