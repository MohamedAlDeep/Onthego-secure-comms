// import { timestamp } from "drizzle-orm/gel-core";
// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial('id').primaryKey(),
// //   created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
//   username: text('username'),
//   login_id: text('login_id'),
//   public_name: text('public_key_name'),
//   public_key: text('public_key_content'),
// });

// export const public_keys = pgTable('public_keys', {
//   id: serial('id').primaryKey(),
//   owner: text('owner'),
//   name: text('name'),
//   content: text('content'),
// //   created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),

// });