# MCP Server Integration

Claude Code can connect to external Model Context Protocol (MCP) servers for up-to-date knowledge and advanced tooling. Configure servers in an `.mcp.json` file at the project root.

## Example Configuration

```json
{
  "servers": {
    "context7": {
      "url": "https://context7.anthropic.com",
      "apiKey": "$CONTEXT7_API_KEY"
    },
    "sequential": {
      "url": "https://sequential.example.com",
      "apiKey": "$SEQUENTIAL_API_KEY"
    }
  }
}
```

Store API keys as environment variables, not in the config file.

## Usage

1. Ensure the server entries exist in `.mcp.json`.
2. Reference commands or docs provided by the server within your prompts.
3. Use `/clear-context` and `/load-context` when switching between projects that require different servers.

For custom setups, consult the provider's documentation or create project-specific instructions in a local rules file.
