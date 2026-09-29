# Product specification

## Purpose

SYNNEX Enterprise Sales Portal is an authenticated internal workspace for executive sales oversight and daily sales execution. The executive profile name in the approved experience is **คุณคะเนตรนัส**. All other people and business values in the starter are fictional sample data.

## Information architecture

Routes: `/` Dashboard; `/customers`; `/opportunities`; `/activities`; `/reports`; `/products`; `/partners`; `/team`; `/documents`; `/approvals`; `/settings`.

The visual system uses a dark navy sidebar, white/light-blue surfaces, rounded 12–16px cards, restrained shadows and high scanability. This starter implements the approved direction based on the available handoff; original mockup image assets were not included in the referenced conversation.

## Domain model

Customer and Partner are related to Opportunity. An Opportunity owns Activities, Documents and Approvals. A Partner must be one of dealer, reseller or system integrator. Products can be attached to opportunities in a future `opportunity_products` join table. Auth users extend into `profiles`, which contains the application role.

## Roles

`admin`: workspace configuration and all data; `sales_director`: reports and approval decisions; `sales_manager`: team opportunities and approvals; `sales_rep`: assigned customers/opportunities and their activities/documents; `sales_operations`: operational editing and reports; `viewer`: read-only.

## Delivery roadmap

1. Add Supabase SSR client and login/session middleware.
2. Replace sample UI arrays with typed repository queries.
3. Add RLS policies that scope writes and reads by role/ownership.
4. Implement opportunity-product linking, document upload/signed download, approvals workflow, audit log, reports, tests and deployment.
