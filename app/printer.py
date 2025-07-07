import tempfile
import subprocess
import win32print
import win32api
import win32ui

# Notepad method
def print_with_notepad(content):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8') as tmpfile:
        tmpfile.write(content)
        tmpfile_path = tmpfile.name

    subprocess.run(["notepad.exe", "/p", tmpfile_path], check=True)

# win32print + ShellExecute
def print_with_shell(content):
    printer_name = win32print.GetDefaultPrinter()
    with tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8') as tmpfile:
        tmpfile.write(content)
        tmpfile_path = tmpfile.name

    win32api.ShellExecute(0, "print", tmpfile_path, f'/d:"{printer_name}"', ".", 0)

# win32ui graphics method
def print_with_graphics(content):
    printer_name = win32print.GetDefaultPrinter()
    hprinter = win32print.OpenPrinter(printer_name)
    printer_info = win32print.GetPrinter(hprinter, 2)
    hdc = win32ui.CreateDC()
    hdc.CreatePrinterDC(printer_info['pPrinterName'])

    hdc.StartDoc("Print Job")
    hdc.StartPage()
    hdc.TextOut(100, 100, content)
    hdc.EndPage()
    hdc.EndDoc()
    hdc.DeleteDC()
