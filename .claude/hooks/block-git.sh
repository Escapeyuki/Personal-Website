#!/usr/bin/env bash
# PreToolUse hook: block any Bash command that invokes git.
# Reads the tool-call JSON on stdin and exits 2 (deny) if the command runs git.

payload=$(cat)
cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')

# Match `git` used as a command word:
#   - at the start of the command, or after a separator ( ; | & ( ` && || ),
#   - optionally prefixed with sudo or an absolute/relative path (/usr/bin/git, ./git),
#   - followed by whitespace or end of string.
git_re='(^|[;&|(`]|&&|\|\|)[[:space:]]*(sudo[[:space:]]+)?([^[:space:]]*/)?git([[:space:]]|$)'

if printf '%s' "$cmd" | grep -Eiq "$git_re"; then
  echo "Blocked: git commands are disabled in this project by a PreToolUse hook (.claude/hooks/block-git.sh). Ask the user to run git manually if it is needed." >&2
  exit 2
fi

exit 0
