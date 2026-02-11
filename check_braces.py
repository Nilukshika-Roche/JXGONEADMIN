
def check_braces(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()

    stack = []
    
    # We need to ignore braces inside strings and comments
    # Simple state machine
    in_string = False # ' or "
    string_char = ''
    in_template = False # `
    in_comment_line = False //
    in_comment_block = False /* */
    
    # This is a simplified parser, might fail on complex JSX with regex
    # But let's try a simpler approach: just count braces and ignore strings/comments roughly
    
    # Actually, a simple counter might be enough to see if total count matches
    
    open_braces = 0
    
    for i, line in enumerate(lines):
        line = line.strip()
        for char in line:
            if char == '{':
                open_braces += 1
                stack.append(('{', i + 1))
            elif char == '}':
                open_braces -= 1
                if stack:
                    stack.pop()
                else:
                    print(f"Excess closing brace at line {i+1}")
                    
    if open_braces > 0:
        print(f"Unclosed braces: {open_braces}")
        print(f"Last unclosed brace opened at line {stack[-1][1]}")
    elif open_braces < 0:
         print(f"Excess closing braces: {-open_braces}")
    else:
        print("Braces are balanced")

# It's better to just count indentation? 
# No, let's look at the file end.

# Let's inspect the last few lines as raw bytes/text to see if there are hidden chars
with open(filename, 'rb') as f:
    f.seek(-200, 2)
    content = f.read()
    print("Last 200 bytes:")
    print(content)
    
check_braces(r'c:\Users\Santhosh Nevins\OneDrive - Janashakthi Group\Desktop\JXG Sync\JXGONEADMIN\src\pages\Marketplace.jsx')
