import tempfile
import os
import subprocess

def print_to_printer(content):
    # Save to a temporary .txt file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8') as tmpfile:
        tmpfile.write(content)
        tmpfile_path = tmpfile.name

    print(f"📄 Temp file created at: {tmpfile_path}")

    # Launch Notepad to print it
    try:
        subprocess.run(
            ["notepad.exe", "/p", tmpfile_path],
            check=True
        )
        print("✅ Print sent to default printer via Notepad.")
    except Exception as e:
        print("❌ Printing failed:", e)
if __name__ == "__main__":

    print_to_printer("✅ Hello from Notepad print method!")
