# Codebase Structure Guide

This guide describes the codebase by responsibility boundaries rather than file-level inventory.

## 1) Runtime Entry and Boot

- Startup initialization and mode selection
- Session state setup and runtime guards
- Environment-aware capability activation

## 2) Interaction and Workflow

- command intake and orchestration
- terminal UI rendering and user feedback
- interactive and non-interactive execution paths

## 3) Core Execution

- query loop and turn lifecycle
- tool invocation and result handling
- task registration, progress tracking, and completion reporting

## 4) Services and Integrations

- external service communication
- policy and settings synchronization
- memory, analytics, and background maintenance workflows

## 5) Shared Foundations

- type contracts and schemas
- utility libraries for safety and consistency
- migration support and compatibility scaffolding

## 6) How to Navigate Changes

- start from behavior, not files
- trace request path: input -> orchestration -> execution -> reporting
- keep changes within one responsibility boundary whenever possible
- validate edge conditions where policy and mode transitions intersect
