from flask import Flask, render_template, request, jsonify
from command_handler import process_command

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main UI page."""
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    """API endpoint to process voice commands."""
    data = request.get_json()
    command = data.get('command', '').lower()
    
    # Delegate logic to the command handler module
    answer = process_command(command)
            
    return jsonify({"answer": answer})

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)
