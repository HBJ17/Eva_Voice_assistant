import datetime
from scraper import get_answer

def process_command(command):
    """
    Processes the user's voice command.
    Handles basic commands directly or delegates to the scraper.
    """
    if not command:
        return "I didn't hear anything."

    # 1. Check for basic hardcoded commands first
    if "hello" in command or "hi eva" in command:
        return "Hello! I am Eva. How can I assist you today?"
    elif "time" in command:
        current_time = datetime.datetime.now().strftime("%I:%M %p")
        return f"The current time is {current_time}"
    elif "date" in command:
        current_date = datetime.datetime.now().strftime("%B %d, %Y")
        return f"Today's date is {current_date}"
    elif "your name" in command or "who are you" in command:
        return "I am Eva, your Enhanced Voice Assistant."
    else:
        # 2. If it's not a basic command, scrape the web for the answer!
        # We strip words like "who is", "what is", "tell me about" to improve the search
        search_query = command.replace("who is", "").replace("what is", "").replace("tell me about", "").strip()
        if search_query:
            return get_answer(search_query)
        else:
            return "I'm not sure what you mean."
