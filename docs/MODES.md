# Modes Overview

This repository separates two ideas:

- **Execution mode**: how the system runs.
- **Permission mode**: how tool actions are authorized.

## 1. Execution Modes

- Interactive mode for live terminal collaboration.
- Print mode for non-interactive output workflows.
- Bare mode for reduced side effects and minimal runtime behavior.

## 2. Permission Modes

- `default`: standard checks and approval behavior.
- `plan`: planning-first flow before implementation.
- `acceptEdits`: faster edit flow with broader acceptance behavior.
- `bypassPermissions`: high-risk broad bypass (policy may disable).
- `dontAsk`: reduced prompting behavior in supported paths.

## 3. Plan Lifecycle

1. Enter planning phase.
2. Explore and define approach.
3. Request approval to exit planning.
4. Resume implementation under restored permission mode.

## 4. Selection Guidance

- Use `default` for normal development.
- Use `plan` for ambiguous or high-impact tasks.
- Use `acceptEdits` when speed is needed in trusted contexts.
- Use `bypassPermissions` only in tightly controlled environments.

## 5. Policy Reality

Mode availability is policy-aware and can be narrowed by runtime safety controls.
