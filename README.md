# Termi 🤖

A CLI tool with AI assistants and chat.

## Prerequisites

This tool requires the `OPENAI_API_KEY` environment variable to be set.

## Installation

To install the Termi CLI tool, use the following command:

```bash
deno install --allow-env --allow-read --allow-write --allow-net --global --config=./deno.json -f --name=termi src/main.ts
```

## Usage

Termi offers two main modes of operation: a continuous chat session and single-task assistants.

### Chat (Interactive Session)

Start a continuous chat session with the AI assistant. This mode is ideal for conversations and multi-turn interactions.

```bash
termi chat
```

You can also provide a context for the chat:

```bash
termi chat --context "$(pbpaste)" # Use clipboard content as context
```

### Assistants (One-off commands)

Use a specific assistant for a single task. This mode is suitable for quick, one-off requests.

```bash
termi assistant --type <assistant-type> "Your message"
```

Replace `<assistant-type>` with one of the following:

-   `ask`: For general technical questions.
-   `bash`: For generating bash commands.
-   `explain`: For explaining outputs of bash commands or file contents.
-   `review`: For reviewing code changes.
-   `writer`: For improving Slack messages.

You can also provide a context for the assistant:

```bash
termi assistant --type <assistant-type> --context "$(pbpaste)" "Your message" # Use clipboard content as context
```

### Clear Data

Clear all conversation data.

```bash
termi clear-data
```

## Available Tools

The following tools are available in the chat:

-   `create_file`: Create a file with the specified content at the given path.
-   `generate_image`: Generate an image.
-   `git_diff`: Compare the current working directory with the latest commit in the git repository.
-   `list_files_in_current_directory`: Recursively list all files in current working directory.
-   `read_file`: Read the content of a file at the given path.

## Customizing Prompts

The prompts for the assistants are located in the `prompts/` directory. You can customize these prompts to change the behavior of the assistants. Each file in this directory corresponds to an assistant type.

## Assistants

The available assistants are currently hardcoded. I'll maybe add dynamic ones later if I will have a time for that.

## Useful Aliases

Here are some examples of useful aliases that I use. You can add them to your shell configuration file (e.g., `.zshrc`, `.bashrc`) and customize them to fit your workflow.

```bash
# Start a chat session - (ch)at
alias ch="termi chat"

# Ask a general technical question
alias ask="termi assistant -t ask"

# Explain the piped output of a command
alias explain="termi assistant -t explain"

# Review code changes in the current working directory
alias review="termi assistant -t review"

# Open the last message in nvim - (n)vim (last)
alias nlast="nvim /path/to/termi/db/last-message.md"

# Explain the content of the clipboard - (e)xplain (c)lipboard
alias ec="pbpaste | explain"

# Start a chat session with the clipboard content as context - (ch)at with (c)lipboard
chc() {
  termi chat -c "$(pbpaste)"
}

# Ask a question with the clipboard content as context - (ask) with (c)lipboard
askc() {
  termi assistant -t ask -c "$(pbpaste)" "$*"
}
```

### Piping

You can pipe the output of other commands to Termi assistants.

**Explain the output of a command:**

```bash
curl https://example.com -I | explain
```

This will explain the headers of the `example.com` website.

**Explain the content of a file:**

```bash
cat src/main.ts | explain
```

**Review code changes:**

```bash
git diff | review
```

This will ask the AI to review the changes in your current working directory.

