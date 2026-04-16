/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cedula` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "address" TEXT,
ADD COLUMN     "slogan" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cedula" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_cedula_key" ON "user"("cedula");
