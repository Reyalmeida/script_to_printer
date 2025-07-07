import win32print
import win32api
import tempfile
import os

def print_to_printer(content):
    printer_name = win32print.GetDefaultPrinter()
    print("🖨️ Sending to printer:", printer_name)

    # Write content to a temporary .txt file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8') as tmpfile:
        tmpfile.write(content)
        tmpfile_path = tmpfile.name

    print("📄 Temp file created:", tmpfile_path)

    # Send the file to the printer via default shell print
    try:
        win32api.ShellExecute(
            0,
            "print",
            tmpfile_path,
            f'/d:"{printer_name}"',
            ".",
            0
        )
        print("✅ Print job sent.")
    except Exception as e:
        print("❌ Failed to print:", e)

    # (Optional) Clean up file later
    # os.unlink(tmpfile_path)
    if __name__== "__main__":
        print_to_printer("📃hello rafael como estas imprime")

