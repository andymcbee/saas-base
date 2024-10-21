# SaaS Base Project Starter

A minimalist SaaS boilerplate to help developers focus on shipping revenue-connected features, and not boilerplate.
This repo is a work in progress. This document outlines the final goal.

## Starting the app locally

### for NextJS

- cd into client directory
- run 'npm run dev'

## Tech Stack

- NextJS 14 (TypeScript)
  - Front end application and will also use server side calls to interface with relevant APIs as needed
- ExpressJS (TypeScript)
  - Stand alone backend server for a REST API
- Supabase (Postgres)
  - Auth, row level security and
- Email support
  - support for PostMark, MailGun, SendGrid by adding API key
- AWS S3
  - Used for file storage. May use Supabases' built in storage in the short term, and later switch to this to reduce coupling to Supabase.
- Stripe for subscriptions

## Features

- User auth
  - Sign up, sign out, sign in, request password reset
- Role based authentication
- User management
  - Admins can add, delete or update users and their roles within their account
- Multi-org support
  - A user can belong to multiple organizations, and toggle between orgs from the dashboard.
- Pricing page with subscription support
