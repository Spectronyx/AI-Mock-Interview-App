import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const mockInterviewSchema = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockRes: text("jsonMockRes").notNull(),
  jsonJobPos: varchar("jsonJobPos").notNull(),
  jsonJobDesc: varchar("jsonJobDes").notNull(),
  JobExp: varchar("JobExp").notNull(),
  createdby: varchar("createdby").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const userAnswerSchema=pgTable("userAnswerSchema",{
  id:serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:text("question").notNull(),
  correctAns:text("correctAns").notNull(),
  userAns:text("userAnswer"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("userEmail"),
  createdAt:varchar("createdAt"),
});