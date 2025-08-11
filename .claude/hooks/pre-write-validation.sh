#!/bin/bash

# Pre-write validation hook for Claude Code OS
# Prevents spaghetti code by validating changes before they're written

set -e

# Read input from Claude Code
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.filePath')
CONTENT=$(echo "$INPUT" | jq -r '.content')
OPERATION=$(echo "$INPUT" | jq -r '.operation')

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validation functions
check_file_length() {
    local lines=$(echo "$CONTENT" | wc -l)
    if [ $lines -gt 300 ]; then
        echo -e "${RED}❌ File too long: $lines lines (max: 300)${NC}" >&2
        return 1
    fi
    return 0
}

check_function_length() {
    # Check for functions over 50 lines
    local long_functions=$(echo "$CONTENT" | awk '
        /^(function|const.*=.*=>|class)/ { 
            start=NR; 
            name=$0 
        }
        /^}/ { 
            if (start > 0) {
                length = NR - start;
                if (length > 50) {
                    gsub(/^[ \t]+/, "", name);
                    print name " (" length " lines)";
                }
                start = 0;
            }
        }
    ')
    
    if [ ! -z "$long_functions" ]; then
        echo -e "${YELLOW}⚠️  Long functions detected:${NC}" >&2
        echo "$long_functions" >&2
        return 1
    fi
    return 0
}

check_imports() {
    # Check for circular imports or missing imports
    local imports=$(echo "$CONTENT" | grep -E "^import|^const.*require" || true)
    
    # This would need more sophisticated checking in practice
    # For now, just ensure imports exist
    if echo "$CONTENT" | grep -q "import.*from.*['\"]\."; then
        # Check if relative imports exist
        return 0
    fi
    return 0
}

check_patterns() {
    # Check if code follows established patterns
    local file_type=$(basename "$FILE_PATH" | sed 's/.*\.//')
    
    case "$file_type" in
        "service.ts"|"service.js")
            if ! echo "$CONTENT" | grep -q "extends BaseService"; then
                echo -e "${YELLOW}⚠️  Service doesn't extend BaseService${NC}" >&2
            fi
            ;;
        "controller.ts"|"controller.js")
            if ! echo "$CONTENT" | grep -q "@Controller"; then
                echo -e "${YELLOW}⚠️  Controller missing @Controller decorator${NC}" >&2
            fi
            ;;
    esac
    return 0
}

check_duplicates() {
    # Check for potential duplicate functionality
    # This would integrate with the memory system in practice
    return 0
}

check_complexity() {
    # Simple cyclomatic complexity check
    local complexity=$(echo "$CONTENT" | grep -c -E "if\s*\(|for\s*\(|while\s*\(|case\s+|catch\s*\(" || echo 0)
    if [ $complexity -gt 10 ]; then
        echo -e "${YELLOW}⚠️  High complexity detected: $complexity decision points${NC}" >&2
    fi
    return 0
}

# Main validation
echo -e "${GREEN}🔍 Validating $FILE_PATH...${NC}" >&2

VALIDATION_PASSED=true

if ! check_file_length; then
    VALIDATION_PASSED=false
fi

if ! check_function_length; then
    VALIDATION_PASSED=false
fi

if ! check_imports; then
    VALIDATION_PASSED=false
fi

if ! check_patterns; then
    VALIDATION_PASSED=false
fi

if ! check_duplicates; then
    VALIDATION_PASSED=false
fi

if ! check_complexity; then
    VALIDATION_PASSED=false
fi

# Return result
if [ "$VALIDATION_PASSED" = true ]; then
    echo -e "${GREEN}✅ All validations passed${NC}" >&2
    echo "{\"action\": \"allow\", \"message\": \"Validation passed\"}"
else
    echo -e "${RED}❌ Validation failed${NC}" >&2
    echo "{\"action\": \"block\", \"message\": \"Code quality issues detected. Please fix before writing.\"}"
    exit 1
fi
