import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const DonarTable = pgTable("Donar", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("fullName", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
})


export const NgoTable = pgTable("Ngo", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgName: varchar("orgName", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  location: varchar("location", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  registrationNumber: varchar("registrationNumber", { length: 255 }).notNull().unique(),
  bankName: varchar("bankName", { length: 255 }).notNull(),
  accountNumber: varchar("accountNumber", { length: 255 }).notNull(),
  iban: varchar("iban", { length: 255 }).notNull(),
});


export const DonationTable = pgTable("Donation", {
    id: uuid("id").primaryKey().defaultRandom(),
    donarId: uuid("donarId").references(() => DonarTable.id).notNull(),
    ngoId: uuid("ngoId").references(() => NgoTable.id),
    category: varchar("category", { length: 255 }).notNull(),
    amount: integer("amount").notNull(),
    createdAt: timestamp("createdAt").defaultNow()
})  


export const DonationCauseTable = pgTable("DonationCause", {
   id: uuid("id").primaryKey().defaultRandom(),
   donationId: uuid("donationId").references(() => DonationTable.id).notNull(),
   cause: varchar("cause", { length: 255 }).notNull(), 
})


// (One-to-Many)
// Donor has many Donations

export const DonarRelation = relations(DonarTable, ({ many }) => {
    return {
        donations: many(DonationTable)
    }
})

// Donation belongs to Donor
// Donation belongs to NGO
// Donation has many DonationCause
export const DonationRelation = relations(DonationTable, ({ one, many }) => {
    return {
        donar: one(DonarTable, {
            fields: [DonationTable.donarId],
            references: [DonarTable.id]
        }),
        ngo: one(NgoTable, {
            fields: [DonationTable.ngoId],
            references: [NgoTable.id],
        }),
        donationCause: many(DonationCauseTable)
    }
});


// One-to-Many
// NGO has many Donations
export const NgoRelation = relations(NgoTable, ({ many }) => {
    return {
        donation: many(DonationTable)
    }
})


// One-to-Many
// DonationCause belongs to Donation
export const DonationCauseRelation = relations(DonationCauseTable, ({ one }) => {
    return {
        donation: one(DonationTable, {
            fields: [DonationCauseTable.donationId],
            references: [DonationTable.id]
        })
    }
})