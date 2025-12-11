/*
  Warnings:

  - The primary key for the `usage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usageid` on the `usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usage" DROP CONSTRAINT "usage_pkey",
DROP COLUMN "usageid",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "usage_pkey" PRIMARY KEY ("id");
