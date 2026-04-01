# AI Agent Design

This document describes how the agent system is structured and how delegated work is executed, observed, and controlled.

## 1. Design Goals

The design prioritizes:

- safe delegation without losing control of permissions
- asynchronous execution for long-running work
- clear progress and completion visibility
- isolation options when context separation is needed

## 2. Core Architecture

The system is composed of:

- an orchestration layer that launches and routes delegated work
- an execution engine that runs model/tool loops
- a task lifecycle layer for registration, progress, status, and termination
- a policy layer that filters capabilities and applies permission mode rules

## 3. Execution Lifecycle

### Spawn
A delegated task is created with explicit intent, role, and optional isolation settings.

### Run
The runtime context is assembled from conversation state, available tools, and policy constraints.

### Observe
Progress and status updates are tracked continuously, then summarized into completion notifications.

### Resume / Redirect
Running workers can be continued with follow-up instructions or stopped when direction changes.

## 4. Agent Modes

- local background worker for standard delegated execution
- remote worker for cloud/session-isolated execution
- in-process teammate for collaborative multi-worker operation in one runtime

## 5. Safety and Isolation

- permission mode can vary by worker
- isolated workspace mode separates file-level changes
- remote mode separates execution environment
- delegation guardrails reduce recursion and context misuse

## 6. Extension Guidance

When extending the agent system, prefer behavior-level changes:

- add or refine role definitions
- improve spawn policy and delegation heuristics
- strengthen progress reporting and completion quality
- tighten policy checks before broadening capability surface
