# Hostel Room Allocation System

A web-based Hostel Room Allocation System built using Next.js, React, TypeScript, and Tailwind CSS.

The system is designed to make hostel room management easier for both students and wardens. Students can search for suitable available rooms based on their requirements, while wardens can manage rooms and confirm room allocations.

## Features

### Student

- Search for available hostel rooms.
- Filter rooms based on minimum capacity.
- Check whether a room has AC.
- Check whether a room has an attached washroom.
- View rooms that match the selected requirements.
- Find suitable empty rooms before requesting allocation.

### Warden

- Add new hostel rooms.
- Set room capacity.
- Specify whether a room has AC.
- Specify whether a room has an attached washroom.
- View all rooms in the room inventory.
- Check available and allocated rooms.
- Allocate a room to a particular student.
- View which student has been allocated to a room.
- Free an allocated room when a student leaves.
- Delete rooms that are currently available.

## Room Status

The system uses two main room statuses:

### Available

An available room is an empty room that can be assigned to a student.

### Allocated

An allocated room is a room that has been confirmed for a particular student.

When the warden frees an allocated room, its status changes back to available.

text
Available Room
      |
      v
Student Searches
      |
      v
Suitable Room Found
      |
      v
Warden Confirms Allocation
      |
      v
Allocated Room
      |
      v
Student Leaves
      |
      v
Room Becomes
AvailableThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
