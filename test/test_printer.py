from app import printer
def test_print_with_notepad():
    printer.print_with_notepad("Hello notepad")
    assert True 
def test_print_shell():
    printer.print_with_shell("Hello world")
    assert True
def test_print_graphics():
    try:
        printer.print_with_graphics("testing graphics")
        assert True
    except Exception:
        assert False, "Graphics printing failed"
