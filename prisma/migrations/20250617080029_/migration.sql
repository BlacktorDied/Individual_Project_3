-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Facility" (
    "facility_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "location" TEXT,
    "description" TEXT,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SCP" (
    "scp_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "objectClass" TEXT,
    "containment" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "facility_id" INTEGER NOT NULL,
    CONSTRAINT "SCP_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facility" ("facility_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "emp_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dob" DATETIME,
    "sex" TEXT,
    "position" TEXT NOT NULL,
    "description" TEXT,
    "facility_id" INTEGER NOT NULL,
    CONSTRAINT "Employee_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facility" ("facility_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
