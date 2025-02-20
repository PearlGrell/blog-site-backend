-- CreateTable
CREATE TABLE "users" (
    "id" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "salt" TEXT
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
