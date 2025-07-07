from flask import Flask, request
import requests
import tempfile
import subprocess
import os
import time

app = Flask(__name__)
def start_ngrok_server():
    subprocess.Popen(["ngrok.exe","http","5000"])
    time.sleep(3)
    try:
        # asking ngrok for information readonly
        response = requests.get("http://127.0.0.1:4040/api/tunnels")
        #convert Json respopnse to Python Dic
        url = response.json()["tunnels"][0]["public_url"]
        print("ngrok url", url)
        return url
    except Exception as e:
        print("error printing url", e)
        return None

# ✅ Printer function using Notepad to print the content
def print_to_printer(content):
    # Write the content to a temporary text file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.txt', mode='w', encoding='utf-8') as tmpfile:
        tmpfile.write(content)
        tmpfile_path = tmpfile.name

    print(f"📄 Temp file created at: {tmpfile_path}")

    try:
        # Use Notepad to print the file
        subprocess.run(['notepad.exe', '/p', tmpfile_path], check = True)
        print("✅ Print job sent via notepad")
    except subprocess.CalledProcessError as e:
        print("❌ Failed to print:", e)

    # Optional: delete the temp file after printing
    time.sleep(5)  # Give Notepad time to send the print job
    try:
        os.remove(tmpfile_path)
        print("🗑️ Temp file deleted.")
    except Exception as e:
        print("⚠️ Could not delete temp file:", e)

# ✅ /test endpoint to verify connection
@app.route('/test', methods=['GET'])
def test_connection():
    return {'status': '✅ Flask is working!'}

# ✅ /print endpoint to receive data and trigger printing
@app.route('/print', methods=['POST'])
def print_info():
    try:
        data = request.get_json(force=True)
        print("📥 Received data:", data)

        # ✅ Rebuild the message from timestamp, name, phone, service
        content = f"""🕒 Time: {data['timestamp']}
👤 Name: {data['customer_name']}
📞 Phone#: {data['phone_number']}
    Year: {data['year']}
    Make: {data['make']}
    Model:{data['model']}
    Modules:{data['modules']}
    Single_stage:{data['single_stage']}
    Dual_stage:{data['dual_stage']}
    Buckles:{data['buckles']}
    what_will_you_drop_off:{data['wwydoff']}
    
"""

        print("📝 Content to print:", content)

        print_to_printer(content)

        return {'status': 'printed'}
    except Exception as e:
        print("❌ Error in /print route:", e)
        return {'status': 'error', 'message': str(e)}, 500

       


def post_url_to_google_apps_script(ngrok_url):
    webhook_url = "https://script.google.com/macros/s/AKfycbxOx28J1NCWW_cN9Vk81Cb4xYcb49aNkk1FnprS9HCFCd9dhRH3w_a24Ibv4Df2_rlV/exec"
    requests.post(webhook_url, json={"url": ngrok_url})

# ✅ Run Flask on 0.0.0.0 so it works with ngrok
if __name__ == "__main__":
    # url = start_ngrok_server()
    # if url:
    #     post_url_to_google_apps_script(url)
    # app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)
    app.run(host='0.0.0.0', port=5000)





